const fs = require('fs');
const path = require('path');

const WIDGET_DIR = path.join(__dirname, '..', 'widgets');

const TARGET_FILES = [
  '91porn.js',
  'pornhub.js',
  'redtube.js',
  'spankbang.js',
  'tube8.js',
  'xhamster.js',
  'xvideos.js',
  'youporn.js'
];

const CATEGORY_TITLE_MAP = {
  '18 25': '18-25',
  '18-25': '18-25',
  ai: 'AI',
  all: '全部',
  'all categories': '全部分类',
  amateur: '素人',
  anal: '肛交',
  arab: '阿拉伯',
  asian: '亚洲',
  'asian woman': '亚洲',
  asmr: 'ASMR',
  ass: '美臀',
  babe: '辣妹',
  best: '精选',
  bbw: '丰满',
  bi: '双性',
  'bi sexual': '双性',
  bisexual: '双性',
  'big ass': '巨臀',
  'big cock': '巨根',
  'big dick': '巨根',
  'big tits': '巨乳',
  black: '黑人',
  'black woman': '黑人',
  blonde: '金发',
  blowjob: '口交',
  bondage: '捆绑',
  brazilian: '巴西',
  brunette: '黑发',
  bts: '幕后',
  bukkake: '群射',
  'cam porn': '摄像头',
  cartoon: '卡通',
  casting: '试镜',
  categories: '分类总览',
  celebrity: '名人',
  channels: '频道总览',
  'cock competition': '比根',
  college: '学院(18+)',
  'college (18+)': '学院(18+)',
  compilation: '合集',
  cosplay: '角色扮演',
  creampie: '中出',
  cuckold: '绿帽',
  'cuckold hotwife': '绿帽/换妻',
  cumshot: '射精',
  'double penetration': '双插',
  ebony: '黑人',
  erotic: '情色',
  european: '欧美',
  facials: '颜射',
  'family strokes': 'Family Strokes 官方',
  feet: '足交',
  'female orgasm': '女性高潮',
  femdom: '女王',
  fetish: '恋物',
  fingering: '手指',
  fisting: '拳交',
  'freaks of cock': 'Freaks Of Cock 官方',
  french: '法式',
  'fucked up family': '乱伦剧情',
  funny: '搞笑',
  gangav: 'GangAV 官方',
  gangbang: '群交',
  gapes: '扩张',
  german: '德国',
  group: '群体',
  handjob: '手交',
  hardcore: '重口',
  hd: '高清',
  hentai: '里番',
  hot: '热门',
  indian: '印度',
  interracial: '跨种族',
  japanese: '日本',
  javhd: 'JavHD 官方',
  latina: '拉丁',
  lesbian: '女同',
  lingerie: '内衣',
  long: '长片',
  latest: '最新',
  'magic asian pussy': 'Magic Asian Pussy 官方',
  massage: '按摩',
  masturbation: '自慰',
  mature: '熟女',
  milf: '熟女',
  'moms teach sex': 'Moms Teach Sex 官方',
  'monthly hot': '本月热门',
  'most subscribed': '最多订阅',
  'most viewed': '最多观看',
  muscle: '肌肉',
  newest: '最新',
  oiled: '抹油',
  orgy: '乱交',
  parody: '恶搞',
  party: '派对',
  pissing: '排尿',
  popular: '热门',
  'popular with women': '女性热门',
  pornstar: '明星演员',
  pornstars: '演员总览',
  pov: '主视角',
  public: '户外',
  'pure taboo': 'Pure Taboo 官方',
  'pussy licking': '舔阴',
  reality: '真实',
  recommended: '推荐',
  redhead: '红发',
  refined: '精选',
  'recently updated': '最近更新',
  romantic: '浪漫',
  rough: '粗暴',
  shemale: '人妖',
  'small tits': '贫乳',
  solo: '单人',
  'solo and masturbation': '单人/自慰',
  'solo girl': '女生单人',
  'solo male': '男生单人',
  squirting: '潮吹',
  'step fantasy': '继亲剧情',
  stockings: '丝袜',
  strip: '脱衣',
  striptease: '脱衣秀',
  tags: '标签总览',
  tattoos: '纹身',
  teen: '18-25',
  threesome: '3P',
  'top rated': '最高评分',
  toys: '玩具',
  trans: '跨性别',
  transgender: '跨性别',
  'verified amateurs': '认证素人',
  vintage: '复古',
  'virtual reality': 'VR',
  webcam: '直播摄像',
  'young (18+) and old': '老少配',
  'young and old': '老少配',
  'bang bros network': 'Bang Bros 官方',
  brazzers: 'Brazzers 官方',
  'casual teen sex': 'Casual Teen Sex 官方',
  'team skeet': 'Team Skeet 官方',
  vixen: 'Vixen 官方'
};

