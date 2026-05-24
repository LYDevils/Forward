WidgetMetadata = {
  id: "lydevilsdebug",
  title: "LYDevils Debug",
  description: "Standalone Forward debug widget",
  author: "LYDevils",
  site: "https://github.com/LYDevils/Forward",
  version: "1.0.7",
  requiredVersion: "0.0.1",
  modules: [
    {
      id: "loadResource",
      title: "Load Resource",
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
      description: "Public MP4 test source",
      url: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    }
  ];
}
