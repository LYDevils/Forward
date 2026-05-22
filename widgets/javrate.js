const SITE = {
  file: 'javrate.js',
  key: 'javrate',
  title: 'JAVRate',
  baseUrl: 'https://www.javrate.com',
  searchPath: '/?s={keyword}',
  latestPath: '/',
  videoPathKeywords: [
    '/Movie/Detail/'
  ]
};

const CATEGORY_OPTIONS = [
  { title: '最新A片', value: '/' },
  { title: '無碼A片', value: '/uncensored' },
  { title: '日本A片', value: '/censored' },
  { title: '國產AV', value: '/china' },
  { title: 'AV女優', value: '/Actress' },
  { title: 'A片廠商', value: '/Maker' },
  { title: '分類找片', value: '/Tag' },
  { title: '最多人看', value: '/hot' }
];

const DEFAULT_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
};

WidgetMetadata = {
  id: 'lydevils.javrate',
  title: 'JAVRate',
  description: 'JAVRate 真实视频数据源。',
  author: 'LYDevils',
  site: 'https://www.javrate.com',
  version: '1.0.7',
  requiredVersion: '0.0.1',
  detailCacheDuration: 300,
  modules: [
    {
      id: 'search-videos',
      title: '搜索影片',
      description: '搜索真实视频。',
      functionName: 'searchVideos',
      type: 'list',
      params: [
        { name: 'keyword', title: '关键词', type: 'input' },
        { name: 'page', title: '页码', type: 'page', startPage: 1 }
      ]
    },
    {
      id: 'get-categories',
      title: '分类列表',
      description: '自动获取分类名称和分类路径，点选后加载该分类影片。',
      functionName: 'getCategories',
      type: 'list',
      params: []
    },
    {
      id: 'category-videos',
      title: '分类影片',
      description: '从下拉框选择分类加载影片，也可切换为自定义路径。',
      functionName: 'loadCategoryVideos',
      type: 'list',
      params: [
        {
          name: 'categoryMode',
          title: '分类选择方式',
          type: 'enumeration',
          value: 'preset',
          enumOptions: [
            { title: '下拉分类', value: 'preset' },
            { title: '自定义路径', value: 'custom' }
          ]
        },
        {
          name: 'categoryPreset',
          title: '选择分类',
          type: 'enumeration',
          value: CATEGORY_OPTIONS[0] ? CATEGORY_OPTIONS[0].value : '',
          belongTo: { paramName: 'categoryMode', value: ['preset'] },
          enumOptions: CATEGORY_OPTIONS
        },
        {
          name: 'categoryId',
          title: '自定义分类 ID/路径',
          type: 'input',
          belongTo: { paramName: 'categoryMode', value: ['custom'] }
        },
        {
          name: 'categoryName',
          title: '自定义分类名称',
          type: 'input',
          belongTo: { paramName: 'categoryMode', value: ['custom'] }
        },
        { name: 'page', title: '页码', type: 'page', startPage: 1 }
      ]
    },
    {
      id: 'get-video-detail',
      title: '影片详情',
      description: '根据链接加载视频详情。',
      functionName: 'getVideoDetail',
      type: 'list',
      params: [{ name: 'url', title: '链接', type: 'input' }]
    }
  ]
};

searchVideos = async (params = {}) => {
  const keyword = String(params.keyword || '').trim();
  const page = Math.max(1, Number(params.page || 1));
  const url = keyword ? buildSearchUrl(keyword, page) : buildCategoryUrl(SITE.latestPath, page);
  return loadVideoList(url);
};

getCategories = async () => loadCategories();

loadCategoryVideos = async (params = {}) => {
  const preset = CATEGORY_OPTIONS.find((item) => item.value === params.categoryPreset);
  const usePreset = String(params.categoryMode || 'preset') === 'preset';
  const categoryId = String(usePreset ? (params.categoryPreset || (preset && preset.value) || '') : (params.categoryId || params.categoryUrl || params.url || '')).trim();
  const categoryName = String(usePreset ? ((preset && preset.title) || '') : (params.categoryName || '')).trim();
  if (!categoryId) {
    return [createMessage('缺少分类 ID', '请输入分类 ID、路径或完整分类链接。')];
  }

  const results = await loadVideoList(buildCategoryUrl(categoryId, params.page || 1));
  if (!categoryName) return results;
  return results.map((item) => item.type === 'link'
    ? Object.assign({}, item, { description: [categoryName, item.description].filter(Boolean).join(' | ') })
    : item);
};