const VALUE_TITLE_MAP = {
  '/v.php': '最新',
  '/v.php?category=rf': '精选',
  '/v.php?category=hot': '热门',
  '/v.php?category=long': '长片',
  '/v.php?category=md': '本月热门',
  '/recommended': '推荐',
  '/categories': '分类总览',
  '/channels': '频道总览',
  '/new_videos/': '最新',
  '/s/popular/': '热门',
  '/newest': '最新',
  '/new': '最新',
  '/best': '精选',
  '/tags': '标签总览',
  '/channels-index': '频道总览',
  '/pornstars-index': '演员总览',
  '/browse/time/': '最新',
  '/categories/': '全部分类',
  '/categories?cc=jp': '全部分类',
  '/newest.html/': '最新',
  '/categories.html': '全部分类'
};

const OVERRIDE_OPTIONS = {
  'pornhub.js': [
    { title: 'Recommended', value: '/recommended' },
    { title: 'Categories', value: '/categories' },
    { title: 'Channels', value: '/channels' },
    { title: '18-25', value: '/categories/teen' },
    { title: 'Babe', value: '/categories/babe' },
    { title: 'College (18+)', value: '/categories/college' },
    { title: 'Hentai', value: '/categories/hentai' },
    { title: 'Pornstar', value: '/categories/pornstar' },
    { title: 'Amateur', value: '/categories/amateur' },
    { title: 'Anal', value: '/categories/anal' },
    { title: 'Asian', value: '/categories/asian' },
    { title: 'Big Dick', value: '/categories/big-dick' },
    { title: 'Big Tits', value: '/categories/big-tits' },
    { title: 'Blowjob', value: '/categories/blowjob' },
    { title: 'Creampie', value: '/categories/creampie' },
    { title: 'Ebony', value: '/categories/ebony' },
    { title: 'Gangbang', value: '/categories/gangbang' },
    { title: 'Interracial', value: '/categories/interracial' },
    { title: 'Japanese', value: '/categories/japanese' },
    { title: 'Latina', value: '/categories/latina' },
    { title: 'Lesbian', value: '/categories/lesbian' },
    { title: 'Mature', value: '/categories/mature' },
    { title: 'MILF', value: '/categories/milf' },
    { title: 'POV', value: '/categories/pov' },
    { title: 'Public', value: '/categories/public' },
    { title: 'Threesome', value: '/categories/threesome' },
    { title: 'Transgender', value: '/categories/transgender' },
    { title: 'Magic Asian Pussy', value: '/channels/magic-asian-pussy' },
    { title: 'Family Strokes', value: '/channels/family-strokes' },
    { title: 'Pure Taboo', value: '/channels/pure-taboo' }
  ],
  'spankbang.js': [
    { title: 'Latest', value: '/new_videos/' },
    { title: 'Popular', value: '/s/popular/' },
    { title: 'Amateur', value: '/category/amateur/' },
    { title: 'Anal', value: '/category/anal/' },
    { title: 'Asian', value: '/category/asian/' },
    { title: 'BBW', value: '/category/bbw/' },
    { title: 'Big Ass', value: '/category/big-ass/' },
    { title: 'Big Tits', value: '/category/big-tits/' },
    { title: 'Blowjob', value: '/category/blowjob/' },
    { title: 'Bondage', value: '/category/bondage/' },
    { title: 'Creampie', value: '/category/creampie/' },
    { title: 'Ebony', value: '/category/ebony/' },
    { title: 'Fetish', value: '/category/fetish/' },
    { title: 'Gangbang', value: '/category/gangbang/' },
    { title: 'Hardcore', value: '/category/hardcore/' },
    { title: 'Hentai', value: '/category/hentai/' },
    { title: 'Interracial', value: '/category/interracial/' },
    { title: 'Japanese', value: '/category/japanese/' },
    { title: 'Latina', value: '/category/latina/' },
    { title: 'Lesbian', value: '/category/lesbian/' },
    { title: 'MILF', value: '/category/milf/' },
    { title: 'POV', value: '/category/pov/' },
    { title: 'Public', value: '/category/public/' },
    { title: 'Teen', value: '/category/teen/' },
    { title: 'Threesome', value: '/category/threesome/' },
    { title: 'Transgender', value: '/category/transgender/' }
  ],
  'xhamster.js': [
    { title: 'Newest', value: '/newest' },
    { title: 'All Categories', value: '/categories' },
    { title: 'Amateur', value: '/categories/amateur' },
    { title: 'Anal', value: '/categories/anal' },
    { title: 'Asian', value: '/categories/asian' },
    { title: 'BBW', value: '/categories/bbw' },
    { title: 'Big Ass', value: '/categories/big-ass' },
    { title: 'Big Tits', value: '/categories/big-tits' },
    { title: 'Blowjob', value: '/categories/blowjob' },
    { title: 'Bondage', value: '/categories/bondage' },
    { title: 'Creampie', value: '/categories/creampie' },
    { title: 'Ebony', value: '/categories/ebony' },
    { title: 'Fetish', value: '/categories/fetish' },
    { title: 'Gangbang', value: '/categories/gangbang' },
    { title: 'Hardcore', value: '/categories/hardcore' },
    { title: 'Hentai', value: '/categories/hentai' },
    { title: 'Interracial', value: '/categories/interracial' },
    { title: 'Japanese', value: '/categories/japanese' },
    { title: 'Latina', value: '/categories/latina' },
    { title: 'Lesbian', value: '/categories/lesbian' },
    { title: 'Mature', value: '/categories/mature' },
    { title: 'MILF', value: '/categories/milf' },
    { title: 'POV', value: '/categories/pov' },
    { title: 'Public', value: '/categories/public' },
    { title: 'Teen', value: '/categories/teen' },
    { title: 'Threesome', value: '/categories/threesome' },
    { title: 'Transgender', value: '/categories/transgender' }
  ]
};

