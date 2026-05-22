const SITE = {
  "file": "jable.js",
  "key": "jable",
  "title": "Jable",
  "baseUrl": "https://jable.tv",
  "searchPath": "/search/{keyword}/?mode=async&function=get_block&block_id=list_videos_common_videos_list&sort_by=post_date&from={page}",
  "latestPath": "/latest-updates/",
  "videoPathKeywords": [
    "/videos/"
  ]
};
const CATEGORY_OPTIONS = [
  { title: "📚 按主題", value: "/categories/" },
  { title: "👩 按女優", value: "/models/" },
  { title: "💡 新片優先", value: "/latest-updates/" },
  { title: "黑絲", value: "/tags/black-pantyhose/" },
  { title: "過膝襪", value: "/tags/knee-socks/" },
  { title: "運動裝", value: "/tags/sportswear/" },
  { title: "肉絲", value: "/tags/flesh-toned-pantyhose/" },
  { title: "絲襪", value: "/tags/pantyhose/" },
  { title: "眼鏡娘", value: "/tags/glasses/" },
  { title: "獸耳", value: "/tags/kemonomimi/" },
  { title: "漁網", value: "/tags/fishnets/" },
  { title: "水着", value: "/tags/swimsuit/" },
  { title: "校服", value: "/tags/school-uniform/" },
  { title: "旗袍", value: "/tags/cheongsam/" },
  { title: "婚紗", value: "/tags/wedding-dress/" },
  { title: "女僕", value: "/tags/maid/" },
  { title: "和服", value: "/tags/kimono/" },
  { title: "吊帶襪", value: "/tags/stockings/" },
  { title: "兔女郎", value: "/tags/bunny-girl/" },
  { title: "Cosplay", value: "/tags/Cosplay/" },
  { title: "黑肉", value: "/tags/suntan/" },
  { title: "長身", value: "/tags/tall/" },
  { title: "軟體", value: "/tags/flexible-body/" },
  { title: "貧乳", value: "/tags/small-tits/" },
  { title: "美腿", value: "/tags/beautiful-leg/" },
  { title: "美尻", value: "/tags/beautiful-butt/" },
  { title: "紋身", value: "/tags/tattoo/" },
  { title: "短髮", value: "/tags/short-hair/" },
  { title: "白虎", value: "/tags/hairless-pussy/" },
  { title: "熟女", value: "/tags/mature-woman/" },
  { title: "巨乳", value: "/tags/big-tits/" },
  { title: "少女", value: "/tags/girl/" },
  { title: "嬌小", value: "/tags/dainty/" },
  { title: "顏射", value: "/tags/facial/" },
  { title: "腳交", value: "/tags/footjob/" },
  { title: "肛交", value: "/tags/anal-sex/" },
  { title: "痙攣", value: "/tags/spasms/" },
  { title: "潮吹", value: "/tags/squirting/" },
  { title: "深喉", value: "/tags/deep-throat/" },
  { title: "接吻", value: "/tags/kiss/" },
  { title: "口爆", value: "/tags/cum-in-mouth/" },
  { title: "口交", value: "/tags/blowjob/" },
  { title: "乳交", value: "/tags/tit-wank/" },
  { title: "中出", value: "/tags/creampie/" },
  { title: "露出", value: "/tags/outdoor/" },
  { title: "集團進犯", value: "/tags/gang-intrusion/" },
  { title: "進犯", value: "/tags/intrusion/" },
  { title: "調教", value: "/tags/tune/" },
  { title: "綑綁", value: "/tags/bondage/" },
  { title: "瞬間插入", value: "/tags/quickie/" },
  { title: "痴漢", value: "/tags/chikan/" },
  { title: "痴女", value: "/tags/chizyo/" },
  { title: "男M", value: "/tags/masochism-guy/" },
  { title: "泥醉", value: "/tags/crapulence/" },
  { title: "泡姬", value: "/tags/soapland/" },
  { title: "母乳", value: "/tags/breast-milk/" },
  { title: "放尿", value: "/tags/piss/" },
  { title: "按摩", value: "/tags/massage/" },
  { title: "多P", value: "/tags/groupsex/" },
  { title: "刑具", value: "/tags/grip/" },
  { title: "凌辱", value: "/tags/insult/" },
  { title: "一日十回", value: "/tags/10-times-a-day/" },
  { title: "3P", value: "/tags/3p/" },
  { title: "黑人", value: "/tags/black/" },
  { title: "醜男", value: "/tags/ugly-man/" },
  { title: "誘惑", value: "/tags/temptation/" },
  { title: "親屬", value: "/tags/kinship/" },
  { title: "童貞", value: "/tags/virginity/" },
  { title: "時間停止", value: "/tags/time-stop/" },
  { title: "復仇", value: "/tags/avenge/" },
  { title: "年齡差", value: "/tags/age-difference/" },
  { title: "巨漢", value: "/tags/giant/" },
  { title: "媚藥", value: "/tags/love-potion/" },
  { title: "夫目前犯", value: "/tags/sex-beside-husband/" },
  { title: "出軌", value: "/tags/affair/" },
  { title: "催眠", value: "/tags/hypnosis/" },
  { title: "偷拍", value: "/tags/private-cam/" },
  { title: "下雨天", value: "/tags/rainy-day/" },
  { title: "NTR", value: "/tags/ntr/" },
  { title: "風俗娘", value: "/tags/club-hostess-and-sex-worker/" },
  { title: "醫生", value: "/tags/doctor/" },
  { title: "逃犯", value: "/tags/fugitive/" },
  { title: "護士", value: "/tags/nurse/" },
  { title: "老師", value: "/tags/teacher/" },
  { title: "空姐", value: "/tags/flight-attendant/" },
  { title: "球隊經理", value: "/tags/team-manager/" },
  { title: "未亡人", value: "/tags/widow/" },
  { title: "搜查官", value: "/tags/detective/" },
  { title: "情侶", value: "/tags/couple/" },
  { title: "家政婦", value: "/tags/housewife/" },
  { title: "家庭教師", value: "/tags/private-teacher/" },
  { title: "偶像", value: "/tags/idol/" },
  { title: "人妻", value: "/tags/wife/" },
  { title: "主播", value: "/tags/female-anchor/" },
  { title: "OL", value: "/tags/ol/" },
  { title: "魔鏡號", value: "/tags/magic-mirror/" },
  { title: "電車", value: "/tags/tram/" },
  { title: "處女", value: "/tags/first-night/" },
  { title: "監獄", value: "/tags/prison/" },
  { title: "溫泉", value: "/tags/hot-spring/" },
  { title: "洗浴場", value: "/tags/bathing-place/" },
  { title: "泳池", value: "/tags/swimming-pool/" },
  { title: "汽車", value: "/tags/car/" },
  { title: "廁所", value: "/tags/toilet/" },
  { title: "學校", value: "/tags/school/" },
  { title: "圖書館", value: "/tags/library/" },
  { title: "健身房", value: "/tags/gym-room/" },
  { title: "便利店", value: "/tags/store/" },
  { title: "錄像", value: "/tags/video-recording/" },
  { title: "處女作/引退作", value: "/tags/debut-retires/" },
  { title: "綜藝", value: "/tags/variety-show/" },
  { title: "節日主題", value: "/tags/festival/" },
  { title: "感謝祭", value: "/tags/thanksgiving/" },
  { title: "4小時以上", value: "/tags/more-than-4-hours/" },
  { title: "主奴調教 5159 部影片", value: "/categories/bdsm/" },
  { title: "直接開啪 6363 部影片", value: "/categories/sex-only/" },
  { title: "中文字幕 20288 部影片", value: "/categories/chinese-subtitle/" },
  { title: "凌辱快感 3402 部影片", value: "/categories/insult/" },
  { title: "制服誘惑 11469 部影片", value: "/categories/uniform/" },
  { title: "角色劇情 30725 部影片", value: "/categories/roleplay/" },
  { title: "盜攝偷拍 512 部影片", value: "/categories/private-cam/" },
  { title: "無碼解放 266 部影片", value: "/categories/uncensored/" },
  { title: "男友視角 3949 部影片", value: "/categories/pov/" },
  { title: "多P群交 5205 部影片", value: "/categories/groupsex/" },
  { title: "絲襪美腿 6821 部影片", value: "/categories/pantyhose/" },
  { title: "女同歡愉 413 部影片", value: "/categories/lesbian/" }
];

