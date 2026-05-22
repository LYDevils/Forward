WidgetMetadata = {
  id: 'lydevils.redtube',
  title: 'RedTube',
  description: 'RedTube video module.',
  author: 'LYDevils',
  site: 'https://www.redtube.com',
  version: '1.0.0',
  requiredVersion: '0.0.1',
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
      id: 'get-categories',
      title: 'Categories',
      description: 'Load categories dynamically from the site.',
      functionName: 'getCategories',
      params: []
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
  return { url: params.url || '', title: '', source: 'redtube' };
};

getCategories = async () => {
  return loadCategories('https://www.redtube.com', 'redtube');
};

async function loadCategories(baseUrl, platform) {
  try {
    const response = await Widget.http.get(baseUrl);
    const html = typeof response === 'string' ? response : (response.data || response.body || response.html || '');
    const $ = Widget.html.load(html);
    const results = [];
    const seen = new Set();
    ['nav a', '.navbar a', '.menu a', '.categories a', '.category a'].forEach((selector) => {
      $(selector).each((_, element) => {
        const title = $(element).text().trim();
        const url = $(element).attr('href');
        if (!title || !url) return;
        const normalizedUrl = url.startsWith('http')
          ? url
          : baseUrl.replace(/\/$/, '') + (url.startsWith('/') ? '' : '/') + url.replace(/^\//, '');
        const key = `${title}|${normalizedUrl}`;
        if (seen.has(key)) return;
        seen.add(key);
        results.push({ title, url: normalizedUrl, type: 'category', platform });
      });
    });
    return results;
  } catch (error) {
    return [];
  }
}
