const axios = require('axios');
const cheerio = require('cheerio');
const { buildHeaders, delay } = require('../utils');

const BASE_URL = 'https://www.javlibrary.com';

async function extractVideo(url) {
  await delay(1000 + Math.random() * 1000);
  
  try {
    const response = await axios.get(url, { 
      headers: buildHeaders(),
      timeout: 30000
    });
    const $ = cheerio.load(response.data);
    
    const videoUrl = $('video source').attr('src');
    const title = $('h1').text().trim();
    const thumbnail = $('meta[property="og:image"]').attr('content');
    const duration = $('video').attr('duration');
    
    return {
      url: videoUrl || '',
      title: title || 'Untitled',
      thumbnail: thumbnail || '',
      duration: duration || '',
      platform: 'javday',
      originalUrl: url
    };
  } catch (error) {
    throw new Error(`Failed to extract video from javday: ${error.message}`);
  }
}

async function search(keyword, options = {}) {
  await delay(1000 + Math.random() * 1000);
  
  try {
    const page = options.page || 1;
    const searchUrl = `${BASE_URL}/vl_searchbyid.php?keyword=${encodeURIComponent(keyword)}`;
    
    const response = await axios.get(searchUrl, { 
      headers: buildHeaders(),
      timeout: 30000
    });
    const $ = cheerio.load(response.data);
    
    const results = [];
    $('.video-box').each((index, element) => {
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
          platform: 'javday'
        });
      }
    });
    
    return results;
  } catch (error) {
    throw new Error(`Failed to search javday: ${error.message}`);
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
      platform: 'javday',
      originalUrl: url
    };
  } catch (error) {
    throw new Error(`Failed to get video info from javday: ${error.message}`);
  }
}

module.exports = {
  name: 'javday',
  extractVideo,
  search,
  getVideoInfo
};