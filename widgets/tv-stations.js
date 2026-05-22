WidgetMetadata = {
  id: 'lydevils.tv-stations',
  title: '电视台',
  description: '电视台模块。',
  author: 'LYDevils',
  site: '',
  version: '1.0.0',
  requiredVersion: '0.0.1',
  detailCacheDuration: 60,
  modules: [
    {
      id: 'load-stations',
      title: '电视台列表',
      description: '加载电视台列表。',
      functionName: 'loadStations',
      params: []
    },
    {
      id: 'get-station-detail',
      title: '电视台详情',
      description: '根据链接获取电视台详情。',
      functionName: 'getStationDetail',
      params: [{ name: 'url', title: '链接', type: 'input' }]
    }
  ]
};

loadStations = async () => {
  return [
    {
      id: 'tv-stations.demo.1',
      type: 'url',
      title: '示例电视台 1',
      description: '测试返回的电视台条目。',
      link: 'https://example.com/tv/1',
      mediaType: 'movie',
      playerType: 'system'
    },
    {
      id: 'tv-stations.demo.2',
      type: 'url',
      title: '示例电视台 2',
      description: '测试返回的电视台条目。',
      link: 'https://example.com/tv/2',
      mediaType: 'movie',
      playerType: 'system'
    }
  ];
};

getStationDetail = async (params = {}) => {
  const url = params.url || 'https://example.com/tv/1';
  return {
    id: 'tv-stations.detail',
    type: 'detail',
    title: '电视台详情',
    description: '测试电视台详情。',
    link: url,
    videoUrl: url,
    mediaType: 'movie',
    playerType: 'system',
    source: 'tv-stations'
  };
};
