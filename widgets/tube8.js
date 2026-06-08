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

const CATEGORY_TITLE_MAP = {
  "18 25": "18-25",
  "18-25": "18-25",
  "ai": "AI",
  "all": "全部",
  "all categories": "全部分类",
  "amateur": "素人",
  "anal": "肛交",
  "arab": "阿拉伯",
  "asian": "亚洲",
  "asian woman": "亚洲",
  "asmr": "ASMR",
  "ass": "美臀",
  "babe": "辣妹",
  "best": "精选",
  "bbw": "丰满",
  "bi": "双性",
  "bi sexual": "双性",
  "bisexual": "双性",
  "big ass": "巨臀",
  "big cock": "巨根",
  "big dick": "巨根",
  "big tits": "巨乳",
  "black": "黑人",
  "black woman": "黑人",
  "blonde": "金发",
  "blowjob": "口交",
  "bondage": "捆绑",
  "brazilian": "巴西",
  "brunette": "黑发",
  "bts": "幕后",
  "bukkake": "群射",
  "cam porn": "摄像头",
  "cartoon": "卡通",
  "casting": "试镜",
  "categories": "分类总览",
  "celebrity": "名人",
  "channels": "频道总览",
  "cock competition": "比根",
  "college": "学院(18+)",
  "college (18+)": "学院(18+)",
  "compilation": "合集",
  "cosplay": "角色扮演",
  "creampie": "中出",
  "cuckold": "绿帽",
  "cuckold hotwife": "绿帽/换妻",
  "cumshot": "射精",
  "double penetration": "双插",
  "ebony": "黑人",
  "erotic": "情色",
  "european": "欧美",
  "facials": "颜射",
  "family strokes": "Family Strokes 官方",
  "feet": "足交",
  "female orgasm": "女性高潮",
  "femdom": "女王",
  "fetish": "恋物",
  "fingering": "手指",
  "fisting": "拳交",
  "freaks of cock": "Freaks Of Cock 官方",
  "french": "法式",
  "fucked up family": "乱伦剧情",
  "funny": "搞笑",
  "gangav": "GangAV 官方",
  "gangbang": "群交",
  "gapes": "扩张",
  "german": "德国",
  "group": "群体",
  "handjob": "手交",
  "hardcore": "重口",
  "hd": "高清",
  "hentai": "里番",
  "hot": "热门",
  "indian": "印度",
  "interracial": "跨种族",
  "japanese": "日本",
  "javhd": "JavHD 官方",
  "latina": "拉丁",
  "lesbian": "女同",
  "lingerie": "内衣",
  "long": "长片",
  "latest": "最新",
  "magic asian pussy": "Magic Asian Pussy 官方",
  "massage": "按摩",
  "masturbation": "自慰",
  "mature": "熟女",
  "milf": "熟女",
  "moms teach sex": "Moms Teach Sex 官方",
  "monthly hot": "本月热门",
  "most subscribed": "最多订阅",
  "most viewed": "最多观看",
  "muscle": "肌肉",
  "newest": "最新",
  "oiled": "抹油",
  "orgy": "乱交",
  "parody": "恶搞",
  "party": "派对",
  "pissing": "排尿",
  "popular": "热门",
  "popular with women": "女性热门",
  "pornstar": "明星演员",
  "pornstars": "演员总览",
  "pov": "主视角",
  "public": "户外",
  "pure taboo": "Pure Taboo 官方",
  "pussy licking": "舔阴",
  "reality": "真实",
  "recommended": "推荐",
  "redhead": "红发",
  "refined": "精选",
  "recently updated": "最近更新",
  "romantic": "浪漫",
  "rough": "粗暴",
  "shemale": "人妖",
  "small tits": "贫乳",
  "solo": "单人",
  "solo and masturbation": "单人/自慰",
  "solo girl": "女生单人",
  "solo male": "男生单人",
  "squirting": "潮吹",
  "step fantasy": "继亲剧情",
  "stockings": "丝袜",
  "strip": "脱衣",
  "striptease": "脱衣秀",
  "tags": "标签总览",
  "tattoos": "纹身",
  "threesome": "3P",
  "top rated": "最高评分",
  "toys": "玩具",
  "trans": "跨性别",
  "transgender": "跨性别",
  "verified amateurs": "认证素人",
  "vintage": "复古",
  "virtual reality": "VR",
  "webcam": "直播摄像",
  "bang bros network": "Bang Bros 官方",
  "brazzers": "Brazzers 官方",
  "team skeet": "Team Skeet 官方",
  "vixen": "Vixen 官方"
};

