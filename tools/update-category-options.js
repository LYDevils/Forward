const fs = require('fs');
const path = require('path');
const vm = require('vm');

const WIDGET_DIR = path.join(__dirname, '..', 'widgets');
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9'
};

const FALLBACK_OPTIONS = {
  '91porn.js': [
    ['最新影片', '/v.php'],
    ['最近加精', '/v.php?category=rf'],
    ['热门影片', '/v.php?category=hot'],
    ['长片', '/v.php?category=long'],
    ['本月热门', '/v.php?category=md']
  ],
  'javrate.js': [
    ['首页', '/'],
    ['有码', '/category/censored/'],
    ['无码', '/category/uncensored/'],
    ['JAV', '/jav/'],
    ['影片', '/movie/'],
    ['最新', '/?orderby=date']
  ],
  'spankbang.js': [
    ['最新', '/new_videos/'],
    ['热门', '/s/popular/'],
    ['Amateur', '/category/amateur/'],
    ['Anal', '/category/anal/'],
    ['Asian', '/category/asian/'],
    ['Big Tits', '/category/big-tits/'],
    ['Blowjob', '/category/blowjob/'],
    ['Creampie', '/category/creampie/'],
    ['Hentai', '/category/hentai/'],
    ['MILF', '/category/milf/'],
    ['POV', '/category/pov/'],
    ['Teen', '/category/teen/']
  ],
  'xhamster.js': [
    ['最新', '/newest'],
    ['全部分类', '/categories'],
    ['Amateur', '/categories/amateur'],
    ['Anal', '/categories/anal'],
    ['Asian', '/categories/asian'],
    ['BBW', '/categories/bbw'],
    ['Big Tits', '/categories/big-tits'],
    ['Blowjob', '/categories/blowjob'],
    ['Creampie', '/categories/creampie'],
    ['Hentai', '/categories/hentai'],
    ['Interracial', '/categories/interracial'],
    ['Lesbian', '/categories/lesbian'],
    ['MILF', '/categories/milf'],
    ['POV', '/categories/pov'],
    ['Teen', '/categories/teen']
  ]
};

