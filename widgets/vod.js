WidgetMetadata = {
  id: 'forward.vod',
  title: 'VOD',
  description: 'Video on demand module.',
  author: 'Forward',
  site: '',
  version: '1.1.0',
  requiredVersion: '0.0.1',
  detailCacheDuration: 60,
  modules: [
    {
      title: '搜索视频',
      description: '按关键词搜索视频。',
      functionName: 'searchVideos',
      params: [{ name: 'keyword', title: '关键词', type: 'input' }]
    },
    {
      title: '视频详情',
      description: '获取单个视频信息。',
      functionName: 'getVideoDetail',
      params: [{ name: 'url', title: '链接', type: 'input' }]
    }
  ]
};

async function searchVideos() {
  return [];
}

async function getVideoDetail(params = {}) {
  return { url: params.url || '', title: '', source: 'vod' };
}