function normalizeCategoryTitle(value) {
  return String(value || '')
    .replace(/\b\d[\d,.KMB]*\s+Videos?\b/gi, '')
    .replace(/\s+Category$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeCategoryKey(value) {
  return normalizeCategoryTitle(value)
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[\/_]+/g, ' ')
    .replace(/\s*-\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function localizeCategoryTitle(value) {
  const normalized = normalizeCategoryTitle(value);
  if (!normalized) return '';
  const key = normalizeCategoryKey(normalized);
  return CATEGORY_TITLE_MAP[key] || normalized;
}

function localizeCategoryOptions(options) {
  return (options || []).map((item) => ({
    title: localizeCategoryTitle(item.title),
    value: item.value
  }));
}

const REGION_OPTIONS = [
  { title: "亚洲", value: "/cat/asian/" },
  { title: "日本", value: "/cat/japanese/" }
];

const PERSON_OPTIONS = [
  { title: "素人", value: "/cat/amateur/" },
  { title: "熟女", value: "/cat/milf/" }
];

const FEATURE_OPTIONS = [
  { title: "里番", value: "/cat/hentai/" },
  { title: "主视角", value: "/cat/pov/" },
  { title: "女同", value: "/cat/lesbian/" }
];

const SORT_OPTIONS = [
  { title: "最新", value: "/newest.html/" }
];

const CHANNEL_OPTIONS = [

];

const CATEGORY_OPTIONS = mergeCategoryOptions(
  REGION_OPTIONS,
  PERSON_OPTIONS,
  FEATURE_OPTIONS,
  SORT_OPTIONS,
  CHANNEL_OPTIONS
);

const CATEGORY_PAGE_OPTIONS = [
  { title: "\u9996\u9875", value: SITE.latestPath || "/" },
  { title: "\u5168\u90e8\u5206\u7c7b", value: "/categories.html" }
];

const SITE_CATEGORIES_MODULE = {
  id: 'site-categories',
  title: '\u5e73\u53f0\u5206\u7c7b',
  description: '\u4ece\u5e73\u53f0\u5f53\u524d\u9875\u9762\u6293\u53d6\u771f\u5b9e\u5206\u7c7b\u5165\u53e3\u3002',
  functionName: 'loadSiteCategories',
  cacheDuration: 300,
  params: [
    {
      name: 'categoryPage',
      title: '\u5206\u7c7b\u5165\u53e3',
      type: 'enumeration',
      value: CATEGORY_PAGE_OPTIONS[0] ? CATEGORY_PAGE_OPTIONS[0].value : '/',
      enumOptions: CATEGORY_PAGE_OPTIONS
    },
    { name: 'page', title: '\u89c6\u9891\u9875\u7801', type: 'page' }
  ]
};

function mergeCategoryOptions() {
  const seen = new Set();
  const output = [];
  for (const options of arguments) {
    for (const item of options || []) {
      const value = String(item.value || '');
      if (!value || seen.has(value)) continue;
      seen.add(value);
      output.push(item);
    }
  }
  return output;
}

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
  version: '1.0.18',
  requiredVersion: '0.0.1',
  detailCacheDuration: 300,
  modules: [
    {
      id: 'region-videos',
      title: '地区语言',
      description: '按地区、语言或字幕筛选影片。',
      functionName: 'loadCategoryVideos',
      params: [
        {
          name: 'categoryPreset',
          title: '选择地区/语言',
          type: 'enumeration',
          value: REGION_OPTIONS[0] ? REGION_OPTIONS[0].value : '',
          enumOptions: REGION_OPTIONS
        },
        { name: 'page', title: '页码', type: 'page' }
      ]
    },
    {
      id: 'person-videos',
      title: '人物分类',
      description: '按人物身份或出演类型筛选影片。',
      functionName: 'loadCategoryVideos',
      params: [
        {
          name: 'categoryPreset',
          title: '选择人物分类',
          type: 'enumeration',
          value: PERSON_OPTIONS[0] ? PERSON_OPTIONS[0].value : '',
          enumOptions: PERSON_OPTIONS
        },
        { name: 'page', title: '页码', type: 'page' }
      ]
    },
    {
      id: 'feature-videos',
      title: '特点分类',
      description: '按题材、风格或内容特点筛选影片。',
      functionName: 'loadCategoryVideos',
      params: [
        {
          name: 'categoryPreset',
          title: '选择特点',
          type: 'enumeration',
          value: FEATURE_OPTIONS[0] ? FEATURE_OPTIONS[0].value : '',
          enumOptions: FEATURE_OPTIONS
        },
        { name: 'page', title: '页码', type: 'page' }
      ]
    },
    {
      id: 'sort-videos',
      title: '排序筛选',
      description: '按最新、热门、评分等排序筛选影片。',
      functionName: 'loadCategoryVideos',
      params: [
        {
          name: 'categoryPreset',
          title: '选择排序',
          type: 'enumeration',
          value: SORT_OPTIONS[0] ? SORT_OPTIONS[0].value : '',
          enumOptions: SORT_OPTIONS
        },
        { name: 'page', title: '页码', type: 'page' }
      ]
    }
  ]
};

WidgetMetadata.modules = [SITE_CATEGORIES_MODULE].concat(WidgetMetadata.modules.filter(hasUsablePresetModule));

searchVideos = async (params = {}) => {
  const keyword = String(params.keyword || '').trim();
  const page = Math.max(1, Number(params.page || 1));
  const url = keyword ? buildSearchUrl(keyword, page) : buildCategoryUrl(SITE.latestPath, page);
  return loadVideoList(url);
};



loadSiteCategories = async (params = {}) => {
  const preset = CATEGORY_PAGE_OPTIONS.find((item) => item.value === params.categoryPage) || CATEGORY_PAGE_OPTIONS[0];
  const startUrl = normalizeUrl((preset && preset.value) || params.categoryPage || SITE.latestPath || '/', SITE.baseUrl);
  const page = Math.max(1, Number(params.page || 1));
  try {
    const html = await fetchText(startUrl);
    const $ = Widget.html.load(html);
    const results = [];
    const seen = new Set();

    $('a[href]').each((_, element) => {
      const categoryUrl = normalizeUrl($(element).attr('href'), SITE.baseUrl);
      if (!isLikelyCategoryUrl(categoryUrl)) return;
      const key = categoryUrl.replace(/#.*$/, '').replace(/\/$/, '');
      if (!key || seen.has(key)) return;
      const title = pickCategoryTitle($, element, categoryUrl);
      if (!title) return;
      seen.add(key);
      const targetUrl = buildCategoryUrl(categoryUrl, page);
      results.push({
        id: hashId('category|' + targetUrl),
        type: 'link',
        title,
        description: ['\u5e73\u53f0\u771f\u5b9e\u5165\u53e3', page > 1 ? '\u7b2c ' + page + ' \u9875' : ''].filter(Boolean).join(' | '),
        link: 'category|' + targetUrl,
        mediaType: 'movie',
        playerType: 'system',
        source: SITE.title
      });
    });

    return results.length > 0 ? results.slice(0, 60) : [createMessage('\u672a\u627e\u5230\u5206\u7c7b', '\u5e73\u53f0\u5f53\u524d\u9875\u9762\u6ca1\u6709\u8fd4\u56de\u53ef\u8bc6\u522b\u7684\u5206\u7c7b\u5165\u53e3\uff0c\u8bf7\u6362\u5206\u7c7b\u5165\u53e3\u6216\u7a0d\u540e\u91cd\u8bd5\u3002')];
  } catch (error) {
    return [createMessage('\u5206\u7c7b\u8bfb\u53d6\u5931\u8d25', String(error.message || error))];
  }
};

loadCategoryVideos = async (params = {}) => {
  const preset = CATEGORY_OPTIONS.find((item) => item.value === params.categoryPreset) || CATEGORY_OPTIONS[0];
  const categoryId = String((preset && preset.value) || params.categoryPreset || params.categoryId || params.categoryUrl || params.url || '').trim();
  const categoryName = String((preset && preset.title) || params.categoryName || '').trim();
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
  let html;
  try {
    html = await fetchText(url);
  } catch (error) {
    return createWebPlaybackFallbackDetail(url, SITE.title, String(error.message || error));
  }
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
  const videoUrl = extractVideoUrl(html, url);
  if (!videoUrl) {
    return createWebPlaybackFallbackDetail(url, title, '详情页已加载，但未找到 mp4/m3u8 播放地址。可能需要登录、WebView 或当前网络受限。');
  }

  return {
    id: hashId(url),
    type: 'detail',
    title,
    description,
    coverUrl,
    posterPath: coverUrl,
    backdropPath: coverUrl,
    link: url,
    videoUrl,
    childItems: buildDirectPlaybackItems(url, videoUrl, title, coverUrl),
    episodeItems: buildDirectPlaybackItems(url, videoUrl, title, coverUrl),
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
        posterPath: coverUrl,
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

function hasUsablePresetModule(moduleItem) {
  const params = moduleItem && Array.isArray(moduleItem.params) ? moduleItem.params : [];
  const categoryParam = params.find((param) => param && param.name === 'categoryPreset');
  return !categoryParam || (Array.isArray(categoryParam.enumOptions) && categoryParam.enumOptions.length > 0);
}

function pickCategoryTitle($, element, url) {
  const anchor = $(element);
  let title = cleanText(anchor.attr('title') || anchor.attr('aria-label') || anchor.text() || '');
  if (!title || title.length > 80) title = titleFromCategoryUrl(url);
  title = title
    .replace(/\b\d[\d,.KMB]*\s+Videos?\b/gi, ' ')
    .replace(/\s+Category$/i, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (typeof localizeCategoryTitle === 'function') title = localizeCategoryTitle(title);
  if (!title || title.length < 2 || title.length > 60 || isBlockedCategoryTitle(title)) return '';
  return title;
}

function titleFromCategoryUrl(url) {
  const cleanUrl = String(url || '').replace(/[?#].*$/, '').replace(/\/$/, '');
  const part = cleanUrl.split('/').filter(Boolean).pop() || '';
  return decodeURIComponent(part).replace(/[-_]+/g, ' ').trim();
}

function isBlockedCategoryTitle(title) {
  return /^(?:home|login|log in|sign in|sign up|join|upload|premium|live|photos|gifs|community|blog|support|terms|privacy|dmca|2257|advertising|help|language|categories|category|tags|tag|channels|channel|models|pornstars|latest|new|browse|\u9996\u9875|\u767b\u5f55|\u6ce8\u518c|\u4e0a\u4f20|\u76f4\u64ad|\u5206\u7c7b|\u5206\u7c7b\u603b\u89c8|\u6807\u7b7e|\u6807\u7b7e\u603b\u89c8|\u9891\u9053|\u9891\u9053\u603b\u89c8|\u660e\u661f\u6f14\u5458|\u6700\u65b0|\u66f4\u591a|\u5173\u4e8e)$/i.test(String(title || '').trim());
}

function pickTitle($, element, image) {
  const anchor = $(element);
  const container = anchor.closest('article, li, .video-box, .video-item, .thumb-block, .pcVideoListItem, .wrap, .card, div');
  const candidates = [
    anchor.attr('title'),
    anchor.attr('aria-label'),
    image.attr('alt'),
    image.attr('title'),
    anchor.find('[title]').first().attr('title'),
    anchor.find('.title,.video-title,.thumb-title,.video-title-text,.tm_video_title').first().text(),
    container.find('.title,.video-title,.thumb-title,.video-title-text,.tm_video_title').first().text(),
    anchor.text(),
    container.text()
  ];

  for (const candidate of candidates) {
    const title = normalizeTitleCandidate(candidate);
    if (title) return title;
  }
  return '';
}

function normalizeTitleCandidate(value) {
  const title = cleanText(value)
    .replace(/\b\d{1,2}:\d{2}(?::\d{2})?\b/g, ' ')
    .replace(/\b(?:HD|4K|VR)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!title || title.length < 2) return '';
  if (/^\d{1,2}:\d{2}(?::\d{2})?$/.test(title)) return '';
  if (/^(?:HD|4K|VR|NEW|HOT)$/i.test(title)) return '';
  return title.slice(0, 160);
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
    /<iframe[^>]+src=["']([^"']+)["']/i,
    /<embed[^>]+src=["']([^"']+)["']/i,
    /["'](?:contentUrl|videoUrl|file|hls|url)["']\s*[:=]\s*["']([^"']+\.(?:m3u8|mp4)(?:[^"']*)?)["']/i,
    /(?:contentUrl|videoUrl|file|hls|url)\s*[:=]\s*["']([^"']+\.(?:m3u8|mp4)(?:[^"']*)?)["']/i
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match && match[1]) {
      const value = normalizeUrl(unescapeUrl(match[1]), pageUrl);
      if (isPlayableUrl(value)) return value;
    }
  }
  return '';
}

function isPlayableUrl(value) {
  return /\.(?:m3u8|mp4)(?:[?#].*)?$/i.test(String(value || ''));
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
    .replace(/\\u0026/gi, '&')
    .replace(/\\u003d/gi, '=')
    .replace(/\\u003f/gi, '?')
    .replace(/\\u002f/gi, '/')
    .replace(/\\u003a/gi, ':')
    .replace(/%5C%2F/gi, '/')
    .replace(/%5C\//gi, '/')
    .replace(/&amp;/g, '&')
    .replace(/&#38;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
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

function buildDirectPlaybackItems(link, videoUrl, title, coverUrl) {
  const normalizedPageUrl = normalizeUrl(link, SITE.baseUrl);
  const items = [];
  if (videoUrl) {
    items.push({
      id: videoUrl,
      type: 'url',
      title: title ? title + ' - 直链播放' : '直链播放',
      link: normalizedPageUrl,
      videoUrl,
      posterPath: coverUrl,
      backdropPath: coverUrl,
      mediaType: 'movie',
      playerType: 'system'
    });
  }
  if (normalizedPageUrl) {
    items.push({
      id: hashId('web|' + normalizedPageUrl),
      type: 'url',
      title: '网页播放',
      link: normalizedPageUrl,
      videoUrl: normalizedPageUrl,
      posterPath: coverUrl,
      backdropPath: coverUrl,
      mediaType: 'movie',
      playerType: 'app'
    });
  }
  return items;
}

function createWebPlaybackFallbackDetail(pageUrl, title, reason) {
  const normalizedPageUrl = normalizeUrl(pageUrl, SITE.baseUrl);
  return {
    id: hashId(normalizedPageUrl),
    type: 'detail',
    title: title || SITE.title,
    description: ['脚本请求原站失败，可尝试网页播放。', reason].filter(Boolean).join(' '),
    link: normalizedPageUrl,
    videoUrl: normalizedPageUrl,
    childItems: [
      {
        id: hashId('web|' + normalizedPageUrl),
        type: 'url',
        title: '网页播放',
        link: normalizedPageUrl,
        videoUrl: normalizedPageUrl,
        mediaType: 'movie',
        playerType: 'app'
      }
    ],
    episodeItems: [
      {
        id: hashId('web|' + normalizedPageUrl),
        type: 'url',
        title: '网页播放',
        link: normalizedPageUrl,
        videoUrl: normalizedPageUrl,
        mediaType: 'movie',
        playerType: 'app'
      }
    ],
    mediaType: 'movie',
    playerType: 'app',
    source: SITE.title
  };
}
function createMessage(title, description) {
  return {
    id: SITE.key + '.message.' + hashId(title + description),
    type: 'text',
    title,
    description
  };
}
