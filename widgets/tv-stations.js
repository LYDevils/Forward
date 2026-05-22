const M3U_URL = 'https://iptv-org.github.io/iptv/categories/news.m3u';

WidgetMetadata = {
  id: 'lydevils.tv-stations',
  title: '电视台',
  description: '真实电视台直播源。',
  author: 'LYDevils',
  site: 'https://iptv-org.github.io',
  version: '1.0.4',
  requiredVersion: '0.0.1',
  detailCacheDuration:300,
  modules: [
    {
      id: 'load-stations',
      title: '电视台列表',
      description: '加载真实 M3U 直播流。',
      functionName: 'loadStations',
      type: 'list',
      params: []
    },
    {
      id: 'get-station-detail',
      title: '电视台详情',
      description: '根据链接加载直播详情。',
      functionName: 'getStationDetail',
      type: 'list',
      params: [{ name: 'url', title: '链接', type: 'input' }]
    }
  ]
};

loadStations = async () => loadM3uList();

getStationDetail = async (params = {}) => {
  const url = String(params.url || params.link || '').trim();
  if (!url) return [message('缺少链接', '请输入直播流链接。')];
  return [detail(url, params.title || '电视台')];
};

async function loadM3uList() {
  try {
    const response = await Widget.http.get(M3U_URL, { timeout: 20000 });
    const text = typeof response === 'string' ? response : String(response.data || response.body || response.html || '');
    const items = parseM3u(text);
    return items.length > 0 ? items.slice(0, 120) : [message('未找到直播流', 'M3U 源未返回可播放直播流。')];
  } catch (error) {
    return [message('请求失败', String(error.message || error))];
  }
}

function parseM3u(text) {
  const lines = String(text || '').split(/\r?\n/);
  const results = [];
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line || !line.startsWith('#EXTINF')) continue;
    const streamUrl = String(lines[index + 1] || '').trim();
    if (!/^https?:\/\//i.test(streamUrl)) continue;
    const title = clean(line.split(',').slice(1).join(',') || '直播流');
    const logo = attr(line, 'tvg-logo');
    const group = attr(line, 'group-title');
    results.push({
      id: 'tv-stations.' + hash(streamUrl),
      type: 'url',
      title,
      description: group,
      coverUrl: logo,
      link: streamUrl,
      videoUrl: streamUrl,
      mediaType: 'movie',
      playerType: 'system',
      source: M3U_URL
    });
  }
  return results;
}

function detail(url, title) {
  return { id: 'tv-stations.' + hash(url), type: 'detail', title, link: url, videoUrl: url, mediaType: 'movie', playerType: 'system', source: M3U_URL };
}

function attr(line, name) {
  const match = String(line || '').match(new RegExp(name + '="([^"]*)"', 'i'));
  return match ? match[1] : '';
}

function clean(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function hash(value) {
  let h = 0;
  const text = String(value || '');
  for (let index = 0; index < text.length; index += 1) h = ((h << 5) - h + text.charCodeAt(index)) | 0;
  return Math.abs(h);
}

function message(title, description) {
  return { id: 'tv-stations.message.' + hash(title + description), type: 'text', title, description };
}
