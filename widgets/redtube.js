const SITE = {
  "file": "redtube.js",
  "key": "redtube",
  "title": "RedTube",
  "baseUrl": "https://www.redtube.com",
  "searchPath": "/?search={keyword}&page={page}",
  "latestPath": "/",
  "videoPathKeywords": [
    "/video/"
  ],
  "numericVideoPaths": true
};
const CATEGORY_OPTIONS = [
  { title: "Newest", value: "/newest" },
  { title: "All Categories", value: "/categories?cc=jp" },
  { title: "Trans", value: "/redtube/transgender" },
  { title: "Amateur", value: "/redtube/amateur" },
  { title: "Anal", value: "/redtube/anal" },
  { title: "Arab", value: "/redtube/arab" },
  { title: "Asian", value: "/redtube/asian" },
  { title: "BBW", value: "/redtube/bbw" },
  { title: "Big Ass", value: "/redtube/bigass" },
  { title: "Big Dick", value: "/redtube/bigdick" },
  { title: "Big Tits", value: "/redtube/bigtits" },
  { title: "Blonde", value: "/redtube/blonde" },
  { title: "Blowjob", value: "/redtube/blowjob" },
  { title: "Bondage", value: "/redtube/bondage" },
  { title: "Brazilian", value: "/redtube/brazilian" },
  { title: "Brunette", value: "/redtube/brunette" },
  { title: "Bukkake", value: "/redtube/bukkake" },
  { title: "Cartoon", value: "/redtube/cartoon" },
  { title: "Casting", value: "/redtube/casting" },
  { title: "Celebrity", value: "/redtube/celebrity" },
  { title: "College (18+)", value: "/redtube/college" },
  { title: "Compilation", value: "/redtube/compilation" },
  { title: "Cosplay", value: "/redtube/cosplay" },
  { title: "Creampie", value: "/redtube/creampie" },
  { title: "Cuckold", value: "/redtube/cuckold" },
  { title: "Cumshot", value: "/redtube/cumshot" },
  { title: "Double Penetration", value: "/redtube/doublepenetration" },
  { title: "Ebony", value: "/redtube/ebony" },
  { title: "European", value: "/redtube/european" },
  { title: "Facials", value: "/redtube/facials" },
  { title: "Feet", value: "/redtube/feet" },
  { title: "Female Orgasm", value: "/redtube/femaleorgasm" },
  { title: "Fetish", value: "/redtube/fetish" },
  { title: "Fingering", value: "/redtube/fingering" },
  { title: "Fisting", value: "/redtube/fisting" },
  { title: "French", value: "/redtube/french" },
  { title: "Funny", value: "/redtube/funny" },
  { title: "Gangbang", value: "/redtube/gangbang" },
  { title: "German", value: "/redtube/german" },
  { title: "Group", value: "/redtube/group" },
  { title: "Handjob", value: "/redtube/handjob" },
  { title: "Hardcore", value: "/redtube/hardcore" },
  { title: "HD", value: "/redtube/hd" },
  { title: "Hentai", value: "/redtube/hentai" },
  { title: "Indian", value: "/redtube/indian" },
  { title: "Interracial", value: "/redtube/interracial" },
  { title: "Japanese", value: "/redtube/japanese" },
  { title: "Latina", value: "/redtube/latina" },
  { title: "Lesbian", value: "/redtube/lesbian" },
  { title: "Lingerie", value: "/redtube/lingerie" },
  { title: "Massage", value: "/redtube/massage" },
  { title: "Masturbation", value: "/redtube/masturbation" },
  { title: "Mature", value: "/redtube/mature" },
  { title: "MILF", value: "/redtube/milf" },
  { title: "Orgy", value: "/redtube/orgy" },
  { title: "Parody", value: "/redtube/parody" },
  { title: "Party", value: "/redtube/party" },
  { title: "Pissing", value: "/redtube/pissing" },
  { title: "Popular With Women", value: "/redtube/popular-with-women" },
  { title: "POV", value: "/redtube/pov" },
  { title: "Public", value: "/redtube/public" },
  { title: "Pussy Licking", value: "/redtube/pussy-licking" },
  { title: "Reality", value: "/redtube/reality" },
  { title: "Redhead", value: "/redtube/redhead" },
  { title: "Romantic", value: "/redtube/romantic" },
  { title: "Rough", value: "/redtube/rough" },
  { title: "Small Tits", value: "/redtube/small-tits" },
  { title: "Solo Male", value: "/redtube/solomale" },
  { title: "Squirting", value: "/redtube/squirting" },
  { title: "Step Fantasy", value: "/redtube/stepfantasy" },
  { title: "Striptease", value: "/redtube/striptease" },
  { title: "18-25", value: "/redtube/teens" },
  { title: "Threesome", value: "/redtube/threesome" },
  { title: "Toys", value: "/redtube/toys" },
  { title: "Verified Amateurs", value: "/redtube/verifiedamateurs" },
  { title: "Vintage", value: "/redtube/vintage" },
  { title: "Virtual Reality", value: "/redtube/virtualreality" },
  { title: "Webcam", value: "/redtube/webcam" },
  { title: "Young (18+) and Old", value: "/redtube/youngandold" },
  { title: "GangAV", value: "/channels/gangav" },
  { title: "JavHD", value: "/channels/javhd" },
  { title: "Recommended", value: "/channel/recommended" },
  { title: "Top Rated", value: "/channel/top-rated" },
  { title: "Most Viewed", value: "/channel/most-viewed" },
  { title: "Most Subscribed", value: "/channel/most-subscribed" },
  { title: "Recently Updated", value: "/channel/recently-updated" },
  { title: "Brazzers 4.2K Videos", value: "/channels/brazzers" },
  { title: "Bang Bros Network 6.8K Videos", value: "/channels/bangbros" },
  { title: "Moms Teach Sex", value: "/channels/momsteachsex" },
  { title: "Freaks Of Cock", value: "/channels/freaksofcock" },
  { title: "Casual Teen Sex", value: "/channels/casualteensex" },
  { title: "Cock Competition", value: "/channels/cockcompetition" }
];

