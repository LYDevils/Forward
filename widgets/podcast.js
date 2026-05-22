WidgetMetadata = {
  id: 'lydevils.podcast',
  title: '播客',
  description: 'RSS 播客模块。',
  author: 'LYDevils',
  site: '',
  version: '1.0.0',
  requiredVersion: '0.0.1',
  detailCacheDuration: 60,
  modules: [
    {
      id: 'load-feed',
      title: '加载播客',
      description: '加载播客 RSS 源。',
      functionName: 'loadFeed',
      params: [{ name: 'feedUrl', title: 'RSS 链接', type: 'input' }]
    },
    {
      id: 'get-episode-detail',
      title: '播客详情',
      description: '根据链接获取播客详情。',
      functionName: 'getEpisodeDetail',
      params: [{ name: 'url', title: '链接', type: 'input' }]
    }
  ]
};

loadFeed = async () => {
  return [
    {
      id: 'podcast.demo.1',
      type: 'url',
      title: '示例播客 1',
      description: '测试返回的播客条目。',
      link: 'https://example.com/podcast/1',
      mediaType: 'movie',
      playerType: 'system'
    },
    {
      id: 'podcast.demo.2',
      type: 'url',
      title: '示例播客 2',
      description: '测试返回的播客条目。',
      link: 'https://example.com/podcast/2',
      mediaType: 'movie',
      playerType: 'system'
    }
  ];
};

getEpisodeDetail = async (params = {}) => {
  const url = params.url || 'https://example.com/podcast/1';
  return {
    id: 'podcast.detail',
    type: 'detail',
    title: '播客详情',
    description: '测试播客详情。',
    link: url,
    videoUrl: url,
    mediaType: 'movie',
    playerType: 'system',
    source: 'podcast'
  };
};
