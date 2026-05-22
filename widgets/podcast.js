WidgetMetadata = {
  id: 'lydevils.podcast',
  title: 'Podcast',
  description: 'RSS podcast module.',
  author: 'LYDevils',
  site: '',
  version: '1.0.0',
  requiredVersion: '0.0.1',
  detailCacheDuration: 60,
  modules: [
    {
      id: 'load-feed',
      title: 'Load Feed',
      description: 'Load podcast RSS feed.',
      functionName: 'loadFeed',
      params: [{ name: 'feedUrl', title: 'Feed URL', type: 'input' }]
    },
    {
      id: 'get-episode-detail',
      title: 'Episode Detail',
      description: 'Get episode detail by URL.',
      functionName: 'getEpisodeDetail',
      params: [{ name: 'url', title: 'URL', type: 'input' }]
    }
  ]
};

loadFeed = async () => {
  return [];
};

getEpisodeDetail = async (params = {}) => {
  return { url: params.url || '', title: '', source: 'podcast' };
};
