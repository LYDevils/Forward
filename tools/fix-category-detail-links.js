const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const WIDGET_DIR = path.join(ROOT, 'widgets');
const TARGET_FILES = [
  '91porn.js',
  'jable.js',
  'javday.js',
  'javrate.js',
  'pornhub.js',
  'redtube.js',
  'spankbang.js',
  'tube8.js',
  'xhamster.js',
  'xvideos.js',
  'youporn.js'
];

const oldCategoryLinkBlock = [
  "        link: 'category|' + targetUrl,",
  "        mediaType: 'movie',",
  "        playerType: 'system',",
  "        source: SITE.title"
].join('\n');

const newCategoryLinkBlock = [
  "        link: buildCategoryLink(targetUrl, title),",
  "        source: SITE.title"
].join('\n');

const oldCategoryDetailBranch = [
  "  if (rawLink.startsWith('category|')) {",
  "    return loadVideoList(rawLink.slice('category|'.length));",
  "  }"
].join('\n');

const newCategoryDetailBranch = [
  "  if (rawLink.startsWith('category|')) {",
  "    const category = parseCategoryLink(rawLink);",
  "    return createCategoryDetail(category.url, category.title);",
  "  }"
].join('\n');

const helperBlock = `
function buildCategoryLink(categoryUrl, title) {
  return 'category|' + encodeURIComponent(String(title || '')) + '|' + encodeURIComponent(String(categoryUrl || ''));
}

function parseCategoryLink(link) {
  const payload = String(link || '').slice('category|'.length);
  const parts = payload.split('|');
  if (parts.length >= 2) {
    return {
      title: decodeComponentSafe(parts[0]),
      url: decodeComponentSafe(parts.slice(1).join('|'))
    };
  }
  return { title: '', url: payload };
}

async function createCategoryDetail(categoryUrl, categoryTitle) {
  const url = normalizeUrl(categoryUrl, SITE.baseUrl);
  const title = String(categoryTitle || '').trim() || SITE.title + ' 分类';
  const childItems = await loadVideoList(url);
  const items = Array.isArray(childItems) ? childItems : [];
  const hasVideos = items.some((item) => item && item.type === 'link');
  return {
    id: hashId('category-detail|' + url),
    type: 'detail',
    title,
    description: hasVideos ? '请选择下方视频查看详情/播放。' : '该分类暂时没有解析到视频，请换页或稍后重试。',
    link: url,
    childItems: items,
    episodeItems: items,
    mediaType: 'movie',
    source: SITE.title
  };
}

function decodeComponentSafe(value) {
  try {
    return decodeURIComponent(String(value || ''));
  } catch (error) {
    return String(value || '');
  }
}
`;

for (const fileName of TARGET_FILES) {
  const filePath = path.join(WIDGET_DIR, fileName);
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('functionName: \'loadSiteCategories\'')) continue;

  if (!content.includes(newCategoryLinkBlock)) {
    if (!content.includes(oldCategoryLinkBlock)) {
      throw new Error(`${fileName}: category link block not found`);
    }
    content = content.replace(oldCategoryLinkBlock, newCategoryLinkBlock);
  }

  if (!content.includes(newCategoryDetailBranch)) {
    if (!content.includes(oldCategoryDetailBranch)) {
      throw new Error(`${fileName}: category detail branch not found`);
    }
    content = content.replace(oldCategoryDetailBranch, newCategoryDetailBranch);
  }

  if (!content.includes('function buildCategoryLink(')) {
    const marker = '\nasync function loadVideoList(url) {';
    if (!content.includes(marker)) {
      throw new Error(`${fileName}: loadVideoList marker not found`);
    }
    content = content.replace(marker, helperBlock + marker);
  }

  fs.writeFileSync(filePath, content);
  console.log(`updated ${fileName}`);
}
