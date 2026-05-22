WidgetMetadata = {
  id: 'lydevils.pornhub',
  title: 'Pornhub 视频',
  description: 'Pornhub 视频模块。',
  author: 'LYDevils',
  site: 'https://www.pornhub.com',
  version: '1.0.0',
  requiredVersion: '0.0.1',
  detailCacheDuration: 60,
  modules: [
    {
      id: 'search-videos',
      title: '搜索视频',
      description: '按关键词搜索视频。',
      functionName: 'searchVideos',
      params: [{ name: 'keyword', title: '关键词', type: 'input' }]
    },
    {
      id: 'get-categories',
      title: '分类',
      description: '加载站点分类。',
      functionName: 'getCategories',
      params: []
    },
    {
      id: 'get-video-detail',
      title: '视频详情',
      description: '根据链接获取视频详情。',
      functionName: 'getVideoDetail',
      params: [{ name: 'url', title: '链接', type: 'input' }]
    }
  ]
};

searchVideos = async (params = {}) => {
  const keyword = String(params.keyword || '').trim();
  return createDemoVideos(keyword);
};

getVideoDetail = async (params = {}) => {
  const url = params.url || 'https://www.pornhub.com';
  return {
    id: url,
    type: 'detail',
    title: params.title || 'Pornhub 视频详情',
    link: url,
    videoUrl: url,
    description: '用于测试的详情内容。',
    mediaType: 'movie',
    playerType: 'system',
    source: 'pornhub'
  };
};

getCategories = async () => {
  const categories = await loadCategories('https://www.pornhub.com', 'pornhub');
  return categories.length > 0 ? categories : createDemoCategories();
};

function createDemoVideos(keyword = '') {
  const suffix = keyword ? ` - ${keyword}` : '';
  return [
    {
      id: 'pornhub.demo.1',
      type: 'url',
      title: `Pornhub 示例视频 1${suffix}`,
      description: '测试返回的示例视频。',
      link: 'https://www.pornhub.com',
      mediaType: 'movie',
      playerType: 'system'
    },
    {
      id: 'pornhub.demo.2',
      type: 'url',
      title: `Pornhub 示例视频 2${suffix}`,
      description: '测试返回的示例视频。',
      link: 'https://www.pornhub.com',
      mediaType: 'movie',
      playerType: 'system'
    },
    {
      id: 'pornhub.demo.3',
      type: 'url',
      title: `Pornhub 示例视频 3${suffix}`,
      description: '测试返回的示例视频。',
      link: 'https://www.pornhub.com',
      mediaType: 'movie',
      playerType: 'system'
    }
  ];
}

function createDemoCategories() {
  return [
    {
      id: 'pornhub.category.hot',
      type: 'url',
      title: '热门',
      description: 'Pornhub 热门分类。',
      link: 'https://www.pornhub.com',
      mediaType: 'movie',
      playerType: 'system'
    },
    {
      id: 'pornhub.category.new',
      type: 'url',
      title: '最新',
      description: 'Pornhub 最新分类。',
      link: 'https://www.pornhub.com',
      mediaType: 'movie',
      playerType: 'system'
    }
  ];
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
        results.push({
          id: `${platform}.${results.length + 1}`,
          title,
          description: '站点分类。',
          link: normalizedUrl,
          type: 'url',
          mediaType: 'movie',
          playerType: 'system',
          platform
        });
      });
    });
    return results;
  } catch (error) {
    return [];
  }
}
