const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { extractWidgetMetadata } = require('../ForwardWidgetSource');

const WIDGET_DIR = path.join(__dirname, '..', 'widgets');
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9'
};

function readWidgetScript(fileName) {
  return fs.readFileSync(path.join(WIDGET_DIR, fileName), 'utf8');
}

function readSite(fileName) {
  const script = readWidgetScript(fileName);
  return vm.runInNewContext(script + '\nSITE;', { console });
}

function decodeHtml(value) {
  return String(value || '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, '\'')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

function cleanText(value) {
  return decodeHtml(value)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getAttr(attrs, name) {
  const patterns = [
    new RegExp(`${name}\\s*=\\s*"([^"]*)"`, 'i'),
    new RegExp(`${name}\\s*=\\s*'([^']*)'`, 'i'),
    new RegExp(`${name}\\s*=\\s*([^\\s>]+)`, 'i')
  ];
  for (const pattern of patterns) {
    const match = attrs.match(pattern);
    if (match) return decodeHtml(match[1]);
  }
  return '';
}

function normalizeUrl(href, baseUrl) {
  const raw = decodeHtml(href).trim();
  if (!raw || raw === '#' || /^javascript:/i.test(raw) || /^mailto:/i.test(raw)) return '';
  if (/^https?:\/\//i.test(raw)) return raw;
  if (raw.startsWith('//')) return 'https:' + raw;
  const base = String(baseUrl || '').replace(/\/$/, '');
  if (raw.startsWith('/')) return base + raw;
  return base + '/' + raw;
}

function buildCategoryUrl(site, categoryValue, page) {
  const value = String(categoryValue || '').trim();
  if (/^https?:\/\//i.test(value) || value.startsWith('/')) {
    const url = normalizeUrl(value, site.baseUrl);
    if (!page || page <= 1 || /[?&]page=/i.test(url)) return url;
    return url + (url.includes('?') ? '&page=' : '?page=') + page;
  }
  const normalized = value.replace(/^\/+/, '');
  const suffix = page && Number(page) > 1 ? (normalized.includes('?') ? '&page=' + page : '?page=' + page) : '';
  return normalizeUrl('/' + normalized + suffix, site.baseUrl);
}

function isLikelyVideoUrl(url, site) {
  const lower = String(url || '').toLowerCase();
  if (!lower.startsWith(String(site.baseUrl || '').toLowerCase().replace(/\/$/, ''))) return false;
  if ((site.videoPathKeywords || []).some((keyword) => lower.includes(String(keyword).toLowerCase()))) return true;
  return Boolean(site.numericVideoPaths && /^https?:\/\/[^/]+\/\d+(?:[/?#]|$)/i.test(lower));
}

function extractVideoCandidates(html, site) {
  const results = [];
  const seen = new Set();
  const anchorPattern = /<a\b(?<attrs>[^>]*)>(?<body>[\s\S]*?)<\/a>/gi;
  let match;
  while ((match = anchorPattern.exec(html))) {
    const attrs = match.groups.attrs || '';
    const href = getAttr(attrs, 'href');
    const url = normalizeUrl(href, site.baseUrl);
    if (!url || seen.has(url) || !isLikelyVideoUrl(url, site)) continue;
    const title = cleanText(getAttr(attrs, 'title') || getAttr(attrs, 'aria-label') || match.groups.body || '');
    if (!title || title.length < 2) continue;
    seen.add(url);
    results.push({ title, url });
  }
  return results;
}

async function fetchText(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  const response = await fetch(url, {
    headers: HEADERS,
    redirect: 'follow',
    signal: controller.signal
  }).finally(() => clearTimeout(timeout));
  return {
    ok: response.ok,
    status: response.status,
    url: response.url,
    text: await response.text()
  };
}

async function verifyAdultWidget(fileName) {
  const script = readWidgetScript(fileName);
  const { metadata } = extractWidgetMetadata(script, { filename: fileName });
  const preset = metadata.modules.find((module) => module.id === 'category-videos')
    .params.find((param) => param.name === 'categoryPreset');
  const site = readSite(fileName);
  const report = {
    file: fileName,
    title: metadata.title,
    version: metadata.version,
    totalCategories: preset.enumOptions.length,
    checked: [],
    status: 'ok'
  };
  for (const option of preset.enumOptions.slice(0, 3)) {
    const url = buildCategoryUrl(site, option.value, 1);
    try {
      const response = await fetchText(url);
      const videos = response.ok ? extractVideoCandidates(response.text, site) : [];
      report.checked.push({
        title: option.title,
        value: option.value,
        status: response.status,
        videoCount: videos.length
      });
    } catch (error) {
      report.checked.push({
        title: option.title,
        value: option.value,
        status: 'error',
        error: error.message
      });
    }
  }
  if (!report.checked.some((item) => item.videoCount > 0)) {
    report.status = 'blocked';
  }
  return report;
}

async function verifyVodWidget() {
  const script = readWidgetScript('vod.js');
  const { metadata } = extractWidgetMetadata(script, { filename: 'vod.js' });
  const preset = metadata.modules.find((module) => module.id === 'category-videos')
    .params.find((param) => param.name === 'typePreset');
  const report = {
    file: 'vod.js',
    title: metadata.title,
    version: metadata.version,
    totalCategories: preset.enumOptions.length,
    checked: [],
    status: 'ok'
  };
  for (const option of preset.enumOptions.slice(0, 3)) {
    const url = `https://91md.me/api.php/provide/vod?ac=detail&out=json&t=${encodeURIComponent(option.value)}&pg=1`;
    try {
      const response = await fetchText(url);
      const data = JSON.parse(response.text);
      const list = Array.isArray(data.list) ? data.list : [];
      report.checked.push({
        title: option.title,
        value: option.value,
        status: response.status,
        videoCount: list.length
      });
    } catch (error) {
      report.checked.push({
        title: option.title,
        value: option.value,
        status: 'error',
        error: error.message
      });
    }
  }
  if (!report.checked.some((item) => item.videoCount > 0)) {
    report.status = 'blocked';
  }
  return report;
}

async function main() {
  const targets = fs.readdirSync(WIDGET_DIR).filter((file) => file.endsWith('.js'));
  const reports = [];
  for (const fileName of targets) {
    const script = readWidgetScript(fileName);
    if (!script.includes('category-videos')) continue;
    if (fileName === 'vod.js') {
      reports.push(await verifyVodWidget());
    } else {
      reports.push(await verifyAdultWidget(fileName));
    }
  }
  const outputPath = path.join(__dirname, '..', 'category-verification-report.json');
  fs.writeFileSync(outputPath, JSON.stringify(reports, null, 2));
  for (const report of reports) {
    const okCount = report.checked.filter((item) => item.videoCount > 0).length;
    console.log(`${report.title}: ${okCount}/${report.checked.length} categories returned videos (${report.status})`);
  }
  console.log(`report: ${outputPath}`);
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