getVideoDetail = async (params = {}) => {
  const url = String(params.url || params.link || '').trim();
  if (!url) {
    return [createMessage('缺少链接', '请先输入或打开真实视频链接。')];
  }
  const detail = await loadDetail(url);
  return Array.isArray(detail) ? detail : [detail];
};

async function loadDetail(link) {
  const rawLink = String(link || '');
  if (rawLink.startsWith('category|')) {
    return loadVideoList(rawLink.slice('category|'.length));
  }

  const url = normalizeUrl(rawLink, SITE.baseUrl);
  const html = await fetchText(url);
  const $ = Widget.html.load(html);
  const title = cleanText(
    $('meta[property="og:title"]').attr('content') ||
    $('meta[name="twitter:title"]').attr('content') ||
    $('h1').first().text() ||
    $('title').first().text() ||
    SITE.title
  );
  const coverUrl = normalizeUrl(
    $('meta[property="og:image"]').attr('content') ||
    $('meta[name="twitter:image"]').attr('content') ||
    $('img').first().attr('src') ||
    '',
    url
  );
  const description = cleanText(
    $('meta[property="og:description"]').attr('content') ||
    $('meta[name="description"]').attr('content') ||
    $('.mt-3').first().text() ||
    ''
  );
  const videoUrl = extractVideoUrl(html, url) || url;

  return {
    id: hashId(url),
    type: 'detail',
    title,
    description,
    coverUrl,
    link: url,
    videoUrl,
    mediaType: 'movie',
    playerType: 'system',
    source: SITE.title
  };
}

async function loadVideoList(url) {
  try {
    const html = await fetchText(url);
    const $ = Widget.html.load(html);
    const results = [];
    const seen = new Set();

    $('a[href]').each((_, element) => {
      const anchor = $(element);
      const href = anchor.attr('href');
      const videoUrl = normalizeUrl(href, SITE.baseUrl);
      if (!isLikelyVideoUrl(videoUrl) || seen.has(videoUrl)) return;

      const container = anchor.closest('article, .col, .card, .grid, li, div');
      const image = anchor.find('img').first().length ? anchor.find('img').first() : container.find('img').first();
      const title = cleanText(
        anchor.attr('title') ||
        image.attr('alt') ||
        anchor.text() ||
        container.text()
      ).slice(0, 160);
      if (!title || title.length < 4) return;

      const metaText = cleanText(container.text());
      const yearMatch = metaText.match(/\b20\d{2}\b/);
      const typeMatch = metaText.match(/有碼|無碼|國產/);
      const dateMatch = metaText.match(/\b20\d{2}-\d{2}-\d{2}\b/);
      const description = [yearMatch && yearMatch[0], typeMatch && typeMatch[0], dateMatch && dateMatch[0]].filter(Boolean).join(' | ') || SITE.title;
      const coverUrl = normalizeUrl(readFirstAttr(image, ['data-src', 'data-original', 'src']), SITE.baseUrl);

      seen.add(videoUrl);
      results.push({
        id: hashId(videoUrl),
        type: 'link',
        title,
        description,
        coverUrl,
        link: videoUrl,
        mediaType: 'movie',
        playerType: 'system',
        source: SITE.title
      });
    });

    return results.length > 0 ? results.slice(0, 40) : [createMessage('未找到视频', '站点未返回可解析的视频条目，请换关键词或页码。')];
  } catch (error) {
    return [createMessage('请求失败', String(error.message || error))];
  }
}

