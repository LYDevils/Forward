WidgetMetadata = {
  id: 'lydevils.xvideos',
  title: 'XVideos 视频',
  description: 'XVideos 站点视频模块。',
  author: 'LYDevils',
  site: 'https://www.xvideos.com',
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
      id: 'get-categories',
      title: '分类',
      description: '获取站点分类。',
      functionName: 'getCategories',
      params: []
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
  return buildSampleVideos('xvideos', 'https://www.xvideos.com', params.keyword);
};

getVideoDetail = async (params = {}) => {
  return buildSampleDetail('xvideos', 'https://www.xvideos.com', params.url, params.keyword);
};

getCategories = async () => {
  const categories = await loadCategories('https://www.xvideos.com', 'xvideos');
  return categories.length > 0 ? categories : buildSampleCategories('xvideos', 'https://www.xvideos.com');
};

function buildSampleVideos(platform, baseUrl, keyword = '') {
  const suffix = keyword ? ` - ${keyword}` : '';
  return [
    {
      id: `${platform}.demo.1`,
      type: 'url',
      title: `${platform} 示例视频 1${suffix}`,
      description: '测试返回的示例视频。',
      link: baseUrl,
      mediaType: 'movie',
      playerType: 'system'
    },
    {
      id: `${platform}.demo.2`,
      type: 'url',
      title: `${platform} 示例视频 2${suffix}`,
      description: '测试返回的示例视频。',
      link: `${baseUrl}/latest`,
      mediaType: 'movie',
      playerType: 'system'
    }
  ];
}

function buildSampleCategories(platform, baseUrl) {
  return [
    {
      id: `${platform}.category.hot`,
      type: 'url',
      title: '热门',
      description: `${platform} 热门分类。`,
      link: baseUrl,
      mediaType: 'movie',
      playerType: 'system'
    },
    {
      id: `${platform}.category.new`,
      type: 'url',
      title: '最新',
      description: `${platform} 最新分类。`,
      link: `${baseUrl}/latest`,
      mediaType: 'movie',
      playerType: 'system'
    }
  ];
}

function buildSampleDetail(platform, baseUrl, url, keyword) {
  const targetUrl = url || baseUrl;
  return {
    id: `${platform}.detail`,
    type: 'detail',
    title: keyword ? `${platform} 详情：${keyword}` : `${platform} 示例详情`,
    description: `${platform} 测试详情`,
    link: targetUrl,
    videoUrl: targetUrl,
    mediaType: 'movie',
    playerType: 'system'
  };
}

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
