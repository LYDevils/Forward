WidgetMetadata = {
  id: "debug",
  title: "播放调试",
  description: "Forward 播放能力验证模块",
  author: "LYDevils",
  site: "https://github.com/LYDevils/Forward",
  version: "1.0.5",
  requiredVersion: "0.0.1",
  modules: [
    {
      id: "loadResource",
      title: "加载资源",
      functionName: "loadResource",
      type: "stream",
      params: []
    }
  ]
};

async function loadResource() {
  return [
    {
      name: "Big Buck Bunny",
      description: "公开 MP4 测试源",
      url: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    }
  ];
}
