const SITE = {
  "file": "xvideos.js",
  "key": "xvideos",
  "title": "XVideos",
  "baseUrl": "https://www.xvideos.com",
  "searchPath": "/?k={keyword}&p={page0}",
  "latestPath": "/new",
  "videoPathKeywords": [
    "/video"
  ]
};
const DEFAULT_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
};

WidgetMetadata = {
  id: 'lydevils.xvideos',
  title: 'XVideos',
  description: 'XVideos real video source.',
  author: 'LYDevils',
  site: 'https://www.xvideos.com',
  version: '1.0.0',
  requiredVersion: '0.0.1',
  detailCacheDuration: 300,
  modules: [
    {
      id: 'search-videos',
      title: 'XVideos',
      description: 'Search real videos.',
      functionName: 'searchVideos',
      type: 'list',
      params: [
        { name: 'keyword', title: 'Keyword', type: 'input' },
        { name: 'page', title: 'Page', type: 'page', startPage: 1 }
      ]
    },
    {
      id: 'get-categories',
      title: 'XVideos',
      description: 'Load categories from the site navigation.',
      functionName: 'getCategories',
      type: 'list',
      params: []
    },
    {
      id: 'get-video-detail',
      title: 'XVideos',
      description: 'Load video detail by URL.',
      functionName: 'getVideoDetail',
      type: 'list',
      params: [{ name: 'url', title: 'URL', type: 'input' }]
    }
  ]
};

searchVideos = async (params = {}) => {
  const keyword = String(params.keyword || '').trim();
  const page = Math.max(1, Number(params.page || 1));
  const url = keyword ? buildSearchUrl(keyword, page) : normalizeUrl(SITE.latestPath || '/', SITE.baseUrl);
  return loadVideoList(url);
};

getCategories = async () => loadCategories();

getVideoDetail = async (params = {}) => {
  const url = String(params.url || params.link || '').trim();
  if (!url) {
    return [createMessage('Missing URL', 'Enter or open a real video URL first.')];
  }
  return [await loadDetail(url)];
};

async function loadDetail(link) {
  const url = normalizeUrl(link, SITE.baseUrl);
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

    $('a[href]').each((_, element) => {
      const href = $(element).attr('href');
      const videoUrl = normalizeUrl(href, SITE.baseUrl);
      if (!isLikelyVideoUrl(videoUrl) || seen.has(videoUrl)) return;

      const image = $(element).find('img').first();
      const title = pickTitle($, element, image);
      if (!title || title.length < 2) return;

      seen.add(videoUrl);
      const coverUrl = normalizeUrl(readFirstAttr(image, ['data-src', 'data-original', 'data-lazy-src', 'data-thumb_url', 'data-mediumthumb', 'src']), SITE.baseUrl);
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

    return results.length > 0 ? results.slice(0, 40) : [createMessage('No videos found', 'The site returned no parseable video entries. Try another keyword or page.')];
  } catch (error) {
    return [createMessage('Request failed', String(error.message || error))];
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
        type: 'url',
        title,
        description: SITE.title,
        link: url,
        mediaType: 'movie',
        playerType: 'system',
        source: SITE.title
      });
    });
    return results.length > 0 ? results.slice(0, 80) : [createMessage('No categories found', 'The site navigation did not expose category links.')];
  } catch (error) {
    return [createMessage('Request failed', String(error.message || error))];
  }
}

function buildSearchUrl(keyword, page) {
  const encoded = encodeURIComponent(keyword);
  const encodedPath = encodeURIComponent(keyword).replace(/%20/g, '-');
  const page0 = Math.max(0, page - 1);
  const path = String(SITE.searchPath || '/')
    .replace('{keyword}', encoded)
    .replace('{keywordPath}', encodedPath)
    .replace('{page0}', String(page0))
    .replace('{page}', String(page));
  return normalizeUrl(path, SITE.baseUrl);
}

async function fetchText(url) {
  const response = await Widget.http.get(url, { headers: DEFAULT_HEADERS, timeout: 15000 });
  if (typeof response === 'string') return response;
  return String(response.data || response.body || response.html || '');
}

function pickTitle($, element, image) {
  const direct = cleanText(
    $(element).attr('title') ||
    $(element).attr('aria-label') ||
    image.attr('alt') ||
    $(element).find('[title]').first().attr('title') ||
    $(element).find('.title,.video-title,.thumb-title').first().text() ||
    $(element).text()
  );
  if (direct) return direct;

  return cleanText($(element).parent().text()).slice(0, 120);
}

function findDuration($, element) {
  const text = cleanText($(element).parent().text());
  const match = text.match(/\b\d{1,2}:\d{2}(?::\d{2})?\b/);
  return match ? 'Duration: ' + match[0] : '';
}

function extractVideoUrl(html, pageUrl) {
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

function isLikelyVideoUrl(url) {
  const lower = String(url || '').toLowerCase();
  if (!lower.startsWith(SITE.baseUrl.toLowerCase().replace(/\/$/, ''))) return false;
  if ((SITE.videoPathKeywords || []).some((keyword) => lower.includes(String(keyword).toLowerCase()))) return true;
  return Boolean(SITE.numericVideoPaths && /^https?:\/\/[^/]+\/\d+(?:[/?#]|$)/i.test(lower));
}

function isLikelyCategoryUrl(url) {
  const lower = String(url || '').toLowerCase();
  if (!lower.startsWith(SITE.baseUrl.toLowerCase().replace(/\/$/, ''))) return false;
  if (isLikelyVideoUrl(url)) return false;
  return ['/category', '/categories', '/channels', '/channel', '/tags', '/tag', '/pornstars', '/models', '/searches', '/latest', '/new', '/browse'].some((part) => lower.includes(part));
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
  return String(value || '').replace(/\\\//g, '/').replace(/\\u0026/g, '&');
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
