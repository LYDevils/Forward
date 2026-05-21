const axios = require('axios');
const cheerio = require('cheerio');
const { buildHeaders, delay } = require('../utils');

const BASE_URL = 'https://www.youporn.com';

async function extractVideo(url) {
  await delay(1000 + Math.random() * 1000);
  
  try {
    const response = await axios.get(url, { 
      headers: buildHeaders(),
      timeout: 30000
    });
    const $ = cheerio.load(response.data);
    
    const videoData = $('script').filter((i, el) => $(el).html() && $(el).html().includes('videoUrl'));
    let videoUrl = '';
    
    if (videoData.length > 0) {
      const scriptContent = videoData.html();
      const match = scriptContent.match(/videoUrl.*?['"]([^'"]+)['"]/);
      if (match) {
        videoUrl = match[1];
      }
    }
    
    const title = $('h1').text().trim();
    const thumbnail = $('meta[property="og:image"]').attr('content');
    const duration = $('meta[itemprop="duration"]').attr('content');
    
    return {
      url: videoUrl || '',
      title: title || 'Untitled',
      thumbnail: thumbnail || '',
      duration: duration || '',
      platform: 'youporn',
      originalUrl: url
    };
  } catch (error) {
    throw new Error(`Failed to extract video from youporn: ${error.message}`);
  }
}

async function search(keyword, options = {}) {
  await delay(1000 + Math.random() * 1000);
  
  try {
    const page = options.page || 1;
    const searchUrl = `${BASE_URL}/search/?query=${encodeURIComponent(keyword)}&page=${page}`;
    
    const response = await axios.get(searchUrl, { 
      headers: buildHeaders(),
      timeout: 30000
    });
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
          platform: 'youporn'
        });
      }
    });
    
    return results;
  } catch (error) {
    throw new Error(`Failed to search youporn: ${error.message}`);
  }
}

async function getVideoInfo(url) {
  await delay(1000 + Math.random() * 1000);
  
  try {
    const response = await axios.get(url, { 
      headers: buildHeaders(),
      timeout: 30000
    });
    const $ = cheerio.load(response.data);
    
    return {
      title: $('h1').text().trim() || '',
      views: $('.view-count').text().trim() || '',
      date: $('.upload-date').text().trim() || '',
      tags: $('.tags a').map((i, el) => $(el).text()).get(),
      platform: 'youporn',
      originalUrl: url
    };
  } catch (error) {
    throw new Error(`Failed to get video info from youporn: ${error.message}`);
  }
}

module.exports = {
  name: 'youporn',
  extractVideo,
  search,
  getVideoInfo
};