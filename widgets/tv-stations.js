WidgetMetadata = {
  id: 'lydevils.tv-stations',
  title: 'TV Stations',
  description: 'TV stations module.',
  author: 'Forward',
  site: '',
  version: '1.0.0',
  requiredVersion: '0.0.2',
  detailCacheDuration: 60,
  modules: [
    {
      id: 'load-stations',
      title: 'Station List',
      description: 'Load TV station list.',
      functionName: 'loadStations',
      params: []
    },
    {
      id: 'get-station-detail',
      title: 'Station Detail',
      description: 'Get station detail by URL.',
      functionName: 'getStationDetail',
      params: [{ name: 'url', title: 'URL', type: 'input' }]
    }
  ]
};

loadStations = async () => {
  return [];
};

getStationDetail = async (params = {}) => {
  return { url: params.url || '', title: '', source: 'tv-stations' };
};
