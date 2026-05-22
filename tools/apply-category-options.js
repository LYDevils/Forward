const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const WIDGET_DIR = path.join(ROOT, 'widgets');
const SCAN_FILE = path.join(ROOT, 'category-options-scan.json');

if (!fs.existsSync(SCAN_FILE)) {
  throw new Error(`Missing scan file: ${SCAN_FILE}`);
}

const scanRaw = fs.readFileSync(SCAN_FILE, 'utf8').replace(/^\uFEFF/, '');
const scanParsed = JSON.parse(scanRaw);
const scan = Array.isArray(scanParsed)
  ? Object.fromEntries(scanParsed.map((item) => [item.file, item.options || []]))
  : scanParsed;

function formatOptionBlock(options) {
  return '[\n' + options.map((option) => `  { title: ${JSON.stringify(option.title)}, value: ${JSON.stringify(option.value)} }`).join(',\n') + '\n]';
}

function replaceConstArray(content, constName, options) {
  const block = `const ${constName} = ${formatOptionBlock(options)};`;
  const pattern = new RegExp(`const ${constName} = \\[[\\s\\S]*?\\n\\];`);
  if (!pattern.test(content)) {
    throw new Error(`Missing constant ${constName}`);
  }
  return content.replace(pattern, block);
}

function replaceInlineEnumOptions(content, paramName, options) {
  const pattern = new RegExp(`(name: '${paramName}'[\\s\\S]*?enumOptions: )\\[[\\s\\S]*?\\n\\]`, 'm');
  if (!pattern.test(content)) {
    throw new Error(`Missing enumOptions for ${paramName}`);
  }
  return content.replace(pattern, `$1${formatOptionBlock(options)}`);
}

function bumpVersions(content) {
  return content.replace(/version: '1\.0\.\d+'/g, "version: '1.0.6'");
}

for (const [fileName, options] of Object.entries(scan)) {
  const filePath = path.join(WIDGET_DIR, fileName);
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');
  const cleanedOptions = options.filter((item) => item && item.title && item.value);
  if (fileName === 'vod.js') {
    content = replaceConstArray(content, 'VOD_CATEGORY_OPTIONS', cleanedOptions);
    content = replaceInlineEnumOptions(content, 'typePreset', cleanedOptions);
  } else {
    content = replaceConstArray(content, 'CATEGORY_OPTIONS', cleanedOptions);
    content = replaceInlineEnumOptions(content, 'categoryPreset', cleanedOptions);
  }
  content = bumpVersions(content);
  fs.writeFileSync(filePath, content);
  console.log(`${fileName}: ${cleanedOptions.length}`);
}