const DEFAULT_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
};

WidgetMetadata = {
  id: 'lydevils.jable',
  title: 'Jable',
  description: 'Jable 真实视频数据源。',
  author: 'LYDevils',
  site: 'https://jable.tv',
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
  { title: "📚 按主題", value: "/categories/" },
  { title: "👩 按女優", value: "/models/" },
  { title: "💡 新片優先", value: "/latest-updates/" },
  { title: "黑絲", value: "/tags/black-pantyhose/" },
  { title: "過膝襪", value: "/tags/knee-socks/" },
  { title: "運動裝", value: "/tags/sportswear/" },
  { title: "肉絲", value: "/tags/flesh-toned-pantyhose/" },
  { title: "絲襪", value: "/tags/pantyhose/" },
  { title: "眼鏡娘", value: "/tags/glasses/" },
  { title: "獸耳", value: "/tags/kemonomimi/" },
  { title: "漁網", value: "/tags/fishnets/" },
  { title: "水着", value: "/tags/swimsuit/" },
  { title: "校服", value: "/tags/school-uniform/" },
  { title: "旗袍", value: "/tags/cheongsam/" },
  { title: "婚紗", value: "/tags/wedding-dress/" },
  { title: "女僕", value: "/tags/maid/" },
  { title: "和服", value: "/tags/kimono/" },
  { title: "吊帶襪", value: "/tags/stockings/" },
  { title: "兔女郎", value: "/tags/bunny-girl/" },
  { title: "Cosplay", value: "/tags/Cosplay/" },
  { title: "黑肉", value: "/tags/suntan/" },
  { title: "長身", value: "/tags/tall/" },
  { title: "軟體", value: "/tags/flexible-body/" },
  { title: "貧乳", value: "/tags/small-tits/" },
  { title: "美腿", value: "/tags/beautiful-leg/" },
  { title: "美尻", value: "/tags/beautiful-butt/" },
  { title: "紋身", value: "/tags/tattoo/" },
  { title: "短髮", value: "/tags/short-hair/" },
  { title: "白虎", value: "/tags/hairless-pussy/" },
  { title: "熟女", value: "/tags/mature-woman/" },
  { title: "巨乳", value: "/tags/big-tits/" },
  { title: "少女", value: "/tags/girl/" },
  { title: "嬌小", value: "/tags/dainty/" },
  { title: "顏射", value: "/tags/facial/" },
  { title: "腳交", value: "/tags/footjob/" },
  { title: "肛交", value: "/tags/anal-sex/" },
  { title: "痙攣", value: "/tags/spasms/" },
  { title: "潮吹", value: "/tags/squirting/" },
  { title: "深喉", value: "/tags/deep-throat/" },
  { title: "接吻", value: "/tags/kiss/" },
  { title: "口爆", value: "/tags/cum-in-mouth/" },
  { title: "口交", value: "/tags/blowjob/" },
  { title: "乳交", value: "/tags/tit-wank/" },
  { title: "中出", value: "/tags/creampie/" },
  { title: "露出", value: "/tags/outdoor/" },
  { title: "集團進犯", value: "/tags/gang-intrusion/" },
  { title: "進犯", value: "/tags/intrusion/" },
  { title: "調教", value: "/tags/tune/" },
  { title: "綑綁", value: "/tags/bondage/" },
  { title: "瞬間插入", value: "/tags/quickie/" },
  { title: "痴漢", value: "/tags/chikan/" },
  { title: "痴女", value: "/tags/chizyo/" },
  { title: "男M", value: "/tags/masochism-guy/" },
  { title: "泥醉", value: "/tags/crapulence/" },
  { title: "泡姬", value: "/tags/soapland/" },
  { title: "母乳", value: "/tags/breast-milk/" },
  { title: "放尿", value: "/tags/piss/" },
  { title: "按摩", value: "/tags/massage/" },
  { title: "多P", value: "/tags/groupsex/" },
  { title: "刑具", value: "/tags/grip/" },
  { title: "凌辱", value: "/tags/insult/" },
  { title: "一日十回", value: "/tags/10-times-a-day/" },
  { title: "3P", value: "/tags/3p/" },
  { title: "黑人", value: "/tags/black/" },
  { title: "醜男", value: "/tags/ugly-man/" },
  { title: "誘惑", value: "/tags/temptation/" },
  { title: "親屬", value: "/tags/kinship/" },
  { title: "童貞", value: "/tags/virginity/" },
  { title: "時間停止", value: "/tags/time-stop/" },
  { title: "復仇", value: "/tags/avenge/" },
  { title: "年齡差", value: "/tags/age-difference/" },
  { title: "巨漢", value: "/tags/giant/" },
  { title: "媚藥", value: "/tags/love-potion/" },
  { title: "夫目前犯", value: "/tags/sex-beside-husband/" },
  { title: "出軌", value: "/tags/affair/" },
  { title: "催眠", value: "/tags/hypnosis/" },
  { title: "偷拍", value: "/tags/private-cam/" },
  { title: "下雨天", value: "/tags/rainy-day/" },
  { title: "NTR", value: "/tags/ntr/" },
  { title: "風俗娘", value: "/tags/club-hostess-and-sex-worker/" },
  { title: "醫生", value: "/tags/doctor/" },
  { title: "逃犯", value: "/tags/fugitive/" },
  { title: "護士", value: "/tags/nurse/" },
  { title: "老師", value: "/tags/teacher/" },
  { title: "空姐", value: "/tags/flight-attendant/" },
  { title: "球隊經理", value: "/tags/team-manager/" },
  { title: "未亡人", value: "/tags/widow/" },
  { title: "搜查官", value: "/tags/detective/" },
  { title: "情侶", value: "/tags/couple/" },
  { title: "家政婦", value: "/tags/housewife/" },
  { title: "家庭教師", value: "/tags/private-teacher/" },
  { title: "偶像", value: "/tags/idol/" },
  { title: "人妻", value: "/tags/wife/" },
  { title: "主播", value: "/tags/female-anchor/" },
  { title: "OL", value: "/tags/ol/" },
  { title: "魔鏡號", value: "/tags/magic-mirror/" },
  { title: "電車", value: "/tags/tram/" },
  { title: "處女", value: "/tags/first-night/" },
  { title: "監獄", value: "/tags/prison/" },
  { title: "溫泉", value: "/tags/hot-spring/" },
  { title: "洗浴場", value: "/tags/bathing-place/" },
  { title: "泳池", value: "/tags/swimming-pool/" },
  { title: "汽車", value: "/tags/car/" },
  { title: "廁所", value: "/tags/toilet/" },
  { title: "學校", value: "/tags/school/" },
  { title: "圖書館", value: "/tags/library/" },
  { title: "健身房", value: "/tags/gym-room/" },
  { title: "便利店", value: "/tags/store/" },
  { title: "錄像", value: "/tags/video-recording/" },
  { title: "處女作/引退作", value: "/tags/debut-retires/" },
  { title: "綜藝", value: "/tags/variety-show/" },
  { title: "節日主題", value: "/tags/festival/" },
  { title: "感謝祭", value: "/tags/thanksgiving/" },
  { title: "4小時以上", value: "/tags/more-than-4-hours/" },
  { title: "主奴調教 5159 部影片", value: "/categories/bdsm/" },
  { title: "直接開啪 6363 部影片", value: "/categories/sex-only/" },
  { title: "中文字幕 20288 部影片", value: "/categories/chinese-subtitle/" },
  { title: "凌辱快感 3402 部影片", value: "/categories/insult/" },
  { title: "制服誘惑 11469 部影片", value: "/categories/uniform/" },
  { title: "角色劇情 30725 部影片", value: "/categories/roleplay/" },
  { title: "盜攝偷拍 512 部影片", value: "/categories/private-cam/" },
  { title: "無碼解放 266 部影片", value: "/categories/uncensored/" },
  { title: "男友視角 3949 部影片", value: "/categories/pov/" },
  { title: "多P群交 5205 部影片", value: "/categories/groupsex/" },
  { title: "絲襪美腿 6821 部影片", value: "/categories/pantyhose/" },
  { title: "女同歡愉 413 部影片", value: "/categories/lesbian/" }
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
