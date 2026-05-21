WidgetMetadata = {
  id: 'forward.live-tv',
  title: '直播(电视+网络)',
  description: 'Live TV module for network and IPTV sources.',
  author: 'Forward',
  site: '',
  version: '1.0.8',
  requiredVersion: '0.0.1',
  detailCacheDuration: 60,
  modules: [
    {
      title: '直播列表',
      description: '列出直播源。',
      functionName: 'loadLiveList',
      params: []
    },
    {
      title: '直播详情',
      description: '获取直播源详情。',
      functionName: 'getLiveDetail',
      params: [{ name: 'url', title: '链接', type: 'input' }]
    }
  ]
};

async function loadLiveList() {
  return [];
}

async function getLiveDetail(params = {}) {
  return { url: params.url || '', title: '', source: 'live-tv' };
}
