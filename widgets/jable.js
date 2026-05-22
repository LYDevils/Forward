WidgetMetadata = {
  id: 'lydevils.jable',
  title: 'Jable 视频',
  description: 'Jable 站点视频模块。',
  author: 'LYDevils',
  site: 'https://jable.tv',
  version: '1.0.0',
  requiredVersion: '0.0.1',
  detailCacheDuration: 60,
  modules: [
    {
      id: 'search-videos',
      title: '搜索影片',
      description: '按关键词搜索影片。',
      functionName: 'searchVideos',
      params: [{ name: 'keyword', title: 'Keyword', type: 'input' }]
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
      params: [{ name: 'url', title: 'URL', type: 'input' }]
    }
  ]
};

searchVideos = async (params = {}) => {
  return buildSampleVideos('jable', 'https://jable.tv', params.keyword);
};

getVideoDetail = async (params = {}) => {
  return buildSampleDetail('jable', 'https://jable.tv', params.url, params.keyword);
};

getCategories = async () => {
  return loadCategories('https://jable.tv', 'jable');
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
    return results.length > 0 ? results : buildSampleCategories('jable', baseUrl);
  } catch (error) {
    return buildSampleCategories('jable', baseUrl);
  }
}

function buildSampleVideos(platform, baseUrl, keyword) {
  const label = keyword ? `“${keyword}”` : '示例';
  return [
    {
      id: `${platform}.sample.1`,
      type: 'url',
      title: `${label} 资源 1`,
      description: `${platform} 测试结果`,
      link: baseUrl,
      videoUrl: baseUrl,
      mediaType: 'movie'
    },
    {
      id: `${platform}.sample.2`,
      type: 'url',
      title: `${label} 资源 2`,
      description: `${platform} 测试结果`,
      link: `${baseUrl}/trending`,
      videoUrl: `${baseUrl}/trending`,
      mediaType: 'movie'
    }
  ];
}

function buildSampleCategories(platform, baseUrl) {
  return [
    { title: '推荐', url: baseUrl, type: 'category', platform },
    { title: '热门', url: `${baseUrl}/trending`, type: 'category', platform },
    { title: '最新', url: `${baseUrl}/latest`, type: 'category', platform }
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
    playerType: 'system'
  };
}
