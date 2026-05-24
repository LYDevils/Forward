WidgetMetadata = {
  id: "lydevils.forward-playback-debug",
  title: "Forward 播放调试",
  description: "用于验证 Forward 的基础播放能力。",
  author: "LYDevils",
  site: "https://github.com/LYDevils/Forward",
  version: "1.0.3",
  requiredVersion: "0.0.1",
  modules: [
    {
      id: "loadResource",
      title: "播放能力测试",
      description: "返回公开 MP4、HLS 和网页调试地址。",
      functionName: "loadResource",
      type: "stream",
      params: [
        {
          name: "mode",
          title: "测试模式",
          type: "enumeration",
          value: "mixed",
          enumOptions: [
            { title: "混合", value: "mixed" },
            { title: "仅 MP4", value: "mp4" },
            { title: "仅 HLS", value: "hls" },
            { title: "仅网页", value: "app" }
          ]
        }
      ]
    }
  ]
};

async function loadResource(params) {
  const publicMp4 = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const publicHls = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
  const debugPage = "https://rawcdn.githack.com/LYDevils/Forward/main/pages/debug-player-page.html";
  const debugVideoPage = "https://rawcdn.githack.com/LYDevils/Forward/main/pages/debug-video-page.html";
  const mode = String((params && params.mode) || "mixed");

  if (mode === "mp4") {
    return [
      buildSource("公开 MP4", "系统播放器 MP4", publicMp4)
    ];
  }

  if (mode === "hls") {
    return [
      buildSource("公开 HLS", "系统播放器 HLS", publicHls),
      buildSource("MP4 备用", "系统播放器 MP4", publicMp4)
    ];
  }

  if (mode === "app") {
    return [
      buildSource("普通网页", "WebView 页面", debugPage),
      buildSource("页面内视频", "WebView + HTML5 Video", debugVideoPage)
    ];
  }

  return [
    buildSource("公开 MP4", "系统播放器 MP4", publicMp4),
    buildSource("公开 HLS", "系统播放器 HLS", publicHls),
    buildSource("普通网页", "WebView 页面", debugPage),
    buildSource("页面内视频", "WebView + HTML5 Video", debugVideoPage)
  ];
}

function buildSource(name, description, url) {
  return {
    name: name,
    description: description,
    url: url
  };
}