const DEFAULT_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
};

WidgetMetadata = {
  id: 'lydevils.redtube',
  title: 'RedTube',
  description: 'RedTube 真实视频数据源。',
  author: 'LYDevils',
  site: 'https://www.redtube.com',
  version: '1.0.6',
  requiredVersion: '0.0.1',
  detailCacheDuration:300,
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
          enumOptions: [
  { title: "Newest", value: "/newest" },
  { title: "All Categories", value: "/categories?cc=jp" },
  { title: "Trans", value: "/redtube/transgender" },
  { title: "Amateur", value: "/redtube/amateur" },
  { title: "Anal", value: "/redtube/anal" },
  { title: "Arab", value: "/redtube/arab" },
  { title: "Asian", value: "/redtube/asian" },
  { title: "BBW", value: "/redtube/bbw" },
  { title: "Big Ass", value: "/redtube/bigass" },
  { title: "Big Dick", value: "/redtube/bigdick" },
  { title: "Big Tits", value: "/redtube/bigtits" },
  { title: "Blonde", value: "/redtube/blonde" },
  { title: "Blowjob", value: "/redtube/blowjob" },
  { title: "Bondage", value: "/redtube/bondage" },
  { title: "Brazilian", value: "/redtube/brazilian" },
  { title: "Brunette", value: "/redtube/brunette" },
  { title: "Bukkake", value: "/redtube/bukkake" },
  { title: "Cartoon", value: "/redtube/cartoon" },
  { title: "Casting", value: "/redtube/casting" },
  { title: "Celebrity", value: "/redtube/celebrity" },
  { title: "College (18+)", value: "/redtube/college" },
  { title: "Compilation", value: "/redtube/compilation" },
  { title: "Cosplay", value: "/redtube/cosplay" },
  { title: "Creampie", value: "/redtube/creampie" },
  { title: "Cuckold", value: "/redtube/cuckold" },
  { title: "Cumshot", value: "/redtube/cumshot" },
  { title: "Double Penetration", value: "/redtube/doublepenetration" },
  { title: "Ebony", value: "/redtube/ebony" },
  { title: "European", value: "/redtube/european" },
  { title: "Facials", value: "/redtube/facials" },
  { title: "Feet", value: "/redtube/feet" },
  { title: "Female Orgasm", value: "/redtube/femaleorgasm" },
  { title: "Fetish", value: "/redtube/fetish" },
  { title: "Fingering", value: "/redtube/fingering" },
  { title: "Fisting", value: "/redtube/fisting" },
  { title: "French", value: "/redtube/french" },
  { title: "Funny", value: "/redtube/funny" },
  { title: "Gangbang", value: "/redtube/gangbang" },
  { title: "German", value: "/redtube/german" },
  { title: "Group", value: "/redtube/group" },
  { title: "Handjob", value: "/redtube/handjob" },
  { title: "Hardcore", value: "/redtube/hardcore" },
  { title: "HD", value: "/redtube/hd" },
  { title: "Hentai", value: "/redtube/hentai" },
  { title: "Indian", value: "/redtube/indian" },
  { title: "Interracial", value: "/redtube/interracial" },
  { title: "Japanese", value: "/redtube/japanese" },
  { title: "Latina", value: "/redtube/latina" },
  { title: "Lesbian", value: "/redtube/lesbian" },
  { title: "Lingerie", value: "/redtube/lingerie" },
  { title: "Massage", value: "/redtube/massage" },
  { title: "Masturbation", value: "/redtube/masturbation" },
  { title: "Mature", value: "/redtube/mature" },
  { title: "MILF", value: "/redtube/milf" },
  { title: "Orgy", value: "/redtube/orgy" },
  { title: "Parody", value: "/redtube/parody" },
  { title: "Party", value: "/redtube/party" },
  { title: "Pissing", value: "/redtube/pissing" },
  { title: "Popular With Women", value: "/redtube/popular-with-women" },
  { title: "POV", value: "/redtube/pov" },
  { title: "Public", value: "/redtube/public" },
  { title: "Pussy Licking", value: "/redtube/pussy-licking" },
  { title: "Reality", value: "/redtube/reality" },
  { title: "Redhead", value: "/redtube/redhead" },
  { title: "Romantic", value: "/redtube/romantic" },
  { title: "Rough", value: "/redtube/rough" },
  { title: "Small Tits", value: "/redtube/small-tits" },
  { title: "Solo Male", value: "/redtube/solomale" },
  { title: "Squirting", value: "/redtube/squirting" },
  { title: "Step Fantasy", value: "/redtube/stepfantasy" },
  { title: "Striptease", value: "/redtube/striptease" },
  { title: "18-25", value: "/redtube/teens" },
  { title: "Threesome", value: "/redtube/threesome" },
  { title: "Toys", value: "/redtube/toys" },
  { title: "Verified Amateurs", value: "/redtube/verifiedamateurs" },
  { title: "Vintage", value: "/redtube/vintage" },
  { title: "Virtual Reality", value: "/redtube/virtualreality" },
  { title: "Webcam", value: "/redtube/webcam" },
  { title: "Young (18+) and Old", value: "/redtube/youngandold" },
  { title: "GangAV", value: "/channels/gangav" },
  { title: "JavHD", value: "/channels/javhd" },
  { title: "Recommended", value: "/channel/recommended" },
  { title: "Top Rated", value: "/channel/top-rated" },
  { title: "Most Viewed", value: "/channel/most-viewed" },
  { title: "Most Subscribed", value: "/channel/most-subscribed" },
  { title: "Recently Updated", value: "/channel/recently-updated" },
  { title: "Brazzers 4.2K Videos", value: "/channels/brazzers" },
  { title: "Bang Bros Network 6.8K Videos", value: "/channels/bangbros" },
  { title: "Moms Teach Sex", value: "/channels/momsteachsex" },
  { title: "Freaks Of Cock", value: "/channels/freaksofcock" },
  { title: "Casual Teen Sex", value: "/channels/casualteensex" },
  { title: "Cock Competition", value: "/channels/cockcompetition" }
]
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
  const url = keyword ? buildSearchUrl(keyword, page) : normalizeUrl(SITE.latestPath || '/', SITE.baseUrl);
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
  if (/^https?:\/\//i.test(value) || value.startsWith('/')) return appendPageParam(normalizeUrl(value, SITE.baseUrl), page);
  const normalized = value.replace(/^\/+/, '');
  const suffix = page && Number(page) > 1 ? (normalized.indexOf('?') === -1 ? '?page=' + page : '&page=' + page) : '';
  return normalizeUrl('/' + normalized + suffix, SITE.baseUrl);
}

function appendPageParam(url, page) {
  if (!page || Number(page) <= 1 || /[?&]page=/i.test(url)) return url;
  return url + (url.indexOf('?') === -1 ? '?page=' : '&page=') + page;
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
  return match ? '时长：' + match[0] : '';
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
