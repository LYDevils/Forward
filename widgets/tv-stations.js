WidgetMetadata = {
  id: 'forward.tv-stations',
  title: '电视台',
  description: 'TV stations module.',
  author: 'Forward',
  site: '',
  version: '1.0.0',
  requiredVersion: '0.0.1',
  detailCacheDuration: 60,
  modules: [
    {
      title: '频道列表',
      description: '列出电视频道。',
      functionName: 'loadStations',
      params: []
    },
    {
      title: '频道详情',
      description: '获取频道详情。',
      functionName: 'getStationDetail',
      params: [{ name: 'url', title: '链接', type: 'input' }]
    }
  ]
};

async function loadStations() {
  return [];
}

async function getStationDetail(params = {}) {
  return { url: params.url || '', title: '', source: 'tv-stations' };
}
