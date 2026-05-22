WidgetMetadata = {
  id: 'forward.live-tv',
  title: 'Live TV (IPTV+Web)',
  description: 'Live TV module for network and IPTV sources.',
  author: 'Forward',
  site: '',
  version: '1.0.0',
  requiredVersion: '0.0.2',
  detailCacheDuration: 60,
  modules: [
    {
      id: 'load-live-list',
      title: 'Live List',
      description: 'Load live stream list.',
      functionName: 'loadLiveList',
      params: []
    },
    {
      id: 'get-live-detail',
      title: 'Live Detail',
      description: 'Get live stream detail by URL.',
      functionName: 'getLiveDetail',
      params: [{ name: 'url', title: 'URL', type: 'input' }]
    }
  ]
};

loadLiveList = async () => {
  return [];
};

getLiveDetail = async (params = {}) => {
  return { url: params.url || '', title: '', source: 'live-tv' };
};
