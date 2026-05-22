const SITE = {
  "file": "pornhub.js",
  "key": "pornhub",
  "title": "Pornhub",
  "baseUrl": "https://www.pornhub.com",
  "searchPath": "/video/search?search={keyword}&page={page}",
  "latestPath": "/video",
  "videoPathKeywords": [
    "view_video.php"
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
  { title: "亚洲", value: "/categories/asian" },
  { title: "日本", value: "/categories/japanese" }
];

const PERSON_OPTIONS = [
  { title: "素人", value: "/categories/amateur" },
  { title: "熟女", value: "/categories/milf" },
  { title: "辣妹", value: "/categories/babe" }
];

const FEATURE_OPTIONS = [
  { title: "里番", value: "/categories/hentai" },
  { title: "角色扮演", value: "/categories/cosplay" },
  { title: "主视角", value: "/categories/pov" },
  { title: "女同", value: "/categories/lesbian" }
];

const SORT_OPTIONS = [
  { title: "最新", value: "/video" },
  { title: "最多观看", value: "/video?o=mv" },
  { title: "最高评分", value: "/video?o=tr" }
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
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
  'Cache-Control': 'no-cache'
};

WidgetMetadata = {
  id: 'lydevils.pornhub',
  title: 'Pornhub',
  description: 'Pornhub 真实视频数据源。',
  author: 'LYDevils',
  site: 'https://www.pornhub.com',
  version: '1.0.26',
  requiredVersion: '0.0.1',
  detailCacheDuration:300,
  modules: [
    {
      id: 'region-videos',
      title: '地区语言',
      description: '按地区、语言或字幕筛选影片。',
      functionName: 'loadCategoryVideos',
      type: 'list',
      params: [
        {
          name: 'categoryPreset',
          title: '选择地区/语言',
          type: 'enumeration',
          value: REGION_OPTIONS[0] ? REGION_OPTIONS[0].value : '',
          enumOptions: REGION_OPTIONS
        },
        { name: 'page', title: '页码', type: 'page', startPage: 1 }
      ]
    },
    {
      id: 'person-videos',
      title: '人物分类',
      description: '按人物身份或出演类型筛选影片。',
      functionName: 'loadCategoryVideos',
      type: 'list',
      params: [
        {
          name: 'categoryPreset',
          title: '选择人物分类',
          type: 'enumeration',
          value: PERSON_OPTIONS[0] ? PERSON_OPTIONS[0].value : '',
          enumOptions: PERSON_OPTIONS
        },
        { name: 'page', title: '页码', type: 'page', startPage: 1 }
      ]
    },
    {
      id: 'feature-videos',
      title: '特点分类',
      description: '按题材、风格或内容特点筛选影片。',
      functionName: 'loadCategoryVideos',
      type: 'list',
      params: [
        {
          name: 'categoryPreset',
          title: '选择特点',
          type: 'enumeration',
          value: FEATURE_OPTIONS[0] ? FEATURE_OPTIONS[0].value : '',
          enumOptions: FEATURE_OPTIONS
        },
        { name: 'page', title: '页码', type: 'page', startPage: 1 }
      ]
    },
    {
      id: 'sort-videos',
      title: '排序筛选',
      description: '按最新、热门、评分等排序筛选影片。',
      functionName: 'loadCategoryVideos',
      type: 'list',
      params: [
        {
          name: 'categoryPreset',
          title: '选择排序',
          type: 'enumeration',
          value: SORT_OPTIONS[0] ? SORT_OPTIONS[0].value : '',
          enumOptions: SORT_OPTIONS
        },
        { name: 'page', title: '页码', type: 'page', startPage: 1 }
      ]
    },
    {
      id: 'favorite-videos',
      title: '我的最爱',
      description: '默认读取 lydevils 的公开收藏，也可输入其他用户名、主页链接或收藏页链接。',
      functionName: 'loadFavoriteVideos',
      type: 'list',
      params: [
        { name: 'username', title: '用户名或收藏页链接', type: 'input', value: 'lydevils' },
        { name: 'page', title: '页码', type: 'page', startPage: 1 }
      ]
    },
    {
      id: 'creator-videos',
      title: '作者视频',
      description: '输入模特、演员或用户主页链接，查看该作者的公开视频。订阅页本身需要登录，无法公开读取真实订阅列表。',
      functionName: 'loadCreatorVideos',
      type: 'list',
      params: [
        { name: 'profile', title: '作者主页链接', type: 'input', value: 'https://cn.pornhub.com/model/nana_taipei' },
        { name: 'page', title: '页码', type: 'page', startPage: 1 }
      ]
    },
    {
      id: 'loadResource',
      title: '加载资源',
      type: 'stream',
      functionName: 'loadResource'
    }
  ]
};

searchVideos = async (params = {}) => {
  const keyword = String(params.keyword || '').trim();
  const page = Math.max(1, Number(params.page || 1));
  const url = keyword ? buildSearchUrl(keyword, page) : normalizeUrl(SITE.latestPath || '/', SITE.baseUrl);
  return loadVideoList(url);
};


loadFavoriteVideos = async (params = {}) => {
  const username = String(params.username || 'lydevils').trim();
  const page = Math.max(1, Number(params.page || 1));
  if (!username) {
    return [createMessage('缺少用户名', '请输入 Pornhub 用户名。')];
  }

  try {
    const favoritePage = await loadFavoritePage(username, page, true);
    const results = parseFavoriteVideoList(favoritePage.html, favoritePage.url, 'Pornhub 收藏');
    if (results.length === 0) {
      return [createMessage('未找到公开收藏', '已打开该用户收藏页，但没有解析到公开收藏视频。可能收藏为空、收藏私密，或当前网络返回了受限页面。')];
    }
    return results.map((item) => item.type === 'link'
      ? Object.assign({}, item, {
          description: ['收藏用户：' + username, item.description].filter(Boolean).join(' | ')
        })
      : item);
  } catch (error) {
    return [createMessage('收藏读取失败', String(error.message || error))];
  }
};

loadCreatorVideos = async (params = {}) => {
  const profile = String(params.profile || '').trim();
  const page = Math.max(1, Number(params.page || 1));
  if (!profile) {
    return [createMessage('缺少作者链接', '请输入 Pornhub 作者主页链接，例如 /model/xxx、/pornstar/xxx 或 /users/xxx。')];
  }

  const url = buildProfileVideosUrl(profile, page);
  if (!url) {
    return [createMessage('链接无效', '请输入作者主页链接，格式例如 https://cn.pornhub.com/model/xxx。')];
  }

  const results = await loadVideoList(url);
  return results.map((item) => item.type === 'link'
    ? Object.assign({}, item, {
        description: ['作者页', item.description].filter(Boolean).join(' | ')
      })
    : item);
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

loadResource = async (params = {}) => {
  const candidates = [params.id, params.link, params.videoUrl]
    .map((value) => String(value || '').trim())
    .filter(Boolean);
  const target = candidates.find(isLikelyVideoUrl) || candidates.find(isPornhubUrl) || '';
  if (!target) {
    return [];
  }

  const url = normalizeUrl(target, SITE.baseUrl);
  const html = await fetchText(url);
  const title = extractDetailTitle(html);
  const description = extractDetailDescription(html);
  const sourceItems = buildStreamSourceItems(extractVideoSources(html, url), title, description);
  if (sourceItems.length === 0) {
    return [];
  }

  return sourceItems;
};

async function loadDetail(link) {
  const rawLink = String(link || '');
  if (rawLink.startsWith('category|')) {
    return loadVideoList(rawLink.slice('category|'.length));
  }
  const url = normalizeUrl(rawLink, SITE.baseUrl);
  const html = await fetchText(url);
  const $ = Widget.html.load(html);
  const title = extractDetailTitle(html) || cleanText(
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
  const description = extractDetailDescription(html) || cleanText(
    $('meta[property="og:description"]').attr('content') ||
    $('meta[name="description"]').attr('content') ||
    ''
  );
  const videoUrl = extractPrimaryVideoUrl(html, url);
  if (!videoUrl) {
    return createMessage('未解析到播放地址', '详情页已加载，但未找到可直接播放的 m3u8/mp4 地址。可能需要登录、地区可用性受限，或该视频只允许网页播放器播放。链接：' + url);
  }

  return {
    id: url,
    type: 'detail',
    title,
    description,
    coverUrl,
    posterPath: coverUrl,
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
    const selectors = [
      '#moreData li',
      '.videoUList li',
      '.videos.row-3-thumbs li',
      '.videos li.pcVideoListItem',
      'li.pcVideoListItem',
      'li.videoblock'
    ];

    selectors.forEach((selector) => {
      $(selector).each((_, element) => {
        if (isBlockedVideoContainer($, element)) return;

        const container = $(element);
        const anchor = container.find('a[href*="view_video.php"]').first();
        if (!anchor.length) return;

        const videoUrl = normalizeUrl(anchor.attr('href'), SITE.baseUrl);
        if (!isLikelyVideoUrl(videoUrl) || seen.has(videoUrl)) return;

        const image = container.find('img').first();
        const title = pickTitle($, anchor[0], image);
        if (!title || title.length < 2) return;

        seen.add(videoUrl);
        const coverUrl = normalizeUrl(readFirstAttr(image, ['data-src', 'data-original', 'data-lazy-src', 'data-thumb_url', 'data-mediumthumb', 'src']), SITE.baseUrl);
        const description = findDuration($, element) || SITE.title;
        results.push({
          id: videoUrl,
          type: 'url',
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
    });

    return results.length > 0 ? results.slice(0, 40) : [createMessage('未找到视频', '站点未返回可解析的视频条目，请换关键词或页码。')];
  } catch (error) {
    return [createMessage('请求失败', String(error.message || error))];
  }
}

async function loadFavoritePage(username, page, requireParsedVideos) {
  const candidates = buildFavoriteCandidates(username);
  if (candidates.length === 0) {
    throw new Error('请输入 Pornhub 用户名、用户主页链接或收藏页链接。');
  }

  let lastError = null;
  let privateError = null;
  let emptyPageError = null;
  const attemptedUrls = [];
  for (const candidate of candidates) {
    const url = appendPageParam(normalizeUrl(candidate, SITE.baseUrl), page);
    attemptedUrls.push(url);
    try {
      const html = await fetchText(url);
      const check = inspectFavoritePage(html, url);
      if (check.private) {
        privateError = new Error('该用户收藏列表是私有的，无法公开读取。');
        continue;
      }
      if (check.valid) {
        if (!requireParsedVideos) return { url, html };
        const preview = parseFavoriteVideoList(html, url, 'Pornhub 收藏');
        if (preview.length > 0) return { url, html, preview };
        emptyPageError = new Error('收藏页可访问但没有解析到公开收藏视频：' + url);
        continue;
      }
      lastError = new Error(check.reason || '未找到该用户的公开收藏页面。');
    } catch (error) {
      lastError = new Error('请求收藏页失败：' + url + '；' + String(error.message || error));
    }
  }

  const fallbackError = emptyPageError || lastError || new Error('未找到该用户的公开收藏页面。');
  fallbackError.message = fallbackError.message + ' 已尝试：' + attemptedUrls.join('，');
  throw privateError || fallbackError;
}

function buildFavoriteCandidates(username) {
  const raw = String(username || '').trim();
  const profile = parseProfileInput(raw);
  const candidates = [];
  const seen = new Set();

  function add(path, origin) {
    const normalized = String(path || '').split(/[?#]/)[0].replace(/\/+$/, '');
    if (!normalized) return;
    const favoritePath = /\/videos\/favorites$/i.test(normalized)
      ? normalized
      : normalized + '/videos/favorites';
    const candidate = origin && favoritePath.startsWith('/') ? origin.replace(/\/$/, '') + favoritePath : favoritePath;
    if (seen.has(candidate)) return;
    seen.add(candidate);
    candidates.push(candidate);
  }

  if (profile.type && profile.slug) {
    if (profile.origin && /^https:\/\/cn\.pornhub\.com$/i.test(profile.origin)) {
      add('/' + profile.type + '/' + profile.slug, profile.origin);
      return candidates;
    }
    if (profile.type === 'users') {
      add('/users/' + profile.slug, 'https://cn.pornhub.com');
    }
    add('/' + profile.type + '/' + profile.slug, profile.origin);
    return candidates;
  }

  if (profile.slug) {
    add('/users/' + profile.slug, 'https://cn.pornhub.com');
    ['users', 'model', 'pornstar'].forEach((type) => add('/' + type + '/' + profile.slug));
  }

  return candidates;
}

function parseProfileInput(value) {
  const raw = String(value || '').trim();
  if (!raw) return {};

  const cleaned = raw.replace(/^@+/, '').replace(/\/+$/, '');
  const path = extractProfilePath(cleaned);
  if (path) {
    const match = path.match(/^\/(users|model|pornstar)\/([^/?#]+)/i);
    if (match) {
      return {
        type: match[1].toLowerCase(),
        slug: normalizeProfileSlug(match[2]),
        origin: extractSiteOrigin(cleaned)
      };
    }
  }

  return { slug: normalizeProfileSlug(cleaned.split(/[/?#]/)[0]) };
}

function buildProfileVideosUrl(value, page) {
  const raw = String(value || '').trim();
  if (!raw) return '';

  const origin = extractSiteOrigin(raw) || 'https://cn.pornhub.com';
  const path = extractProfilePath(raw);
  if (path) {
    const cleanPath = String(path).split(/[?#]/)[0].replace(/\/+$/, '');
    if (/^\/(?:users|model|pornstar)\/[^/?#]+\/videos$/i.test(cleanPath)) {
      return appendPageParam(origin + cleanPath, page);
    }

    const directMatch = cleanPath.match(/^\/(users|model|pornstar)\/([^/?#]+)/i);
    if (directMatch) {
      const type = directMatch[1].toLowerCase();
      const slug = normalizeProfileSlug(directMatch[2]);
      return appendPageParam(origin + '/' + type + '/' + slug + '/videos', page);
    }
  }

  const shortMatch = raw.replace(/^\/+/, '').match(/^(users|model|pornstar)\/([^/?#]+)/i);
  if (shortMatch) {
    return appendPageParam(origin + '/' + shortMatch[1].toLowerCase() + '/' + normalizeProfileSlug(shortMatch[2]) + '/videos', page);
  }

  return '';
}

function extractProfilePath(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  if (/^https?:\/\//i.test(raw)) {
    const parsed = parseHttpUrl(raw);
    if (!parsed || !isPornhubHost(parsed.hostname)) return '';
    return parsed.pathname || '';
  }
  return raw.startsWith('/') ? raw : '';
}

function extractSiteOrigin(value) {
  const raw = String(value || '').trim();
  if (!/^https?:\/\//i.test(raw)) return '';
  const parsed = parseHttpUrl(raw);
  return parsed && isPornhubHost(parsed.hostname) ? parsed.origin : '';
}

function getOrigin(value) {
  const raw = String(value || '').trim();
  if (!/^https?:\/\//i.test(raw)) return '';
  const parsed = parseHttpUrl(raw);
  return parsed && isPornhubHost(parsed.hostname) ? parsed.origin : '';
}

function parseHttpUrl(value) {
  const match = String(value || '').trim().match(/^(https?:)\/\/([^/?#]+)([^?#]*)?/i);
  if (!match) return null;
  const host = match[2].replace(/:\d+$/, '');
  return {
    origin: match[1].toLowerCase() + '//' + match[2],
    hostname: host,
    pathname: match[3] || '/'
  };
}

function isPornhubHost(hostname) {
  return /(^|\.)pornhub\.com$/i.test(String(hostname || '').replace(/:\d+$/, ''));
}

function normalizeProfileSlug(value) {
  const raw = String(value || '').trim().replace(/^@+/, '').replace(/\/+$/, '');
  if (!raw) return '';
  try {
    return encodeURIComponent(decodeURIComponent(raw));
  } catch (error) {
    return encodeURIComponent(raw);
  }
}

function inspectFavoritePage(html, url) {
  const raw = String(html || '');
  const text = cleanText(raw).toLowerCase();
  const titleText = extractPageTitleText(raw).toLowerCase();
  const canonicalUrl = extractCanonicalUrl(raw);
  const ogUrl = extractMetaUrl(raw, 'og:url');
  const routeUrls = [canonicalUrl, ogUrl].filter(Boolean);
  const routeInMetadata = routeUrls.some(isFavoriteRoute);
  const requestedFavoriteRoute = isFavoriteRoute(url);
  const favoriteHeading = hasFavoriteHeading(raw);
  const favoriteListMarker = hasFavoriteListMarker(raw);
  const pageUnavailable = /\b(?:404|page not found|profile not found|user not found|user does not exist|this profile does not exist|removed)\b/i.test(titleText)
    || /<(?:h1|h2)[^>]*>\s*(?:404|page not found|profile not found|user not found|user does not exist|this profile does not exist|removed)\s*<\/(?:h1|h2)>/i.test(raw)
    || /class=["'][^"']*(?:error|notFound|not-found)[^"']*["'][^>]*>\s*(?:404|page not found|profile not found|user not found)/i.test(raw);
  const loginBlocked = /\b(?:please log in|login required|you must be logged in|age verification|verify your age)\b/i.test(text);
  const privateBlocked = /(?:private|hidden)[^。.!?]{0,80}(?:favorite|favorites|收藏)|(?:favorite|favorites|收藏)[^。.!?]{0,80}(?:private|hidden)|this page is private/i.test(text);

  if (privateBlocked) return { valid: false, private: true };
  if (loginBlocked) return { valid: false, reason: '当前网络返回登录或年龄验证页面，无法确认公开收藏。' };
  if (pageUnavailable) return { valid: false, reason: '该用户收藏页不可访问或不存在。' };
  if (!routeInMetadata && !(requestedFavoriteRoute && (favoriteHeading || favoriteListMarker))) {
    return { valid: false, reason: '当前返回内容不是收藏页。' };
  }

  return { valid: true, private: false };
}

function isFavoriteRoute(value) {
  return /\/(?:users|model|pornstar)\/[^"'<>\s/?#]+\/videos\/favorites(?:[/?#]|$)/i.test(String(value || ''));
}

function extractCanonicalUrl(html) {
  const raw = String(html || '');
  const direct = raw.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  if (direct && direct[1]) return direct[1];
  const reversed = raw.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  return reversed && reversed[1] ? reversed[1] : '';
}

function extractPageTitleText(html) {
  const raw = String(html || '');
  const match = raw.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match && match[1] ? cleanText(match[1]) : '';
}

function extractMetaUrl(html, propertyName) {
  const raw = String(html || '');
  const property = String(propertyName || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const direct = new RegExp('<meta[^>]+property=["\\\']' + property + '["\\\'][^>]+content=["\\\']([^"\\\']+)["\\\']', 'i').exec(raw);
  if (direct && direct[1]) return direct[1];
  const reversed = new RegExp('<meta[^>]+content=["\\\']([^"\\\']+)["\\\'][^>]+property=["\\\']' + property + '["\\\']', 'i').exec(raw);
  return reversed && reversed[1] ? reversed[1] : '';
}

function hasFavoriteHeading(html) {
  const headings = [];
  String(html || '').replace(/<(?:h1|h2|h3|title)[^>]*>([\s\S]*?)<\/(?:h1|h2|h3|title)>/gi, (_, value) => {
    headings.push(cleanText(value).toLowerCase());
    return '';
  });
  return headings.some((heading) => /\b(?:favorite videos|favourites|favorites|favorited videos)\b/i.test(heading) || /收藏/.test(heading));
}

function hasFavoriteListMarker(html) {
  const raw = String(html || '');
  return /(?:id|class|data-[^=]+)=["'][^"']*(?:favorite|favourite)[^"']*(?:video|list)|(?:id|class|data-[^=]+)=["'][^"']*(?:video|list)[^"']*(?:favorite|favourite)/i.test(raw);
}

function parseFavoriteVideoList(html, pageUrl, listLabel) {
  const $ = Widget.html.load(html);
  const results = [];
  const seen = new Set();
  const baseUrl = getOrigin(pageUrl) || SITE.baseUrl;
  const strictItems = findStrictFavoriteVideoItems($);
  if (strictItems.length > 0) {
    strictItems.forEach((element) => {
      addFavoriteVideoItem($, element, seen, results, baseUrl, listLabel || 'Pornhub 收藏');
    });
  }

  const scopes = results.length > 0 ? [] : findFavoriteVideoScopes($, baseUrl);

  scopes.forEach((scope) => {
    findFavoriteVideoItems($, scope, baseUrl).forEach((element) => {
      addFavoriteVideoItem($, element, seen, results, baseUrl, listLabel || 'Pornhub 收藏');
    });
  });

  if (results.length === 0) {
    parseFavoriteAnchorsFromHtml(html, baseUrl, listLabel || 'Pornhub 收藏', seen, results);
  }

  return results.map((item) => Object.assign({}, item, { source: SITE.title })).slice(0, 40);
}

function findStrictFavoriteVideoItems($) {
  const items = [];
  const seen = new Set();
  const selectors = [
    '.profileVids .videoUList li[id^="vfavouriteVideo"]',
    '.profileVids .videoUList li[data-video-vkey]',
    '.profileVids ul#moreData li[id^="vfavouriteVideo"]',
    '.profileVids ul#moreData li[data-video-vkey]',
    'li[id^="vfavouriteVideo"]'
  ];

  selectors.forEach((selector) => {
    $(selector).each((_, element) => {
      const key = $(element).attr('data-video-vkey') || $(element).attr('data-video-id') || $(element).attr('id') || '';
      const href = $(element).find('a[href*="view_video.php"]').first().attr('href') || '';
      const signature = key || href;
      if (!signature || seen.has(signature)) return;
      seen.add(signature);
      items.push(element);
    });
  });

  return items;
}

function findFavoriteVideoScopes($, baseUrl) {
  const preferredSelectors = [
    '#favoriteVideos',
    '#favoritesVideos',
    '#profileFavoriteVideos',
    '#userVideos',
    '#videoListContainer',
    '.profileVideos',
    '.userVideos',
    '.videoUList',
    'ul[class*="video"]',
    '[id*="favorite"][id*="video"]',
    '[id*="favorites"][id*="video"]',
    '[class*="favorite"][class*="video"]',
    '[class*="favorites"][class*="video"]',
    '[data-section*="favorite"]',
    '[data-name*="favorite"]'
  ];
  const candidates = [];
  const seen = new Set();

  preferredSelectors.forEach((selector) => {
    $(selector).each((_, element) => {
      addScopeCandidate($, element, candidates, seen, baseUrl);
    });
  });

  $('a[href*="view_video.php"]').each((_, anchor) => {
    const card = $(anchor).closest('li, .pcVideoListItem, .videoBox, .video-item, .thumb-block, .wrap, article')[0];
    const parent = card ? $(card).parent()[0] : $(anchor).parent()[0];
    addScopeCandidate($, parent, candidates, seen, baseUrl);
  });

  candidates.sort((left, right) => {
    if (right.score !== left.score) return right.score - left.score;
    if (right.videoCount !== left.videoCount) return right.videoCount - left.videoCount;
    return right.depth - left.depth;
  });

  const best = candidates[0];
  if (best && best.score >= 20) return [best.element];

  const fallback = [];
  ['main', '#content', '#profileContent', '.profileContent', 'body'].forEach((selector) => {
    $(selector).each((_, element) => {
      const scope = scoreFavoriteScope($, element, baseUrl);
      if (!scope.blocked && scope.videoCount > 0) fallback.push(Object.assign({ element }, scope));
    });
  });
  fallback.sort((left, right) => right.videoCount - left.videoCount);
  return fallback[0] ? [fallback[0].element] : [];
}

function addScopeCandidate($, element, candidates, seen, baseUrl) {
  if (!element) return;
  const scope = scoreFavoriteScope($, element, baseUrl);
  if (scope.blocked || scope.videoCount === 0) return;
  const key = scope.signature;
  if (seen.has(key)) return;
  seen.add(key);
  candidates.push(Object.assign({ element }, scope));
}

function scoreFavoriteScope($, element, baseUrl) {
  const scope = $(element);
  const identity = [
    scope.attr('id'),
    scope.attr('class'),
    scope.attr('data-section'),
    scope.attr('data-name')
  ].filter(Boolean).join(' ').toLowerCase();
  const ownText = cleanText(scope.children('h1,h2,h3,.title,.heading').first().text()).toLowerCase();
  const nearbyText = cleanText(scope.prevAll('h1,h2,h3,.title,.heading').first().text()).toLowerCase();
  const text = [ownText, nearbyText].filter(Boolean).join(' ');
  const videoCount = countVideoLinks($, element, baseUrl);
  const blocked = /(recommend|related|suggest|trend|premium|advert|footer|header|sidebar|comments?)/i.test(identity);
  const blockedDescendantCount = countBlockedDescendantVideoLinks($, element, baseUrl);
  const broad = /(?:^|\s)(?:profilecontent|content|container|main)(?:\s|$)/i.test(identity) || ['main', 'body', 'html'].includes(String(element.name || '').toLowerCase());
  let score = Math.min(videoCount, 60);
  if (/(favorite|favourite|收藏)/i.test(identity)) score += 80;
  if (/(favorite|favourite|收藏)/i.test(text)) score += 60;
  if (/(user|profile|videos?|listing|list|ul|videoulist)/i.test(identity)) score += 25;
  if (/video(?:ulist|list|container)|(?:ulist|list)video/i.test(identity.replace(/[\s_-]+/g, ''))) score += 25;
  if (broad) score -= 45;
  if (blockedDescendantCount > 0) score -= Math.min(80, blockedDescendantCount * 8);
  if (blocked) score -= 120;
  return {
    blocked,
    score,
    videoCount,
    depth: scope.parents().length,
    signature: identity + '|' + videoCount + '|' + text
  };
}

function countVideoLinks($, element, baseUrl) {
  const links = new Set();
  $(element).find('a[href*="view_video.php"]').each((_, anchor) => {
    const url = normalizeUrl($(anchor).attr('href'), baseUrl || SITE.baseUrl);
    if (isLikelyVideoUrl(url)) links.add(url);
  });
  return links.size;
}

function countBlockedDescendantVideoLinks($, element, baseUrl) {
  let count = 0;
  $(element).find('[id*="recommend"],[class*="recommend"],[id*="related"],[class*="related"],[id*="suggest"],[class*="suggest"],[id*="sidebar"],[class*="sidebar"],[id*="premium"],[class*="premium"]').each((_, child) => {
    count += countVideoLinks($, child, baseUrl);
  });
  return count;
}

function findFavoriteVideoItems($, scope, baseUrl) {
  const items = [];
  const seen = new Set();
  $(scope).find('li[id^="vfavouriteVideo"], li[data-video-vkey]').each((_, element) => {
    if (isInsideBlockedArea($, element, scope)) return;
    const href = $(element).find('a[href*="view_video.php"]').first().attr('href');
    const url = normalizeUrl(href, baseUrl || SITE.baseUrl);
    if (!isLikelyVideoUrl(url) || seen.has(url)) return;
    seen.add(url);
    items.push(element);
  });
  $(scope).find('a[href*="view_video.php"]').each((_, anchor) => {
    if (isInsideBlockedArea($, anchor, scope)) return;
    const url = normalizeUrl($(anchor).attr('href'), baseUrl || SITE.baseUrl);
    if (!isLikelyVideoUrl(url) || seen.has(url)) return;
    seen.add(url);
    const item = $(anchor).closest('li, .pcVideoListItem, .videoBox, .video-item, .thumb-block, .wrap, article')[0] || anchor;
    items.push(item);
  });
  return items;
}

function isInsideBlockedArea($, element, scope) {
  const blockedSelector = '[id*="recommend"],[class*="recommend"],[id*="related"],[class*="related"],[id*="suggest"],[class*="suggest"],[id*="sidebar"],[class*="sidebar"],[id*="premium"],[class*="premium"],[id*="advert"],[class*="advert"]';
  const blockedParent = $(element).parents(blockedSelector).first()[0];
  if (!blockedParent) return false;
  return blockedParent === scope || $(scope).find(blockedParent).length > 0;
}

function addFavoriteVideoItem($, element, seen, results, baseUrl, listLabel) {
  const container = $(element);
  const anchor = container.find('a[href*="view_video.php"]').first();
  const href = anchor.attr('href');
  const videoUrl = normalizeUrl(href, baseUrl || SITE.baseUrl);
  if (!isLikelyVideoUrl(videoUrl) || seen.has(videoUrl)) return;

  const image = container.find('img').first();
  const title = normalizeTitleCandidate(
    container.attr('data-title') ||
    container.attr('data-video-title') ||
    container.attr('data-name') ||
    anchor.attr('title') ||
    anchor.attr('aria-label') ||
    anchor.attr('data-title') ||
    image.attr('alt') ||
    image.attr('title') ||
    container.find('.title,.video-title,.thumb-title,.video-title-text,.tm_video_title').first().text() ||
    anchor.text() ||
    container.text()
  );
  if (!title || title.length < 2) return;

  const coverUrl = normalizeUrl(readFirstAttr(image, ['data-src', 'data-original', 'data-lazy-src', 'data-thumb_url', 'data-mediumthumb', 'src']), baseUrl || SITE.baseUrl);
  const description = findDuration($, element) || listLabel || 'Pornhub 收藏';
  seen.add(videoUrl);
  results.push({
    id: videoUrl,
    type: 'url',
    title,
    description,
    coverUrl,
    posterPath: coverUrl,
    link: videoUrl,
    mediaType: 'movie',
    playerType: 'system',
    source: SITE.title
  });
}

function parseFavoriteAnchorsFromHtml(html, baseUrl, listLabel, seen, results) {
  const raw = String(html || '');
  const anchorPattern = /<a\b[^>]*href=["']([^"']*view_video\.php[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = anchorPattern.exec(raw)) && results.length < 40) {
    const context = raw.slice(Math.max(0, match.index - 500), Math.min(raw.length, match.index + match[0].length + 500));
    if (/(recommend|related|suggest|premium|advert|sidebar)/i.test(context)) continue;

    const videoUrl = normalizeUrl(match[1], baseUrl || SITE.baseUrl);
    if (!isLikelyVideoUrl(videoUrl) || seen.has(videoUrl)) continue;

    const title = normalizeTitleCandidate(
      readHtmlAttr(match[0], 'title') ||
      readHtmlAttr(match[0], 'aria-label') ||
      readHtmlAttr(match[0], 'data-title') ||
      readHtmlAttr(match[2], 'alt') ||
      stripHtml(match[2])
    );
    if (!title || title.length < 2) continue;

    const coverUrl = normalizeUrl(
      readHtmlAttr(match[2], 'data-src') ||
      readHtmlAttr(match[2], 'data-original') ||
      readHtmlAttr(match[2], 'data-lazy-src') ||
      readHtmlAttr(match[2], 'data-thumb_url') ||
      readHtmlAttr(match[2], 'data-mediumthumb') ||
      readHtmlAttr(match[2], 'src'),
      baseUrl || SITE.baseUrl
    );
    const durationMatch = context.match(/\b\d{1,2}:\d{2}(?::\d{2})?\b/);
    seen.add(videoUrl);
    results.push({
      id: videoUrl,
      type: 'url',
      title,
      description: durationMatch ? '时长：' + durationMatch[0] : listLabel || 'Pornhub 收藏',
      coverUrl,
      posterPath: coverUrl,
      link: videoUrl,
      mediaType: 'movie',
      playerType: 'system',
      source: SITE.title
    });
  }
}

function readHtmlAttr(html, name) {
  const escapedName = String(name || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp('\\b' + escapedName + '\\s*=\\s*(["\\\'])(.*?)\\1', 'i');
  const match = pattern.exec(String(html || ''));
  return match && match[2] ? match[2].replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"') : '';
}

function stripHtml(value) {
  return cleanText(String(value || '').replace(/<[^>]+>/g, ' '));
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

function extractDetailTitle(html) {
  const raw = String(html || '');
  const titleMatch = raw.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)
    || raw.match(/<meta[^>]+name=["']twitter:title["'][^>]+content=["']([^"']+)["']/i)
    || raw.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return titleMatch && titleMatch[1] ? cleanText(titleMatch[1].replace(/\s*-\s*Pornhub(?:\.com)?$/i, '')) : '';
}

function extractDetailDescription(html) {
  const raw = String(html || '');
  const descMatch = raw.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i)
    || raw.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
  return descMatch && descMatch[1] ? cleanText(descMatch[1]) : '';
}

function extractVideoUrl(html, pageUrl) {
  return extractPrimaryVideoUrl(html, pageUrl);
}

function extractPrimaryVideoUrl(html, pageUrl) {
  const sources = extractVideoSources(html, pageUrl);
  return sources[0] || '';
}

function buildStreamSourceItems(urls, title, description) {
  return (urls || []).slice(0, 4).map((url, index) => ({
    name: buildPlayableSourceTitle(url, title, index),
    description: description || '',
    url
  }));
}

function extractVideoSources(html, pageUrl) {
  const raw = unescapeUrl(String(html || ''));
  const buckets = {
    direct: [],
    mp4: [],
    hls: []
  };
  const seen = new Set();

  function add(url) {
    const normalized = normalizeUrl(url, pageUrl);
    if (!isPlayableUrl(normalized) || seen.has(normalized)) return;
    seen.add(normalized);
    if (isGetMediaUrl(normalized)) {
      buckets.direct.push(normalized);
      return;
    }
    if (/\.mp4(?:[?#].*)?$/i.test(normalized)) {
      buckets.mp4.push(normalized);
      return;
    }
    if (/\.m3u8(?:[?#].*)?$/i.test(normalized)) {
      buckets.hls.push(normalized);
    }
  }

  const getMediaPattern = /https?:\/\/[^"'\\\s]+\/video\/get_media\?[^"'\\\s]+/gi;
  let match;
  while ((match = getMediaPattern.exec(raw))) {
    add(match[0]);
  }

  extractMediaDefinitionUrls(raw).forEach(add);

  const patterns = [
    /html5player\.setVideoHLS\(['"]([^'"]+)['"]\)/ig,
    /html5player\.setVideoUrlHigh\(['"]([^'"]+)['"]\)/ig,
    /html5player\.setVideoUrlLow\(['"]([^'"]+)['"]\)/ig,
    /<source[^>]+src=["']([^"']+)["']/ig,
    /["'](?:contentUrl|videoUrl|file|hls|url)["']\s*[:=]\s*["']([^"']+)["']/ig,
    /(?:contentUrl|videoUrl|file|hls|url)\s*[:=]\s*["']([^"']+)["']/ig
  ];

  patterns.forEach((pattern) => {
    let localMatch;
    while ((localMatch = pattern.exec(raw))) {
      if (localMatch[1]) add(localMatch[1]);
    }
  });

  return sortHlsSources(buckets.hls)
    .concat(buckets.mp4)
    .concat(buckets.direct);
}

function extractMediaDefinitionUrls(rawHtml) {
  const raw = String(rawHtml || '');
  const urls = [];
  const pattern = /["'](?:videoUrl|url)["']\s*:\s*["']([^"']+)["']/gi;
  let match;
  while ((match = pattern.exec(raw))) {
    urls.push(match[1]);
  }
  return urls;
}

function sortHlsSources(urls) {
  return (urls || []).slice().sort((left, right) => getPlayablePriority(left) - getPlayablePriority(right));
}

function getPlayablePriority(url) {
  const value = String(url || '');
  if (/720P|720/i.test(value)) return 0;
  if (/480P|480/i.test(value)) return 10;
  if (/1080P|1080/i.test(value)) return 20;
  if (/240P|240/i.test(value)) return 30;
  if (/\.m3u8(?:[?#].*)?$/i.test(value)) return 40;
  if (/\.mp4(?:[?#].*)?$/i.test(value)) return 60;
  if (isGetMediaUrl(value)) return 80;
  return 100;
}

function buildPlayableSourceTitle(url, baseTitle, index) {
  const title = String(baseTitle || SITE.title || '视频');
  const qualityMatch = String(url || '').match(/(1080|720|480|240)P?/i);
  if (qualityMatch && qualityMatch[1]) return title + ' - ' + qualityMatch[1] + 'P';
  if (/\.m3u8(?:[?#].*)?$/i.test(String(url || ''))) return title + ' - HLS';
  if (/\.mp4(?:[?#].*)?$/i.test(String(url || ''))) return title + ' - MP4';
  if (isGetMediaUrl(url)) return title + ' - 直连';
  return title + ' - 源' + (index + 1);
}

function isGetMediaUrl(value) {
  return /\/video\/get_media\b/i.test(String(value || ''));
}

function isPlayableUrl(value) {
  return /\/video\/get_media\b/i.test(String(value || ''))
    || /\.(?:m3u8|mp4)(?:\/[^?#]*)?(?:[?#].*)?$/i.test(String(value || ''));
}

function isLikelyVideoUrl(url) {
  const lower = String(url || '').toLowerCase();
  if (!isPornhubUrl(url)) return false;
  if (/[?&]pkey=/i.test(lower)) return false;
  if ((SITE.videoPathKeywords || []).some((keyword) => lower.includes(String(keyword).toLowerCase()))) return true;
  return Boolean(SITE.numericVideoPaths && /^https?:\/\/[^/]+\/\d+(?:[/?#]|$)/i.test(lower));
}

function isBlockedVideoContainer($, element) {
  return $(element).closest('#dropdownHeaderSubMenu, .headerSubMenu, header, nav, .relatedVideosWrapper, .recommendedVideos, .sidebar, .playlistThumb, .playlist-wrapper, .playlistSection').length > 0;
}

function isLikelyCategoryUrl(url) {
  const lower = String(url || '').toLowerCase();
  if (!isPornhubUrl(url)) return false;
  if (isLikelyVideoUrl(url)) return false;
  return ['/category', '/categories', '/channels', '/channel', '/tags', '/tag', '/pornstars', '/models', '/searches', '/latest', '/new', '/browse'].some((part) => lower.includes(part));
}

function isPornhubUrl(value) {
  const raw = String(value || '').trim();
  if (!/^https?:\/\//i.test(raw)) return false;
  const parsed = parseHttpUrl(raw);
  return Boolean(parsed && isPornhubHost(parsed.hostname));
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
  return String(value || '').replace(/\\\//g, '/').replace(/\\u0026/g, '&').replace(/\\"/g, '"');
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