const MANUAL_FETCHERS = {
  '91porn.js': async (site) => {
    const paths = [
      '/v.php',
      '/v.php?category=rf',
      '/v.php?category=hot',
      '/v.php?category=long',
      '/v.php?category=md'
    ];
    const labels = ['最新影片', '最近加精', '热门影片', '长片', '本月热门'];
    return paths.map((value, index) => ({ title: labels[index], value }));
  },
  'tube8.js': async (site) => {
    const html = await fetchHtml(site.baseUrl + '/categories.html');
    return extractCategoryLinks(html, site, {
      hrefPattern: /^\/cat\//i,
      titleFilter: (title) => !/\b\d+\s+videos\b/i.test(title)
    });
  },
  'xvideos.js': async (site) => {
    const html = await fetchHtml(site.baseUrl + '/tags');
    const categories = extractCategoryLinks(html, site, {
      hrefPattern: /^\/c\//i
    });
    return dedupeOptions([
      { title: '最新', value: '/new' },
      { title: '最佳', value: '/best' },
      { title: '所有标签', value: '/tags' },
      { title: '频道', value: '/channels-index' },
      { title: '演员', value: '/pornstars-index' },
      ...categories
    ]);
  },
  'pornhub.js': async (site) => {
    const html = await fetchHtml(site.baseUrl + '/categories');
    const categories = extractCategoryLinks(html, site, {
      hrefPattern: /^\/categories\//i,
      titleFilter: (title) => !/\b\d[\d,]*\s+Videos\b/i.test(title)
    });
    const channels = extractCategoryLinks(html, site, {
      hrefPattern: /^\/channels\//i
    });
    return dedupeOptions([
      { title: '推荐视频', value: '/recommended' },
      { title: '热门类别', value: '/categories' },
      { title: '频道', value: '/channels' },
      ...categories,
      ...channels
    ]);
  },
  'redtube.js': async (site) => {
    const html = await fetchHtml(site.baseUrl + '/categories?cc=jp');
    const categories = extractCategoryLinks(html, site, {
      hrefPattern: /^\/redtube\//i
    });
    const channels = extractCategoryLinks(html, site, {
      hrefPattern: /^\/channels?\//i
    });
    return dedupeOptions([
      { title: '最新', value: '/newest' },
      { title: '全部分类', value: '/categories?cc=jp' },
      ...categories,
      ...channels
    ]);
  },
  'youporn.js': async (site) => {
    const html = await fetchHtml(site.baseUrl + '/categories/');
    const categories = extractCategoryLinks(html, site, {
      hrefPattern: /^\/category\//i,
      titleFilter: (title) => !/\b\d[\d,]*\s+videos\b/i.test(title)
    });
    return dedupeOptions([
      { title: '最新', value: '/browse/time/' },
      { title: '全部分类', value: '/categories/' },
      ...categories
    ]);
  },
  'jable.js': async (site) => {
    const html = await fetchHtml(site.baseUrl + '/categories/');
    const categories = extractCategoryLinks(html, site, {
      hrefPattern: /^(\/categories\/|\/tags\/|\/models\/|\/latest-updates\/)/i
    });
    return dedupeOptions(categories);
  },
  'javday.js': async (site) => {
    const html = await fetchHtml(site.baseUrl);
    const categories = extractCategoryLinks(html, site, {
      hrefPattern: /^(\/label\/|\/category\/)/i
    });
    return dedupeOptions(categories);
  },
  'vod.js': async () => {
    const response = await fetch('https://91md.me/api.php/provide/vod?ac=list&out=json', {
      headers: HEADERS
    });
    const text = await response.text();
    const data = JSON.parse(text);
    const classes = Array.isArray(data.class) && data.class.length > 0
      ? data.class
      : Array.isArray(data.list)
        ? dedupeBy(data.list, (item) => String(item.type_id || item.id || item.tid || ''))
        : [];
    return classes
      .map((item) => ({
        title: String(item.type_name || item.name || '').trim(),
        value: String(item.type_id || item.id || item.tid || '').trim()
      }))
      .filter((item) => item.title && item.value);
  }
};

async function fetchHtml(url) {
  const response = await fetch(url, { headers: HEADERS, redirect: 'follow' });
  if (!response.ok) {
    throw new Error(`${url} -> ${response.status}`);
  }
  return response.text();
}

