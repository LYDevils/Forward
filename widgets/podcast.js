WidgetMetadata = {
  id: 'lydevils.podcast',
  title: '播客',
  description: 'RSS podcast source.',
  author: 'LYDevils',
  site: '',
  version: '1.0.0',
  requiredVersion: '0.0.1',
  detailCacheDuration: 300,
  modules: [
    {
      id: 'load-feed',
      title: 'Podcast',
      description: 'Load a real RSS feed.',
      functionName: 'loadFeed',
      type: 'list',
      params: [{ name: 'feedUrl', title: 'RSS URL', type: 'input' }]
    },
    {
      id: 'get-episode-detail',
      title: 'Podcast',
      description: 'Load episode detail by media URL.',
      functionName: 'getEpisodeDetail',
      type: 'list',
      params: [{ name: 'url', title: 'URL', type: 'input' }]
    }
  ]
};

loadFeed = async (params = {}) => {
  const feedUrl = String(params.feedUrl || '').trim();
  if (!feedUrl) return [message('Missing RSS URL', 'Enter a podcast RSS feed URL.')];
  try {
    const xml = await fetchText(feedUrl);
    const items = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
    const results = items.map((item, index) => {
      const title = textTag(item, 'title') || 'Episode ' + (index + 1);
      const mediaUrl = enclosureUrl(item) || textTag(item, 'link');
      return {
        id: 'podcast.' + hash(mediaUrl || title),
        type: 'url',
        title,
        description: strip(textTag(item, 'description') || textTag(item, 'itunes:summary')),
        coverUrl: imageUrl(item),
        link: mediaUrl,
        videoUrl: mediaUrl,
        mediaType: 'movie',
        playerType: 'system',
        source: feedUrl
      };
    }).filter((item) => item.link);
    return results.length > 0 ? results.slice(0, 100) : [message('No episodes found', 'The RSS feed did not include playable enclosures.')];
  } catch (error) {
    return [message('Request failed', String(error.message || error))];
  }
};

getEpisodeDetail = async (params = {}) => {
  const url = String(params.url || params.link || '').trim();
  if (!url) return [message('Missing URL', 'Enter an episode media URL.')];
  return [{ id: 'podcast.' + hash(url), type: 'detail', title: 'Podcast', link: url, videoUrl: url, mediaType: 'movie', playerType: 'system' }];
};

async function fetchText(url) {
  const response = await Widget.http.get(url, { timeout: 15000 });
  if (typeof response === 'string') return response;
  return String(response.data || response.body || response.html || '');
}

function textTag(xml, tag) {
  const escaped = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = xml.match(new RegExp('<' + escaped + '[^>]*>([\\s\\S]*?)<\\/' + escaped + '>', 'i'));
  return match ? decode(strip(match[1])) : '';
}

function enclosureUrl(xml) {
  const match = xml.match(/<enclosure[^>]+url=["']([^"']+)["']/i) || xml.match(/<media:content[^>]+url=["']([^"']+)["']/i);
  return match ? decode(match[1]) : '';
}

function imageUrl(xml) {
  const match = xml.match(/<itunes:image[^>]+href=["']([^"']+)["']/i) || xml.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/i);
  return match ? decode(match[1]) : '';
}

function strip(value) {
  return String(value || '').replace(/<!\[CDATA\[|\]\]>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function decode(value) {
  return String(value || '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
}

function hash(value) {
  let h = 0;
  const text = String(value || '');
  for (let index = 0; index < text.length; index += 1) h = ((h << 5) - h + text.charCodeAt(index)) | 0;
  return Math.abs(h);
}

function message(title, description) {
  return { id: 'podcast.message.' + hash(title + description), type: 'text', title, description };
}
