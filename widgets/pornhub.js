WidgetMetadata = {
  id: 'forward.pornhub',
  title: 'Pornhub',
  description: 'Pornhub video module.',
  author: 'Forward',
  site: 'https://www.pornhub.com',
  version: '1.0.5',
  requiredVersion: '0.0.1',
  detailCacheDuration: 60,
  modules: [
    {
      title: '搜索视频',
      description: '按关键词搜索视频。',
      functionName: 'searchVideos',
      params: [{ name: 'keyword', title: '关键词', type: 'input' }]
    },
    {
      title: '分类',
      description: '动态获取分类列表。',
      functionName: 'getCategories',
      params: []
    },
    {
      title: '视频详情',
      description: '获取单个视频信息。',
      functionName: 'getVideoDetail',
      params: [{ name: 'url', title: '链接', type: 'input' }]
    }
  ]
};

async function searchVideos() {
  return [];
}

async function getVideoDetail(params = {}) {
  return { url: params.url || '', title: '', source: 'pornhub' };
}

async function getCategories() {
  try {
    const response = await Widget.http.get(BASE_URL);
    const html = typeof response === 'string'
      ? response
      : (response.data || response.body || response.html || '');
    const $ = Widget.html.load(html);
    const results = [];
    const seen = new Set();
    const selectors = ['nav a', '.navbar a', '.menu a', '.categories a', '.category a'];

    selectors.forEach((selector) => {
      $(selector).each((_, element) => {
        const title = $(element).text().trim();
        const url = $(element).attr('href');
        if (!title || !url) return;
        const normalizedUrl = url.startsWith('http') ? url : BASE_URL.replace(/\/$/, '') + (url.startsWith('/') ? '' : '/') + url.replace(/^\//, '');
        const key = `${title}|${normalizedUrl}`;
        if (seen.has(key)) return;
        seen.add(key);
        results.push({ title, url: normalizedUrl, type: 'category', platform: 'pornhub' });
      });
    });

    return results;
  } catch (error) {
    return [];
  }
}