function decodeHtml(value) {
  return String(value || '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, '\'')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

function cleanText(value) {
  return decodeHtml(value)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getAttr(attrs, name) {
  const patterns = [
    new RegExp(`${name}\\s*=\\s*"([^"]*)"`, 'i'),
    new RegExp(`${name}\\s*=\\s*'([^']*)'`, 'i'),
    new RegExp(`${name}\\s*=\\s*([^\\s>]+)`, 'i')
  ];
  for (const pattern of patterns) {
    const match = attrs.match(pattern);
    if (match) return decodeHtml(match[1]);
  }
  return '';
}

function normalizeUrl(href, baseUrl) {
  const raw = decodeHtml(href).trim();
  if (!raw || raw === '#' || /^javascript:/i.test(raw) || /^mailto:/i.test(raw)) return '';
  if (/^https?:\/\//i.test(raw)) return raw;
  if (raw.startsWith('//')) return 'https:' + raw;
  const base = String(baseUrl || '').replace(/\/$/, '');
  if (raw.startsWith('/')) return base + raw;
  return base + '/' + raw;
}

function extractCategoryLinks(html, site, options = {}) {
  const hrefPattern = options.hrefPattern || /./;
  const titleFilter = options.titleFilter || (() => true);
  const results = [];
  const seen = new Set();
  const anchorPattern = /<a\b(?<attrs>[^>]*)>(?<body>[\s\S]*?)<\/a>/gi;
  let match;
  while ((match = anchorPattern.exec(html))) {
    const attrs = match.groups.attrs || '';
    const href = getAttr(attrs, 'href');
    const url = normalizeUrl(href, site.baseUrl);
    if (!url.startsWith(site.baseUrl)) continue;
    const relative = url.replace(site.baseUrl.replace(/\/$/, ''), '') || '/';
    if (!hrefPattern.test(relative)) continue;
    const title = cleanText(getAttr(attrs, 'title') || getAttr(attrs, 'aria-label') || match.groups.body || '');
    if (!title || !titleFilter(title, relative)) continue;
    if (seen.has(relative)) continue;
    seen.add(relative);
    results.push({ title: title.replace(/\s+\d[\d,]*\s+Videos?$/i, ''), value: relative });
  }
  return results;
}

function dedupeOptions(options) {
  const seen = new Set();
  const output = [];
  for (const option of options) {
    const title = String(option.title || '').trim();
    const value = String(option.value || '').trim();
    if (!title || !value || seen.has(value)) continue;
    seen.add(value);
    output.push({ title, value });
  }
  return output;
}

function dedupeBy(items, keyFn) {
  const seen = new Set();
  const output = [];
  for (const item of items) {
    const key = keyFn(item);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    output.push(item);
  }
  return output;
}

function formatOptionBlock(options) {
  return '[\n' + options.map((option) => `  { title: ${JSON.stringify(option.title)}, value: ${JSON.stringify(option.value)} }`).join(',\n') + '\n]';
}

function replaceConstArray(content, constName, options) {
  const block = `const ${constName} = ${formatOptionBlock(options)};`;
  const pattern = new RegExp(`const ${constName} = \\[[\\s\\S]*?\\n\\];`);
  if (!pattern.test(content)) {
    throw new Error(`Missing constant ${constName}`);
  }
  return content.replace(pattern, block);
}

function replaceInlineEnumOptions(content, paramName, options) {
  const block = `enumOptions: ${formatOptionBlock(options)}`;
  const pattern = new RegExp(`(name: '${paramName}'[\\s\\S]*?enumOptions: )\\[[\\s\\S]*?\\n\\]`, 'm');
  if (!pattern.test(content)) {
    throw new Error(`Missing enumOptions for ${paramName}`);
  }
  return content.replace(pattern, `$1${formatOptionBlock(options)}`);
}

function readSite(fileName) {
  const code = fs.readFileSync(path.join(WIDGET_DIR, fileName), 'utf8');
  return vm.runInNewContext(code + '\nSITE;', { console });
}

async function updateAdultWidget(fileName) {
  const site = readSite(fileName);
  const fetcher = MANUAL_FETCHERS[fileName];
  let options = [];
  try {
    options = fetcher ? await fetcher(site) : [];
  } catch (error) {
    console.error(`[warn] ${fileName}: ${error.message}`);
  }
  if (!options.length && FALLBACK_OPTIONS[fileName]) {
    options = FALLBACK_OPTIONS[fileName].map(([title, value]) => ({ title, value }));
  }
  options = dedupeOptions(options);
  if (!options.length) {
    throw new Error(`${fileName}: no category options available`);
  }
  const filePath = path.join(WIDGET_DIR, fileName);
  let content = fs.readFileSync(filePath, 'utf8');
  content = replaceConstArray(content, 'CATEGORY_OPTIONS', options);
  content = replaceInlineEnumOptions(content, 'categoryPreset', options);
  fs.writeFileSync(filePath, content);
  return options.length;
}

async function updateVodWidget() {
  const options = await MANUAL_FETCHERS['vod.js']();
  const filePath = path.join(WIDGET_DIR, 'vod.js');
  let content = fs.readFileSync(filePath, 'utf8');
  content = replaceConstArray(content, 'VOD_CATEGORY_OPTIONS', options);
  content = replaceInlineEnumOptions(content, 'typePreset', options);
  fs.writeFileSync(filePath, content);
  return options.length;
}

async function main() {
  const files = fs.readdirSync(WIDGET_DIR).filter((file) => file.endsWith('.js'));
  for (const fileName of files) {
    if (fileName === 'vod.js') continue;
    if (!fs.readFileSync(path.join(WIDGET_DIR, fileName), 'utf8').includes('const CATEGORY_OPTIONS =')) continue;
    const count = await updateAdultWidget(fileName);
    console.log(`${fileName}: ${count} categories`);
  }
  const vodCount = await updateVodWidget();
  console.log(`vod.js: ${vodCount} categories`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
