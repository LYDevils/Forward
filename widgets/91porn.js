const SITE = {
  "file": "91porn.js",
  "key": "91porn",
  "title": "91Porn",
  "baseUrl": "https://91porn.com",
  "searchPath": "/v.php?search_type=search_videos&search_query={keyword}&page={page}",
  "latestPath": "/v.php",
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

];

const PERSON_OPTIONS = [

];

const FEATURE_OPTIONS = [

];

const SORT_OPTIONS = [
  { title: "最新", value: "/v.php" },
  { title: "精选", value: "/v.php?category=rf" },
  { title: "热门", value: "/v.php?category=hot" },
  { title: "长片", value: "/v.php?category=long" },
  { title: "本月热门", value: "/v.php?category=md" }
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
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
};

WidgetMetadata = {
  id: 'lydevils.91porn',
  title: '91Porn',
  description: '91Porn 真实视频数据源。',
  author: 'LYDevils',
  site: 'https://91porn.com',
  version: '1.0.16',
  requiredVersion: '0.0.1',
  detailCacheDuration:300,
  modules: [
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

searchVideos = async (params = {}) => {
  const keyword = String(params.keyword || '').trim();
  const page = Math.max(1, Number(params.page || 1));
  const url = keyword ? buildSearchUrl(keyword, page) : normalizeUrl(SITE.latestPath || '/', SITE.baseUrl);
  return loadVideoList(url);
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
  const videoUrl = extractVideoUrl(html, url);
  if (!videoUrl) {
    return createMessage('未解析到播放地址', '详情页已加载，但未找到 mp4/m3u8 播放地址。可能需要登录、WebView 或当前网络受限。链接：' + url);
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
        posterPath: coverUrl,
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

function extractVideoUrl(html, pageUrl) {
  const mediaUrl = extractMediaDefinitionUrl(html, pageUrl);
  if (mediaUrl) return mediaUrl;

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

function extractMediaDefinitionUrl(html, pageUrl) {
  const mediaMatch = String(html || '').match(/mediaDefinitions?\s*[:=]\s*(\[[\s\S]*?\])/i)
    || String(html || '').match(/mediaDefinition\s*:\s*(\[[\s\S]*?\])/i);
  if (!mediaMatch || !mediaMatch[1]) return '';
  const raw = unescapeUrl(mediaMatch[1]);
  const directMatch = raw.match(/["'](?:videoUrl|url)["']\s*:\s*["']([^"']+\.(?:m3u8|mp4)(?:[^"']*)?)["']/i);
  return directMatch && directMatch[1] ? normalizeUrl(directMatch[1], pageUrl) : '';
}

function isPlayableUrl(value) {
  return /\.(?:m3u8|mp4)(?:[?#].*)?$/i.test(String(value || ''));
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

function buildDirectPlaybackItems(link, videoUrl, title, coverUrl) {
  return [{
    id: videoUrl,
    type: 'url',
    title: title || '??',
    link,
    videoUrl,
    posterPath: coverUrl,
    backdropPath: coverUrl,
    mediaType: 'movie',
    playerType: 'system'
  }];
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