const HELPER_BLOCK = `const CATEGORY_TITLE_MAP = ${JSON.stringify(CATEGORY_TITLE_MAP, null, 2)};

function normalizeCategoryTitle(value) {
  return String(value || '')
    .replace(/\\b\\d[\\d,.KMB]*\\s+Videos?\\b/gi, '')
    .replace(/\\s+Category$/i, '')
    .replace(/\\s+/g, ' ')
    .trim();
}

function normalizeCategoryKey(value) {
  return normalizeCategoryTitle(value)
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[\\/_]+/g, ' ')
    .replace(/\\s*-\\s*/g, ' ')
    .replace(/\\s+/g, ' ')
    .trim();
}

function localizeCategoryTitle(value) {
  const normalized = normalizeCategoryTitle(value);
  if (!normalized) return '';
  const key = normalizeCategoryKey(normalized);
  return CATEGORY_TITLE_MAP[key] || normalized;
}

function localizeCategoryOptions(options) {
  return (options || []).map((item) => ({
    title: localizeCategoryTitle(item.title),
    value: item.value
  }));
}`;

function formatOptionBlock(options) {
  return '[\n' + options.map((option) => `  { title: ${JSON.stringify(option.title)}, value: ${JSON.stringify(option.value)} }`).join(',\n') + '\n]';
}

