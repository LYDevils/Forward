const M3U_URL = 'https://iptv-org.github.io/iptv/index.m3u';

WidgetMetadata = {
  id: 'lydevils.live-tv',
  title: '直播（电视+网络）',
  description: 'Real IPTV live streams.',
  author: 'LYDevils',
  site: 'https://iptv-org.github.io',
  version: '1.0.0',
  requiredVersion: '0.0.1',
  detailCacheDuration: 300,
  modules: [
    {
      id: 'load-live-list',
      title: '直播',
      description: 'Load real M3U streams.',
      functionName: 'loadLiveList',
      type: 'list',
      params: []
    },
    {
      id: 'get-live-detail',
      title: '直播',
      description: 'Load stream detail by URL.',
      functionName: 'getLiveDetail',
      type: 'list',
      params: [{ name: 'url', title: 'URL', type: 'input' }]
    }
  ]
};

loadLiveList = async () => loadM3uList();

getLiveDetail = async (params = {}) => {
  const url = String(params.url || params.link || '').trim();
  if (!url) return [message('Missing URL', 'Enter a stream URL.')];
  return [detail(url, params.title || '直播')];
};

async function loadM3uList() {
  try {
    const response = await Widget.http.get(M3U_URL, { timeout: 20000 });
    const text = typeof response === 'string' ? response : String(response.data || response.body || response.html || '');
    const items = parseM3u(text);
    return items.length > 0 ? items.slice(0, 120) : [message('No streams found', 'The M3U source returned no playable streams.')];
  } catch (error) {
    return [message('Request failed', String(error.message || error))];
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
    const title = clean(line.split(',').slice(1).join(',') || 'Stream');
    const logo = attr(line, 'tvg-logo');
    const group = attr(line, 'group-title');
    results.push({
      id: 'live-tv.' + hash(streamUrl),
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
  return { id: 'live-tv.' + hash(url), type: 'detail', title, link: url, videoUrl: url, mediaType: 'movie', playerType: 'system', source: M3U_URL };
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
  return { id: 'live-tv.message.' + hash(title + description), type: 'text', title, description };
}
