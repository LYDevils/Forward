WidgetMetadata = {
  id: 'lydevils.vod',
  title: '点播视频',
  description: '视频点播模块。',
  author: 'LYDevils',
  site: '',
  version: '1.0.0',
  requiredVersion: '0.0.1',
  detailCacheDuration: 60,
  modules: [
    {
      id: 'search-videos',
      title: '搜索影片',
      description: '按关键词搜索影片。',
      functionName: 'searchVideos',
      params: [{ name: 'keyword', title: '关键词', type: 'input' }]
    },
    {
      id: 'get-video-detail',
      title: '影片详情',
      description: '根据链接获取详情。',
      functionName: 'getVideoDetail',
      params: [{ name: 'url', title: '链接', type: 'input' }]
    }
  ]
};

searchVideos = async (params = {}) => {
  const keyword = String(params.keyword || '').trim();
  return [
    {
      id: `vod.demo.1`,
      type: 'url',
      title: `点播示例 1${keyword ? ` - ${keyword}` : ''}`,
      description: '测试返回的点播内容。',
      link: 'https://example.com/vod/1',
      mediaType: 'movie',
      playerType: 'system'
    },
    {
      id: `vod.demo.2`,
      type: 'url',
      title: `点播示例 2${keyword ? ` - ${keyword}` : ''}`,
      description: '测试返回的点播内容。',
      link: 'https://example.com/vod/2',
      mediaType: 'movie',
      playerType: 'system'
    }
  ];
};

getVideoDetail = async (params = {}) => {
  const url = params.url || 'https://example.com/vod/1';
  return {
    id: 'vod.detail',
    type: 'detail',
    title: '点播详情',
    description: '测试点播详情。',
    link: url,
    videoUrl: url,
    mediaType: 'movie',
    playerType: 'system',
    source: 'vod'
  };
};