function normalizeCategoryTitle(value) {
  return String(value || '')
    .replace(/\b\d[\d,.KMB]*\s+Videos?\b/gi, '')
    .replace(/\s+Category$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeCategoryKey(value) {
  return normalizeCategoryTitle(value)
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[\/_]+/g, ' ')
    .replace(/\s*-\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function localizeCategoryTitle(value) {
  const normalized = normalizeCategoryTitle(value);
  if (!normalized) return '';
  const key = normalizeCategoryKey(normalized);
  return CATEGORY_TITLE_MAP[key] || normalized;
}

function localizeCategoryTitleByValue(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  if (VALUE_TITLE_MAP[raw]) return VALUE_TITLE_MAP[raw];

  const withoutHash = raw.split('#')[0];
  if (VALUE_TITLE_MAP[withoutHash]) return VALUE_TITLE_MAP[withoutHash];

  const withoutQuery = withoutHash.split('?')[0];
  const normalizedPath = withoutQuery.endsWith('/') && withoutQuery.length > 1
    ? withoutQuery.slice(0, -1)
    : withoutQuery;
  if (VALUE_TITLE_MAP[normalizedPath]) return VALUE_TITLE_MAP[normalizedPath];

  const segments = normalizedPath.split('/').filter(Boolean);
  if (!segments.length) return '';
  const slug = segments[segments.length - 1]
    .replace(/\\.html$/i, '')
    .replace(/-\\d+$/i, '')
    .replace(/_/g, ' ');
  const slugTitle = localizeCategoryTitle(slug);
  return slugTitle !== normalizeCategoryTitle(slug) ? slugTitle : '';
}

function looksCorrupted(value) {
  const text = String(value || '');
  return /�/.test(text) || /[€￠鍏鏈鏂鐔鎼滃]/.test(text);
}

function localizeOptions(options) {
  const seen = new Set();
  const output = [];
  for (const option of options || []) {
    const value = String(option.value || '').trim();
    if (!value || seen.has(value)) continue;
    seen.add(value);

    const normalizedTitle = normalizeCategoryTitle(option.title);
    const titleByTitle = localizeCategoryTitle(option.title);
    const titleByValue = localizeCategoryTitleByValue(value);

    output.push({
      title: titleByValue && (titleByTitle === normalizedTitle || looksCorrupted(normalizedTitle)) ? titleByValue : titleByTitle,
      value
    });
  }
  return output;
}

function readCategoryOptions(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/const\s+CATEGORY_OPTIONS\s*=\s*(?:localizeCategoryOptions\()?(?<array>\[[\s\S]*?\n\])\)?;/);
  if (!match || !match.groups || !match.groups.array) {
    return [];
  }
  try {
    const result = Function(`"use strict"; return (${match.groups.array});`)();
    return Array.isArray(result) ? result : [];
  } catch (error) {
    console.warn(`[warn] parse CATEGORY_OPTIONS failed for ${path.basename(filePath)}: ${error.message}`);
    return [];
  }
}

function replaceCategoryOptionsConst(content, options) {
  const replacement = `const CATEGORY_OPTIONS = localizeCategoryOptions(${formatOptionBlock(options)});`;
  const pattern = /const\s+CATEGORY_OPTIONS\s*=\s*(?:localizeCategoryOptions\()?(?:\[[\s\S]*?\n\])\)?;/;
  if (!pattern.test(content)) {
    throw new Error('Missing CATEGORY_OPTIONS constant');
  }
  return content.replace(pattern, replacement);
}

function ensureHelperBlock(content) {
  const helperPattern = /const CATEGORY_TITLE_MAP = \\{[\\s\\S]*?function localizeCategoryOptions\\(options\\) \\{[\\s\\S]*?\\n\\}/;
  if (helperPattern.test(content)) {
    return content.replace(helperPattern, HELPER_BLOCK);
  }
  return content.replace(/(\\};\\r?\\n(?:\\r?\\n)*)(const CATEGORY_OPTIONS = )/, `$1${HELPER_BLOCK}\n\n$2`);
}

function replacePresetEnumOptions(content) {
  if (/name: 'categoryPreset'[\s\S]*?enumOptions: CATEGORY_OPTIONS/m.test(content)) {
    return content;
  }
  const pattern = /(name: 'categoryPreset'[\\s\\S]*?enumOptions: )(\\[[\\s\\S]*?\\n\\]|CATEGORY_OPTIONS)/m;
  if (!pattern.test(content)) {
    throw new Error('Missing categoryPreset enumOptions');
  }
  return content.replace(pattern, '$1CATEGORY_OPTIONS');
}

function localizeLoadCategories(content) {
  if (content.includes("const title = localizeCategoryTitle(cleanText($(element).text() || $(element).attr('title') || ''));")) {
    return content;
  }
  const pattern = /const title = cleanText\\(\\$\\(element\\)\\.text\\(\\) \\|\\| \\$\\(element\\)\\.attr\\('title'\\) \\|\\| ''\\);/;
  if (!pattern.test(content)) {
    throw new Error('Missing loadCategories title assignment');
  }
  return content.replace(pattern, "const title = localizeCategoryTitle(cleanText($(element).text() || $(element).attr('title') || ''));");
}

for (const fileName of TARGET_FILES) {
  const filePath = path.join(WIDGET_DIR, fileName);
  let content = fs.readFileSync(filePath, 'utf8');
  const baseOptions = OVERRIDE_OPTIONS[fileName] || readCategoryOptions(filePath);
  const localizedOptions = localizeOptions(baseOptions);
  content = ensureHelperBlock(content);
  try {
    content = replaceCategoryOptionsConst(content, localizedOptions);
  } catch (error) {
    throw new Error(`${fileName}: ${error.message}`);
  }
  content = replacePresetEnumOptions(content);
  content = localizeLoadCategories(content);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`${fileName}: ${localizedOptions.length} categories`);
}
