WidgetMetadata = {
  id: "lydevils.forward.playback.debug",
  title: "Forward Playback Debug",
  description: "Basic playback verification widget for Forward.",
  author: "LYDevils",
  site: "https://github.com/LYDevils/Forward",
  version: "1.0.4",
  requiredVersion: "0.0.1",
  modules: [
    {
      id: "loadResource",
      title: "Load Resource",
      description: "Return public MP4, HLS, and WebView verification entries.",
      functionName: "loadResource",
      type: "stream",
      params: [
        {
          name: "mode",
          title: "Mode",
          type: "enumeration",
          value: "mixed",
          enumOptions: [
            { title: "Mixed", value: "mixed" },
            { title: "MP4 Only", value: "mp4" },
            { title: "HLS Only", value: "hls" },
            { title: "WebView Only", value: "app" }
          ]
        }
      ]
    }
  ]
};

async function loadResource(params) {
  const publicMp4 = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const publicHls = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
  const debugPage = "https://cdn.jsdelivr.net/gh/LYDevils/Forward@main/pages/debug-player-page.html";
  const debugVideoPage = "https://cdn.jsdelivr.net/gh/LYDevils/Forward@main/pages/debug-video-page.html";
  const mode = String((params && params.mode) || "mixed");

  if (mode === "mp4") {
    return [buildSource("Public MP4", "System player MP4 test", publicMp4)];
  }

  if (mode === "hls") {
    return [
      buildSource("Public HLS", "System player HLS test", publicHls),
      buildSource("MP4 Fallback", "System player MP4 fallback", publicMp4)
    ];
  }

  if (mode === "app") {
    return [
      buildSource("Web Page", "Open a plain WebView page", debugPage),
      buildSource("Inline Video Page", "Open WebView with HTML5 video", debugVideoPage)
    ];
  }

  return [
    buildSource("Public MP4", "System player MP4 test", publicMp4),
    buildSource("Public HLS", "System player HLS test", publicHls),
    buildSource("Web Page", "Open a plain WebView page", debugPage),
    buildSource("Inline Video Page", "Open WebView with HTML5 video", debugVideoPage)
  ];
}

function buildSource(name, description, url) {
  return {
    name,
    description,
    url
  };
}
