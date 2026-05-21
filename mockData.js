module.exports = {
  xvideos: {
    extractVideo: {
      url: 'https://example-video.com/stream.mp4',
      title: 'Amazing Video Content',
      thumbnail: 'https://example-video.com/thumb.jpg',
      duration: 'PT15M30S',
      platform: 'xvideos',
      originalUrl: 'https://www.xvideos.com/video12345'
    },
    search: [
      {
        title: 'Amazing Video Content',
        url: 'https://www.xvideos.com/video12345',
        thumbnail: 'https://example.com/thumb1.jpg',
        duration: '15:30',
        platform: 'xvideos'
      },
      {
        title: 'Awesome Video Here',
        url: 'https://www.xvideos.com/video67890',
        thumbnail: 'https://example.com/thumb2.jpg',
        duration: '12:45',
        platform: 'xvideos'
      },
      {
        title: 'Great Video Collection',
        url: 'https://www.xvideos.com/videoabcde',
        thumbnail: 'https://example.com/thumb3.jpg',
        duration: '18:20',
        platform: 'xvideos'
      }
    ],
    getVideoInfo: {
      title: 'Amazing Video Content',
      views: '1,234,567',
      date: '2024-01-15',
      tags: ['amazing', 'awesome', 'video'],
      platform: 'xvideos',
      originalUrl: 'https://www.xvideos.com/video12345'
    }
  }
};