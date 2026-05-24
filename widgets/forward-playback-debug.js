const PUBLIC_MP4 =
  'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const PUBLIC_HLS =
  'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
const DEBUG_PAGE =
  'https://rawcdn.githack.com/LYDevils/Forward/main/pages/debug-player-page.html';
const DEBUG_VIDEO_PAGE =
  'https://rawcdn.githack.com/LYDevils/Forward/main/pages/debug-video-page.html';

WidgetMetadata = {
  id: 'lydevils.forward-playback-debug',
  title: 'Forward 播放调试',
  description: '用于验证 Forward 客户端实际支持的播放方式。',
  author: 'LYDevils',
  site: 'https://github.com/LYDevils/Forward',
  version: '1.0.0',
  requiredVersion: '0.0.1',
  detailCacheDuration: 60,
  modules: [
    {
      id: 'system-mp4',
      title: 'System MP4',
      description: '系统播放器直放公开 MP4。',
      functionName: 'loadSystemMp4',
      params: []
    },
    {
      id: 'system-hls',
      title: 'System HLS',
      description: '系统播放器直放公开 HLS(m3u8)。',
      functionName: 'loadSystemHls',
      params: []
    },
    {
      id: 'app-page',
      title: 'App 网页播放',
      description: 'App/WebView 打开普通调试网页。',
      functionName: 'loadAppPage',
      requiresWebView: true,
      params: []
    },
    {
      id: 'app-video-page',
      title: 'App 页面内视频',
      description: 'App/WebView 打开内嵌 HTML5 video 的调试页。',
      functionName: 'loadAppVideoPage',
      requiresWebView: true,
      params: []
    },
    {
      id: 'stream-debug',
      title: '多源选择',
      description: '验证 loadResource 多源选择是否正常。',
      functionName: 'loadStreamDebug',
      type: 'stream',
      params: [
        {
          name: 'mode',
          title: '调试模式',
          type: 'enumeration',
          value: 'mixed',
          enumOptions: [
            { title: '混合', value: 'mixed' },
            { title: '仅 MP4', value: 'mp4' },
            { title: '仅 HLS', value: 'hls' },
            { title: '仅网页', value: 'app' }
          ]
        }
      ]
    }
  ]
};

loadSystemMp4 = async () => {
  return [buildDetail({
    id: 'system-mp4',
    title: 'System MP4 调试',
    description: '公开 MP4，验证系统播放器是否正常。',
    videoUrl: PUBLIC_MP4,
    playerType: 'system'
  })];
};

loadSystemHls = async () => {
  return [buildDetail({
    id: 'system-hls',
    title: 'System HLS 调试',
    description: '公开 HLS，验证系统播放器对 m3u8 的支持。',
    videoUrl: PUBLIC_HLS,
    playerType: 'system',
    episodeItems: [
      buildEpisode('hls-auto', '自适应清晰度', PUBLIC_HLS, 'system'),
      buildEpisode('mp4-fallback', 'MP4 备用', PUBLIC_MP4, 'system')
    ]
  })];
};

loadAppPage = async () => {
  return [buildDetail({
    id: 'app-page',
    title: 'App 网页播放调试',
    description: '打开普通网页，验证 app/webview 页面渲染。',
    videoUrl: DEBUG_PAGE,
    playerType: 'app'
  })];
};

loadAppVideoPage = async () => {
  return [buildDetail({
    id: 'app-video-page',
    title: 'App 页面内视频调试',
    description: '打开包含 HTML5 video 的网页，验证 app/webview 页面内播放。',
    videoUrl: DEBUG_VIDEO_PAGE,
    playerType: 'app'
  })];
};

loadStreamDebug = async (params = {}) => {
  const mode = String(params.mode || 'mixed');
  if (mode === 'mp4') {
    return [buildStreamSource('MP4 直链', '公开 MP4', PUBLIC_MP4)];
  }
  if (mode === 'hls') {
    return [
      buildStreamSource('HLS 主清单', '公开 m3u8', PUBLIC_HLS),
      buildStreamSource('MP4 备用', '公开 MP4', PUBLIC_MP4)
    ];
  }
  if (mode === 'app') {
    return [
      buildStreamSource('普通网页', 'App/WebView 页面', DEBUG_PAGE),
      buildStreamSource('页面内视频', 'App/WebView + HTML5 video', DEBUG_VIDEO_PAGE)
    ];
  }
  return [
    buildStreamSource('MP4 直链', '公开 MP4', PUBLIC_MP4),
    buildStreamSource('HLS 主清单', '公开 HLS', PUBLIC_HLS),
    buildStreamSource('普通网页', 'App/WebView 页面', DEBUG_PAGE),
    buildStreamSource('页面内视频', 'App/WebView + HTML5 video', DEBUG_VIDEO_PAGE)
  ];
};

function buildDetail(options) {
  return {
    id: 'forward-playback-debug.' + String(options.id || ''),
    type: 'detail',
    title: options.title || '调试项',
    description: options.description || '',
    coverUrl: '',
    posterPath: '',
    backdropPath: '',
    link: options.videoUrl || '',
    videoUrl: options.videoUrl || '',
    episodeItems: options.episodeItems || [],
    mediaType: 'movie',
    playerType: options.playerType || 'system',
    source: 'Forward 播放调试'
  };
}

function buildEpisode(id, title, videoUrl, playerType) {
  return {
    id: 'forward-playback-debug.' + id,
    type: 'url',
    title,
    videoUrl,
    playerType: playerType || 'system'
  };
}

function buildStreamSource(name, description, url) {
  return {
    name,
    description,
    url
  };
}