async function loadCategories() {
  try {
    const html = await fetchText(SITE.baseUrl);
    const $ = Widget.html.load(html);
    const results = [];
    const seen = new Set();
    $('a[href]').each((_, element) => {
      const title = cleanText($(element).text() || $(element).attr('title') || '');
      const url = normalizeUrl($(element).attr('href'), SITE.baseUrl);
      if (!title || seen.has(url) || !isLikelyCategoryUrl(url)) return;
      seen.add(url);
      results.push({
        id: hashId(url),
        type: 'link',
        title,
        description: '分类路径：' + url.replace(SITE.baseUrl.replace(/\/$/, ''), '') + '，点击查看该分类影片',
        link: 'category|' + url,
        mediaType: 'movie',
        playerType: 'system',
        source: SITE.title
      });
    });
    return results.length > 0 ? results.slice(0, 80) : [createMessage('未找到分类', '站点导航未返回可解析的分类链接。')];
  } catch (error) {
    return [createMessage('请求失败', String(error.message || error))];
  }
}

function buildCategoryUrl(categoryId, page) {
  const value = String(categoryId || '').trim();
  const normalized = normalizeUrl(value || SITE.latestPath, SITE.baseUrl);
  const pageNumber = Math.max(1, Number(page || 1));
  if (pageNumber <= 1) return normalized;
  return normalized + (normalized.includes('?') ? '&' : '?') + 'page=' + pageNumber;
}

function buildSearchUrl(keyword, page) {
  const encoded = encodeURIComponent(keyword);
  const pageNumber = Math.max(1, Number(page || 1));
  return normalizeUrl(String(SITE.searchPath).replace('{keyword}', encoded), SITE.baseUrl) + '&page=' + pageNumber;
}

async function fetchText(url) {
  const response = await Widget.http.get(normalizeUrl(url, SITE.baseUrl), { headers: DEFAULT_HEADERS, timeout: 15000 });
  if (typeof response === 'string') return response;
  return String(response.data || response.body || response.html || '');
}

function extractVideoUrl(html, pageUrl) {
  const patterns = [
    /["'](?:contentUrl|embedUrl|videoUrl|file|hls|url)["']\s*[:=]\s*["']([^"']+)["']/i,
    /(?:contentUrl|embedUrl|videoUrl|file|hls|url)\s*[:=]\s*["']([^"']+)["']/i
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      const value = normalizeUrl(unescapeUrl(match[1]), pageUrl);
      if (/\.m3u8|\.mp4|\/embed\//i.test(value)) return value;
    }
  }
  return '';
}

function isLikelyVideoUrl(url) {
  const lower = String(url || '').toLowerCase();
  if (!lower.startsWith(SITE.baseUrl.toLowerCase().replace(/\/$/, ''))) return false;
  return (SITE.videoPathKeywords || []).some((keyword) => lower.includes(String(keyword).toLowerCase()));
}

function isLikelyCategoryUrl(url) {
  const lower = String(url || '').toLowerCase();
  if (!lower.startsWith(SITE.baseUrl.toLowerCase().replace(/\/$/, ''))) return false;
  if (isLikelyVideoUrl(url)) return false;
  return ['/uncensored', '/censored', '/china', '/actress', '/maker', '/tag', '/hot', '/new'].some((part) => lower.includes(part));
}

function normalizeUrl(value, baseUrl) {
  const raw = String(value || '').trim().replace(/&amp;/g, '&');
  if (!raw || raw === '#') return '';
  if (/^https?:\/\//i.test(raw)) return raw;
  if (raw.startsWith('//')) return 'https:' + raw;
  const base = String(baseUrl || SITE.baseUrl).replace(/\/$/, '');
  if (raw.startsWith('/')) return base + raw;
  return base + '/' + raw;
}

function readFirstAttr(element, names) {
  for (const name of names) {
    const value = element.attr(name);
    if (value) return value;
  }
  return '';
}

function cleanText(value) {
  return String(value || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function unescapeUrl(value) {
  return String(value || '')
    .replace(/\\\//g, '/')
    .replace(/\\u0026/g, '&')
    .replace(/\\"/g, '"');
}

function hashId(value) {
  const text = String(value || '');
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = ((hash << 5) - hash + text.charCodeAt(index)) | 0;
  }
  return SITE.key + '.' + Math.abs(hash);
}

function createMessage(title, description) {
  return {
    id: SITE.key + '.message.' + hashId(title + description),
    type: 'text',
    title,
    description
  };
}
