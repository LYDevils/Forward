const axios = require('axios');
const cheerio = require('cheerio');
const { buildHeaders, delay } = require('../utils');

const BASE_URL = 'https://www.xvideos.com';

async function extractVideo(url) {
  await delay(1000 + Math.random() * 1000);
  
  try {
    const response = await axios.get(url, { 
      headers: buildHeaders(),
      timeout: 30000
    });
    const $ = cheerio.load(response.data);
    
    const videoData = $('script').filter((i, el) => $(el).html() && $(el).html().includes('html5player.setVideoUrl'));
    let videoUrl = '';
    
    if (videoData.length > 0) {
      const scriptContent = videoData.html();
      const match = scriptContent.match(/html5player\.setVideoUrl\(['"]([^'"]+)['"]\)/);
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
      platform: 'xvideos',
      originalUrl: url
    };
  } catch (error) {
    throw new Error(`Failed to extract video from xvideos: ${error.message}`);
  }
}

async function search(keyword, options = {}) {
  await delay(1000 + Math.random() * 1000);
  
  try {
    const page = options.page || 1;
    const searchUrl = `${BASE_URL}/?k=${encodeURIComponent(keyword)}&p=${page}`;
    
    const response = await axios.get(searchUrl, { 
      headers: buildHeaders(),
      timeout: 30000
    });
    const $ = cheerio.load(response.data);
    
    const results = [];
    $('.thumb-block').each((index, element) => {
      const title = $(element).find('.thumb-title').text().trim();
      const url = $(element).find('a').attr('href');
      const thumbnail = $(element).find('img').attr('src');
      const duration = $(element).find('.duration').text().trim();
      
      if (title && url) {
        results.push({
          title,
          url: url.startsWith('http') ? url : BASE_URL + url,
          thumbnail: thumbnail || '',
          duration,
          platform: 'xvideos'
        });
      }
    });
    
    return results;
  } catch (error) {
    throw new Error(`Failed to search xvideos: ${error.message}`);
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
      views: $('.nb-views').text().trim() || '',
      date: $('.upload_date').text().trim() || '',
      tags: $('.tags a').map((i, el) => $(el).text()).get(),
      platform: 'xvideos',
      originalUrl: url
    };
  } catch (error) {
    throw new Error(`Failed to get video info from xvideos: ${error.message}`);
  }
}

module.exports = {
  name: 'xvideos',
  extractVideo,
  search,
  getVideoInfo
};