WidgetMetadata = {
  id: 'forward.vod',
  title: 'VOD',
  description: 'Video on demand module.',
  author: 'Forward',
  site: '',
  version: '1.0.0',
  requiredVersion: '0.0.2',
  detailCacheDuration: 60,
  modules: [
    {
      id: 'search-videos',
      title: 'Search Videos',
      description: 'Search videos by keyword.',
      functionName: 'searchVideos',
      params: [{ name: 'keyword', title: 'Keyword', type: 'input' }]
    },
    {
      id: 'get-video-detail',
      title: 'Video Detail',
      description: 'Get video detail by URL.',
      functionName: 'getVideoDetail',
      params: [{ name: 'url', title: 'URL', type: 'input' }]
    }
  ]
};

searchVideos = async () => {
  return [];
};

getVideoDetail = async (params = {}) => {
  return { url: params.url || '', title: '', source: 'vod' };
};
