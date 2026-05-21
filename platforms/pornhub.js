const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'https://www.pornhub.com';

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9'
};

async function extractVideo(url) {
  try {
    const response = await axios.get(url, { headers });
    const $ = cheerio.load(response.data);
    
    const videoData = $('script#player').html();
    let videoUrl = '';
    
    if (videoData) {
      const match = videoData.match(/videoUrl":"([^"]+)"/);
      if (match) {
        videoUrl = decodeURIComponent(match[1]);
      }
    }
    
    const title = $('h1.title').text().trim();
    const thumbnail = $('meta[property="og:image"]').attr('content');
    const duration = $('meta[itemprop="duration"]').attr('content');
    
    return {
      url: videoUrl || '',
      title: title || 'Untitled',
      thumbnail: thumbnail || '',
      duration: duration || '',
      platform: 'pornhub',
      originalUrl: url
    };
  } catch (error) {
    throw new Error(`Failed to extract video from pornhub: ${error.message}`);
  }
}

async function search(keyword, options = {}) {
  try {
    const page = options.page || 1;
    const searchUrl = `${BASE_URL}/search/video?search=${encodeURIComponent(keyword)}&page=${page}`;
    
    const response = await axios.get(searchUrl, { headers });
    const $ = cheerio.load(response.data);
    
    const results = [];
    $('.pcVideoListItem').each((index, element) => {
      const title = $(element).find('.title').text().trim();
      const url = $(element).find('.thumbnail a').attr('href');
      const thumbnail = $(element).find('.thumbnail img').attr('data-src');
      const duration = $(element).find('.duration').text().trim();
      
      if (title && url) {
        results.push({
          title,
          url: url.startsWith('http') ? url : BASE_URL + url,
          thumbnail: thumbnail || '',
          duration,
          platform: 'pornhub'
        });
      }
    });
    
    return results;
  } catch (error) {
    throw new Error(`Failed to search pornhub: ${error.message}`);
  }
}

async function getVideoInfo(url) {
  try {
    const response = await axios.get(url, { headers });
    const $ = cheerio.load(response.data);
    
    return {
      title: $('h1.title').text().trim() || '',
      views: $('.count').eq(0).text().trim() || '',
      likes: $('.votesUp').text().trim() || '',
      date: $('div.date').text().trim() || '',
      tags: $('.tagsWrapper a').map((i, el) => $(el).text()).get(),
      platform: 'pornhub',
      originalUrl: url
    };
  } catch (error) {
    throw new Error(`Failed to get video info from pornhub: ${error.message}`);
  }
}

module.exports = {
  name: 'pornhub',
  extractVideo,
  search,
  getVideoInfo
};