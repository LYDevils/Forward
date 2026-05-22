const VOD_SOURCE = {
  id: 'madou91',
  name: '91麻豆',
  baseUrl: 'https://91md.me/api.php/provide/vod',
  defaultTypeId: '27'
};

const VOD_CATEGORY_OPTIONS = [
  { title: "麻豆视频", value: "1" },
  { title: "91制片厂", value: "2" },
  { title: "天美传媒", value: "3" },
  { title: "蜜桃传媒", value: "4" },
  { title: "皇家华人", value: "5" },
  { title: "星空传媒", value: "6" },
  { title: "精东影业", value: "7" },
  { title: "乐播传媒", value: "8" },
  { title: "成人头条", value: "9" },
  { title: "乌鸦传媒", value: "10" },
  { title: "兔子先生", value: "20" },
  { title: "杏吧原创", value: "21" },
  { title: "玩偶姐姐", value: "22" },
  { title: "mini传媒", value: "23" },
  { title: "大象传媒", value: "24" },
  { title: "开心鬼传媒", value: "25" },
  { title: "PsychoPorn", value: "26" },
  { title: "糖心Vlog", value: "27" },
  { title: "萝莉社", value: "29" },
  { title: "性视界", value: "30" }
];

WidgetMetadata = {
  id: 'lydevils.vod',
  title: 'VOD',
  description: 'MacCMS VOD 真实可播放数据源。',
  author: 'LYDevils',
  site: 'https://91md.me',
  version: '1.0.6',
  requiredVersion: '0.0.1',
  detailCacheDuration:300,
  modules: [
    {
      id: 'latest-videos',
      title: '最新影片',
      description: '加载当前采集源最新影片。',
      functionName: 'loadLatestVideos',
      type: 'list',
      params: [{ name: 'page', title: '页码', type: 'page', startPage: 1 }]
    },
    {
      id: 'category-videos',
      title: '分类影片',
      description: '从下拉框选择 API 分类加载影片，也可切换为自定义分类 ID。',
      functionName: 'loadCategoryVideos',
      type: 'list',
      params: [
        {
          name: 'typeMode',
          title: '分类选择方式',
          type: 'enumeration',
          value: 'preset',
          enumOptions: [
            { title: '下拉分类', value: 'preset' },
            { title: '自定义 ID', value: 'custom' }
          ]
        },
        {
          name: 'typePreset',
          title: '选择分类',
          type: 'enumeration',
          value: '27',
          belongTo: { paramName: 'typeMode', value: ['preset'] },
          enumOptions: [
  { title: "麻豆视频", value: "1" },
  { title: "91制片厂", value: "2" },
  { title: "天美传媒", value: "3" },
  { title: "蜜桃传媒", value: "4" },
  { title: "皇家华人", value: "5" },
  { title: "星空传媒", value: "6" },
  { title: "精东影业", value: "7" },
  { title: "乐播传媒", value: "8" },
  { title: "成人头条", value: "9" },
  { title: "乌鸦传媒", value: "10" },
  { title: "兔子先生", value: "20" },
  { title: "杏吧原创", value: "21" },
  { title: "玩偶姐姐", value: "22" },
  { title: "mini传媒", value: "23" },
  { title: "大象传媒", value: "24" },
  { title: "开心鬼传媒", value: "25" },
  { title: "PsychoPorn", value: "26" },
  { title: "糖心Vlog", value: "27" },
  { title: "萝莉社", value: "29" },
  { title: "性视界", value: "30" }
]
        },
        {
          name: 'typeId',
          title: '自定义分类 ID',
          type: 'input',
          value: '27',
          belongTo: { paramName: 'typeMode', value: ['custom'] }
        },
        {
          name: 'typeName',
          title: '自定义分类名称',
          type: 'input',
          belongTo: { paramName: 'typeMode', value: ['custom'] }
        },
        { name: 'page', title: '页码', type: 'page', startPage: 1 }
      ]
    },
    {
      id: 'get-categories',
      title: '分类列表',
      description: '自动获取分类名称和分类 ID，点选后显示该分类影片。',
      functionName: 'getCategories',
      type: 'list',
      params: []
    },
    {
      id: 'search-videos',
      title: '搜索影片',
      description: '按关键词搜索影片。',
      functionName: 'searchVideos',
      type: 'list',
      params: [
        { name: 'keyword', title: '关键词', type: 'input' },
        { name: 'page', title: '页码', type: 'page', startPage: 1 }
      ]
    },
    {
      id: 'get-video-detail',
      title: '影片详情',
      description: '按 API ID 或前台链接加载影片详情。',
      functionName: 'getVideoDetail',
      type: 'list',
      params: [{ name: 'url', title: 'ID 或链接', type: 'input' }]
    }
  ]
};

