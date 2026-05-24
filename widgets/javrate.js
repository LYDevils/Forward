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

const REGION_OPTIONS = [
  { title: "国产AV", value: "/china" },
  { title: "日本AV视频", value: "/censored" }
];

const PERSON_OPTIONS = [
  { title: "AV女优", value: "/Actress" }
];

const FEATURE_OPTIONS = [
  { title: "无码AV视频", value: "/uncensored" }
];

const SORT_OPTIONS = [
  { title: "最新更新", value: "/" }
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
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
};

WidgetMetadata = {
  id: 'lydevils.javrate',
  title: 'JAVRate',
  description: 'JAVRate 真实视频数据源。',
  author: 'LYDevils',
  site: 'https://www.javrate.com',
  version: '1.0.15',
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

searchVideos = async (params = {}) => {
  const keyword = String(params.keyword || '').trim();
  const page = Math.max(1, Number(params.page || 1));
  const url = keyword ? buildSearchUrl(keyword, page) : buildCategoryUrl(SITE.latestPath, page);
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
      const typeMatch = metaText.match(/有码|无码|国产/);
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
  const mediaUrl = extractMediaDefinitionUrl(html, pageUrl);
  if (mediaUrl) return mediaUrl;

  const patterns = [
    /["'](?:contentUrl|embedUrl|videoUrl|file|hls|url)["']\s*[:=]\s*["']([^"']+)["']/i,
    /(?:contentUrl|embedUrl|videoUrl|file|hls|url)\s*[:=]\s*["']([^"']+)["']/i
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

function createMessage(title, description) {
  return {
    id: SITE.key + '.message.' + hashId(title + description),
    type: 'text',
    title,
    description
  };
}
