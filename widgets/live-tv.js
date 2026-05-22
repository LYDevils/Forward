WidgetMetadata = {
  id: 'lydevils.live-tv',
  title: '直播（电视+网络）',
  description: '网络和 IPTV 直播模块。',
  author: 'LYDevils',
  site: '',
  version: '1.0.0',
  requiredVersion: '0.0.1',
  detailCacheDuration: 60,
  modules: [
    {
      id: 'load-live-list',
      title: '直播列表',
      description: '加载直播流列表。',
      functionName: 'loadLiveList',
      params: []
    },
    {
      id: 'get-live-detail',
      title: '直播详情',
      description: '根据链接获取直播详情。',
      functionName: 'getLiveDetail',
      params: [{ name: 'url', title: '链接', type: 'input' }]
    }
  ]
};

loadLiveList = async () => {
  return [
    {
      id: 'live-tv.demo.1',
      type: 'url',
      title: '示例直播 1',
      description: '测试返回的直播流。',
      link: 'https://example.com/live/1',
      mediaType: 'movie',
      playerType: 'system'
    },
    {
      id: 'live-tv.demo.2',
      type: 'url',
      title: '示例直播 2',
      description: '测试返回的直播流。',
      link: 'https://example.com/live/2',
      mediaType: 'movie',
      playerType: 'system'
    }
  ];
};

getLiveDetail = async (params = {}) => {
  const url = params.url || 'https://example.com/live/1';
  return {
    id: 'live-tv.detail',
    type: 'detail',
    title: '直播详情',
    description: '测试直播详情。',
    link: url,
    videoUrl: url,
    mediaType: 'movie',
    playerType: 'system',
    source: 'live-tv'
  };
};