loadLatestVideos = async (params = {}) => loadVodList({ pg: params.page || 1 });

loadCategoryVideos = async (params = {}) => {
  const preset = VOD_CATEGORY_OPTIONS.find((item) => item.value === String(params.typePreset || ''));
  const usePreset = String(params.typeMode || 'preset') === 'preset';
  const typeId = extractTypeId(usePreset ? (params.typePreset || (preset && preset.value)) : (params.typeId || params.url)) || VOD_SOURCE.defaultTypeId;
  const typeName = String(usePreset ? ((preset && preset.title) || '') : (params.typeName || '')).trim();
  const results = await loadVodList({ t: typeId, pg: params.page || 1 });
  if (!typeName) return results;
  return addCategoryPrefix(results, typeId, typeName);
};

getCategories = async () => {
  try {
    const data = await requestVod({ ac: 'list' });
    const classes = Array.isArray(data.class) ? data.class : (Array.isArray(data.list) ? data.list : []);
    const results = classes.map((item) => {
      const typeId = String(item.type_id || item.id || item.tid || '');
      const title = item.type_name || item.name || ('分类 ' + typeId);
      if (!typeId) return null;
      return {
        id: VOD_SOURCE.id + '.category.' + typeId,
        type: 'link',
        title,
        description: '分类 ID：' + typeId + '，点击查看“' + title + '”影片',
        link: 'category|' + typeId + '|' + title,
        mediaType: 'movie',
        playerType: 'system',
        source: VOD_SOURCE.name
      };
    }).filter(Boolean);
    return results.length > 0 ? results : [createMessage('未找到分类', '接口未返回分类列表。')];
  } catch (error) {
    return [createMessage('请求失败', String(error.message || error))];
  }
};

searchVideos = async (params = {}) => {
  const keyword = String(params.keyword || '').trim();
  if (!keyword) return loadLatestVideos(params);
  return loadVodList({ wd: keyword, pg: params.page || 1 });
};

getVideoDetail = async (params = {}) => {
  const value = String(params.url || params.id || params.link || '').trim();
  const vodId = extractVodId(value);
  if (!vodId) return [createMessage('缺少影片 ID', '请输入 VOD ID 或详情链接。')];
  return [await loadDetail(VOD_SOURCE.id + '|' + vodId)];
};

async function loadDetail(link) {
  const rawLink = String(link || '');
  if (rawLink.startsWith('category|')) {
    const category = parseCategoryLink(rawLink);
    const results = await loadVodList({ t: category.typeId, pg: 1 });
    return addCategoryPrefix(results, category.typeId, category.typeName);
  }
  const parts = String(link || '').split('|');
  const vodId = parts.length > 1 ? parts[1] : extractVodId(link);
  const data = await requestVod({ ac: 'detail', ids: vodId });
  const item = data.list && data.list[0];
  if (!item) throw new Error('未获取到详情 ID ' + vodId);
  return buildDetail(item);
}

