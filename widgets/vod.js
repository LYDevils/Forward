const VOD_SOURCE = {
  id: 'madou91',
  name: '91麻豆',
  baseUrl: 'https://91md.me/api.php/provide/vod',
  defaultTypeId: '27'
};

WidgetMetadata = {
  id: 'lydevils.vod',
  title: 'VOD',
  description: 'MacCMS VOD 真实可播放数据源。',
  author: 'LYDevils',
  site: 'https://91md.me',
  version: '1.0.1',
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
      description: '按分类 ID 加载影片，例如 /vod/type/id/27.html 对应分类 27。',
      functionName: 'loadCategoryVideos',
      type: 'list',
      params: [
        { name: 'typeId', title: '分类 ID', type: 'input', value: '27' },
        { name: 'page', title: '页码', type: 'page', startPage: 1 }
      ]
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
  const typeId = extractTypeId(params.typeId || params.url) || VOD_SOURCE.defaultTypeId;
  return loadVodList({ t: typeId, pg: params.page || 1 });
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





