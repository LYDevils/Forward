const SITE = {
  file: 'tube8.js',
  key: 'tube8',
  title: 'Tube8',
  baseUrl: 'https://www.tube8.com',
  searchPath: '/searches.html?q={keyword}&page={page}',
  latestPath: '/newest.html/',
  videoPathKeywords: [
    '/porn-video/'
  ]
};

const CATEGORY_OPTIONS = [
  { title: 'Newest', value: '/newest.html/' },
  { title: 'All Categories', value: '/categories.html' },
  { title: 'Threesome Category', value: '/cat/threesome/' },
  { title: 'Big Dick Category', value: '/cat/bigdick/' },
  { title: '18-25', value: '/cat/teens/' },
  { title: 'Lesbian', value: '/cat/lesbian/' },
  { title: 'Amateur', value: '/cat/amateur/' },
  { title: 'Mature', value: '/cat/mature/' },
  { title: 'Anal', value: '/cat/anal/' },
  { title: 'MILF', value: '/cat/milf/' },
  { title: 'Creampie', value: '/cat/creampie/' },
  { title: 'Hentai', value: '/cat/hentai/' },
  { title: 'Blowjob', value: '/cat/blowjob/' },
  { title: 'Asian', value: '/cat/asian/' },
  { title: 'Public', value: '/cat/public/' },
  { title: 'Ebony', value: '/cat/ebony/' },
  { title: 'Fetish', value: '/cat/fetish/' },
  { title: 'Latina', value: '/cat/latina/' },
  { title: 'Hardcore', value: '/cat/hardcore/' },
  { title: 'Arab', value: '/cat/arab/' },
  { title: 'BBW', value: '/cat/bbw/' },
  { title: 'Big Ass', value: '/cat/bigass/' },
  { title: 'Big Tits', value: '/cat/bigtits/' },
  { title: 'Blonde', value: '/cat/blonde/' },
  { title: 'Bondage', value: '/cat/bondage/' },
  { title: 'Brazilian', value: '/cat/brazilian/' },
  { title: 'Brunette', value: '/cat/brunette/' },
  { title: 'Bukkake', value: '/cat/bukkake/' },
  { title: 'Cartoon', value: '/cat/cartoon/' },
  { title: 'Casting', value: '/cat/casting/' },
  { title: 'Celebrity', value: '/cat/celebrity/' },
  { title: 'College (18+)', value: '/cat/college/' },
  { title: 'Compilation', value: '/cat/compilation/' },
  { title: 'Cosplay', value: '/cat/cosplay/' },
  { title: 'Cuckold', value: '/cat/cuckold/' },
  { title: 'Cumshot', value: '/cat/cumshot/' },
  { title: 'Double Penetration', value: '/cat/doublepenetration/' },
  { title: 'Erotic', value: '/cat/erotic/' },
  { title: 'Feet', value: '/cat/feet/' },
  { title: 'Female Orgasm', value: '/cat/femaleorgasm/' },
  { title: 'Fingering', value: '/cat/fingering/' },
  { title: 'Fisting', value: '/cat/fisting/' },
  { title: 'French', value: '/cat/french/' },
  { title: 'Funny', value: '/cat/funny/' },
  { title: 'Gangbang', value: '/cat/gangbang/' },
  { title: 'German', value: '/cat/german/' },
  { title: 'Group', value: '/cat/group/' },
  { title: 'Handjob', value: '/cat/handjob/' },
  { title: 'HD', value: '/cat/hd/' },
  { title: 'Indian', value: '/cat/indian/' },
  { title: 'Interracial', value: '/cat/interracial/' },
  { title: 'Japanese', value: '/cat/japanese/' },
  { title: 'Massage', value: '/cat/massage/' },
  { title: 'Masturbation', value: '/cat/masturbation/' },
  { title: 'Orgy', value: '/cat/orgy/' },
  { title: 'Parody', value: '/cat/parody/' },
  { title: 'Party', value: '/cat/party/' },
  { title: 'Pissing', value: '/cat/pissing/' },
  { title: 'Popular With Women', value: '/cat/popular-with-women/' },
  { title: 'POV', value: '/cat/pov/' },
  { title: 'Pussy Licking', value: '/cat/pussy-licking/' },
  { title: 'Reality', value: '/cat/reality/' },
  { title: 'Redhead', value: '/cat/redhead/' },
  { title: 'Rough', value: '/cat/rough/' },
  { title: 'Shemale', value: '/cat/shemale/' },
  { title: 'Small Tits', value: '/cat/small-tits/' },
  { title: 'Solo Male', value: '/cat/solomale/' },
  { title: 'Squirting', value: '/cat/squirting/' },
  { title: 'Step Fantasy', value: '/cat/stepfantasy/' },
  { title: 'Strip', value: '/cat/strip/' },
  { title: 'Striptease', value: '/cat/striptease/' },
  { title: 'Toys', value: '/cat/toys/' },
  { title: 'Transgender', value: '/cat/transgender/' },
  { title: 'Verified Amateurs', value: '/cat/verifiedamateurs/' },
  { title: 'Vintage', value: '/cat/vintage/' },
  { title: 'Virtual Reality', value: '/cat/virtualreality/' },
  { title: 'Webcam', value: '/cat/webcam/' },
  { title: 'Young (18+) and Old', value: '/cat/youngandold/' }
];