async function loadVodList(extraParams) {
  try {
    const data = await requestVod(Object.assign({ ac: 'detail' }, extraParams || {}));
    const list = Array.isArray(data.list) ? data.list : [];
    if (list.length === 0) return [createMessage('未找到视频', '接口返回空列表。')];
    return list.map(buildListItem);
  } catch (error) {
    return [createMessage('请求失败', String(error.message || error))];
  }
}

async function requestVod(params) {
  const response = await Widget.http.get(VOD_SOURCE.baseUrl, {
    params: Object.assign({ out: 'json' }, params || {}),
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': 'application/json,text/plain,*/*'
    },
    timeout: 15000
  });
  const raw = typeof response === 'string' ? response : (response.data || response.body || response.html || response);
  return typeof raw === 'string' ? JSON.parse(raw) : raw;
}

function buildListItem(item) {
  const id = String(item.vod_id || item.id || '');
  return {
    id: VOD_SOURCE.id + '.' + id,
    type: 'link',
    title: item.vod_name || '未命名',
    description: [item.type_name, item.vod_remarks, item.vod_year].filter(Boolean).join(' | '),
    coverUrl: item.vod_pic || '',
    link: VOD_SOURCE.id + '|' + id,
    mediaType: 'movie',
    playerType: 'system',
    source: VOD_SOURCE.name
  };
}

function parseCategoryLink(link) {
  const parts = String(link || '').split('|');
  return {
    typeId: extractTypeId(parts[1]) || VOD_SOURCE.defaultTypeId,
    typeName: parts.slice(2).join('|')
  };
}

function addCategoryPrefix(results, typeId, typeName) {
  return results.map((item) => {
    if (item.type !== 'link') return item;
    return Object.assign({}, item, {
      description: ['分类：' + typeName + '（ID：' + typeId + '）', item.description].filter(Boolean).join(' | ')
    });
  });
}

function buildDetail(item) {
  const episodeItems = parseEpisodes(item.vod_play_url || '');
  const firstVideo = episodeItems[0] ? episodeItems[0].videoUrl : '';
  return {
    id: VOD_SOURCE.id + '.' + item.vod_id,
    type: 'detail',
    title: item.vod_name || '未命名',
    description: cleanText(item.vod_content || item.vod_blurb || item.vod_remarks || ''),
    coverUrl: item.vod_pic || '',
    link: VOD_SOURCE.id + '|' + item.vod_id,
    videoUrl: firstVideo,
    episodeItems,
    mediaType: 'movie',
    playerType: 'system',
    source: VOD_SOURCE.name
  };
}

function parseEpisodes(playUrl) {
  const groups = String(playUrl || '').split('$$$');
  const preferred = groups.find((group) => group.indexOf('.m3u8') !== -1 || group.indexOf('.mp4') !== -1) || groups[0] || '';
  return preferred.split('#').map((part, index) => {
    const pieces = part.split('$');
    const title = pieces.length > 1 ? pieces[0] : '第' + (index + 1) + '集';
    const videoUrl = pieces.length > 1 ? pieces.slice(1).join('$') : pieces[0];
    if (!videoUrl) return null;
    return {
      id: videoUrl,
      type: 'url',
      title: title || '第' + (index + 1) + '集',
      videoUrl,
      mediaType: 'movie',
      playerType: 'system'
    };
  }).filter(Boolean);
}

function extractTypeId(value) {
  const text = String(value || '').trim();
  const match = text.match(/(?:type\/id\/|[?&]t=)(\d+)/i) || text.match(/^\d+$/);
  return match ? (match[1] || match[0]) : '';
}

function extractVodId(value) {
  const text = String(value || '').trim();
  const match = text.match(/(?:detail\/id\/|play\/id\/|[?&]ids=)(\d+)/i) || text.match(/^\d+$/);
  return match ? (match[1] || match[0]) : '';
}

function cleanText(value) {
  return String(value || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

function createMessage(title, description) {
  return { id: 'vod.message.' + title, type: 'text', title, description };
}
