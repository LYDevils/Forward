WidgetMetadata = {
  id: 'forward.podcast',
  title: 'Podcast',
  description: 'RSS podcast module.',
  author: 'Forward',
  site: '',
  version: '2.1.0',
  requiredVersion: '0.0.1',
  detailCacheDuration: 60,
  modules: [
    {
      title: '订阅源',
      description: '加载播客 RSS 订阅。',
      functionName: 'loadFeed',
      params: [{ name: 'feedUrl', title: 'RSS 地址', type: 'input' }]
    },
    {
      title: '节目详情',
      description: '获取播客节目详情。',
      functionName: 'getEpisodeDetail',
      params: [{ name: 'url', title: '链接', type: 'input' }]
    }
  ]
};

async function loadFeed() {
  return [];
}

async function getEpisodeDetail(params = {}) {
  return { url: params.url || '', title: '', source: 'podcast' };
}