const DEFAULT_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
};

WidgetMetadata = {
  id: 'lydevils.tube8',
  title: 'Tube8',
  description: 'Tube8 真实视频数据源。',
  author: 'LYDevils',
  site: 'https://www.tube8.com',
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
    $('meta[property="og:video:title"]').attr('content') ||
    $('h1').first().text() ||
    $('title').first().text() ||
    SITE.title
  );
  const coverUrl = normalizeUrl(
    $('meta[property="og:image"]').attr('content') ||
    $('meta[name="twitter:image"]').attr('content') ||
    $('.videoElementPoster').attr('src') ||
    $('video').attr('poster') ||
    '',
    url
  );
  const description = cleanText(
    $('meta[property="og:description"]').attr('content') ||
    $('meta[name="description"]').attr('content') ||
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

    $('.video-box, article.video-box').each((_, element) => {
      const card = $(element);
      const anchor = card.find('a.video-box-image, a.video-title-text, a.tm_video_link').first();
      const href = anchor.attr('href');
      const videoUrl = normalizeUrl(href, SITE.baseUrl);
      if (!isLikelyVideoUrl(videoUrl) || seen.has(videoUrl)) return;

      const image = card.find('img').first();
      const title = cleanText(
        card.find('.video-title-text,.tm_video_title').first().text() ||
        anchor.attr('title') ||
        image.attr('alt') ||
        ''
      );
      if (!title) return;

      seen.add(videoUrl);
      const coverUrl = normalizeUrl(
        readFirstAttr(image, ['data-poster', 'data-src', 'data-original', 'src']),
        SITE.baseUrl
      );
      const duration = cleanText(card.find('.video-duration,.tm_video_duration').first().text());
      const author = cleanText(card.find('.author-title-text').first().text());
      const description = [duration ? '时长：' + duration : '', author].filter(Boolean).join(' | ') || SITE.title;

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

    if (results.length > 0) {
      return results.slice(0, 40);
    }

    $('a[href]').each((_, element) => {
      const href = $(element).attr('href');
      const videoUrl = normalizeUrl(href, SITE.baseUrl);
      if (!isLikelyVideoUrl(videoUrl) || seen.has(videoUrl)) return;

      const image = $(element).find('img').first();
      const title = pickTitle($, element, image);
      if (!title || title.length < 2) return;

      seen.add(videoUrl);
      const coverUrl = normalizeUrl(readFirstAttr(image, ['data-poster', 'data-src', 'data-original', 'data-lazy-src', 'src']), SITE.baseUrl);
      const description = findDuration($, element) || SITE.title;
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
    const html = await fetchText(SITE.latestPath);
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
  const pageNumber = Math.max(1, Number(page || 1));
  const normalized = normalizeUrl(value, SITE.baseUrl);
  if (pageNumber <= 1) return normalized;

  const pathname = normalized.replace(/^https?:\/\/[^/]+/i, '');
  if (/\/cat\//i.test(pathname)) {
    return normalized + (normalized.includes('?') ? '&' : '?') + 'page=' + pageNumber;
  }

  const basePath = pathname
    .replace(/\/page\/\d+\/?$/i, '/')
    .replace(/\?page=\d+/i, '')
    .replace(/\/?$/, '/')
    .replace(/\.html\/?$/i, '/');

  return normalizeUrl(basePath + 'page/' + pageNumber + '/', SITE.baseUrl);
}

function buildSearchUrl(keyword, page) {
  const encoded = encodeURIComponent(keyword);
  const pageNumber = Math.max(1, Number(page || 1));
  const path = String(SITE.searchPath || '/')
    .replace('{keyword}', encoded)
    .replace('{page}', String(pageNumber));
  return normalizeUrl(path, SITE.baseUrl);
}

async function fetchText(url) {
  const response = await Widget.http.get(normalizeUrl(url, SITE.baseUrl), { headers: DEFAULT_HEADERS, timeout: 15000 });
  if (typeof response === 'string') return response;
  return String(response.data || response.body || response.html || '');
}

function pickTitle($, element, image) {
  const direct = cleanText(
    $(element).attr('title') ||
    $(element).attr('aria-label') ||
    image.attr('alt') ||
    $(element).find('[title]').first().attr('title') ||
    $(element).find('.title,.video-title,.thumb-title,.video-title-text').first().text() ||
    $(element).text()
  );
  if (direct) return direct;

  return cleanText($(element).parent().text()).slice(0, 120);
}

function findDuration($, element) {
  const text = cleanText($(element).parent().text());
  const match = text.match(/\b\d{1,2}:\d{2}(?::\d{2})?\b/);
  return match ? '时长：' + match[0] : '';
}

function extractVideoUrl(html, pageUrl) {
  const mediaMatch = html.match(/mediaDefinitions?\s*[:=]\s*(\[[\s\S]*?\])/i) || html.match(/mediaDefinition\s*:\s*(\[[\s\S]*?\])/i);
  if (mediaMatch && mediaMatch[1]) {
    const fromArray = extractMediaDefinitionUrl(mediaMatch[1], pageUrl);
    if (fromArray) return fromArray;
  }

  const patterns = [
    /html5player\.setVideoHLS\(['"]([^'"]+)['"]\)/i,
    /html5player\.setVideoUrlHigh\(['"]([^'"]+)['"]\)/i,
    /html5player\.setVideoUrlLow\(['"]([^'"]+)['"]\)/i,
    /<source[^>]+src=["']([^"']+\.(?:m3u8|mp4)(?:[^"']*)?)["']/i,
    /["'](?:contentUrl|videoUrl|file|hls|url)["']\s*[:=]\s*["']([^"']+\.(?:m3u8|mp4)(?:[^"']*)?)["']/i,
    /(?:contentUrl|videoUrl|file|hls|url)\s*[:=]\s*["']([^"']+\.(?:m3u8|mp4)(?:[^"']*)?)["']/i
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      return normalizeUrl(unescapeUrl(match[1]), pageUrl);
    }
  }
  return '';
}

function extractMediaDefinitionUrl(raw, pageUrl) {
  try {
    const normalized = unescapeUrl(raw);
    const definitions = JSON.parse(normalized);
    if (!Array.isArray(definitions)) return '';
    const preferred = definitions.find((item) => item && item.format === 'hls' && item.videoUrl)
      || definitions.find((item) => item && item.format === 'mp4' && item.videoUrl)
      || definitions.find((item) => item && item.videoUrl);
    return preferred ? normalizeUrl(preferred.videoUrl, pageUrl) : '';
  } catch (error) {
    return '';
  }
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
  return ['/cat/', '/category', '/categories', '/channels', '/channel', '/tags', '/tag', '/pornstars', '/models', '/searches', '/latest', '/new', '/browse'].some((part) => lower.includes(part));
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
