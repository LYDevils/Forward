WidgetMetadata = {
  id: "lyvideo",
  title: "LY Video",
  version: "1.0.8",
  requiredVersion: "0.0.1",
  modules: [
    {
      title: "Debug Videos",
      requiresWebView: false,
      functionName: "loadDebugVideos",
      cacheDuration: 3600,
      params: [
        {
          name: "page",
          title: "Page",
          type: "page"
        }
      ]
    }
  ]
};

async function loadDebugVideos() {
  const videoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const coverUrl = "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217";

  return [
    {
      id: videoUrl,
      type: "url",
      title: "Big Buck Bunny",
      posterPath: coverUrl,
      backdropPath: coverUrl,
      mediaType: "movie",
      description: "Public MP4 test item",
      videoUrl: videoUrl,
      playerType: "system"
    }
  ];
}
