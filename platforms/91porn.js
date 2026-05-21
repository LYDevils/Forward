const axios = require('axios');
const cheerio = require('cheerio');

const BASE_URL = 'https://91porn.com';

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
};

async function extractVideo(url) {
  try {
    const response = await axios.get(url, { headers });
    const $ = cheerio.load(response.data);
    
    const videoUrl = $('video source').attr('src');
    const title = $('h1').text().trim();
    const thumbnail = $('meta[property="og:image"]').attr('content');
    const duration = $('meta[property="og:duration"]').attr('content');
    
    return {
      url: videoUrl || '',
      title: title || 'Untitled',
      thumbnail: thumbnail || '',
      duration: duration || '',
      platform: '91porn',
      originalUrl: url
    };
  } catch (error) {
    throw new Error(`Failed to extract video from 91porn: ${error.message}`);
  }
}

async function search(keyword, options = {}) {
  try {
    const page = options.page || 1;
    const searchUrl = `${BASE_URL}/search.php?search=${encodeURIComponent(keyword)}&page=${page}`;
    
    const response = await axios.get(searchUrl, { headers });
    const $ = cheerio.load(response.data);
    
    const results = [];
    $('.video-item').each((index, element) => {
      const title = $(element).find('.video-title').text().trim();
      const url = $(element).find('a').attr('href');
      const thumbnail = $(element).find('img').attr('src');
      const duration = $(element).find('.duration').text().trim();
      
      if (title && url) {
        results.push({
          title,
          url: url.startsWith('http') ? url : BASE_URL + url,
          thumbnail: thumbnail || '',
          duration,
          platform: '91porn'
        });
      }
    });
    
    return results;
  } catch (error) {
    throw new Error(`Failed to search 91porn: ${error.message}`);
  }
}

async function getVideoInfo(url) {
  try {
    const response = await axios.get(url, { headers });
    const $ = cheerio.load(response.data);
    
    return {
      title: $('h1').text().trim() || '',
      views: $('.view-count').text().trim() || '',
      likes: $('.like-count').text().trim() || '',
      date: $('.upload-date').text().trim() || '',
      tags: $('.tags a').map((i, el) => $(el).text()).get(),
      platform: '91porn',
      originalUrl: url
    };
  } catch (error) {
    throw new Error(`Failed to get video info from 91porn: ${error.message}`);
  }
}

module.exports = {
  name: '91porn',
  extractVideo,
  search,
  getVideoInfo
};