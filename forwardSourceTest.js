const fs = require('fs');
const path = require('path');
const {
  extractWidgetMetadata,
  generateSourceIndex,
  inspectWidget,
  loadSourceIndex
} = require('./ForwardWidgetSource');

async function run() {
  const widgetFile = path.join(__dirname, 'widget-sources', 'debug.js');
  const encryptedWidgetFile = path.join(__dirname, 'widgets', 'debug.js');
  const widgetsDir = path.join(__dirname, 'widget-sources');
  const widgetFiles = fs.readdirSync(widgetsDir).filter((fileName) => fileName.endsWith('.js'));
  const inspection = await inspectWidget(widgetFile);

  console.log('=== Forward Source Test ===\n');
  console.log('1. Widget metadata');
  console.log(`   encrypted: ${inspection.encrypted}`);
  console.log(`   title: ${inspection.metadata.title}`);
  console.log(`   modules: ${inspection.metadata.modules.length}\n`);

  console.log('2. Generate source indexes');
  const outputFiles = [
    path.join(__dirname, 'widgets.fwd'),
    path.join(__dirname, 'forward-widgets.fwd'),
    path.join(__dirname, 'forward-widgets.json')
  ];
  let generation = null;
  for (const outputFile of outputFiles) {
    generation = await generateSourceIndex({
      widgetsDir,
      outputFile,
      baseScriptUrl: 'https://raw.githubusercontent.com/LYDevils/Forward/refs/heads/main/widgets',
      title: 'LYDevils Widgets',
      description: 'LYDevils Forward Widget Source',
      icon: 'https://github.com/LYDevils/Forward/raw/main/icon.png',
      includeWidgetIds: [
        'debug'
      ]
    });
    console.log(`   output: ${generation.outputFile}`);
    console.log(`   widgets: ${generation.index.widgets.length}`);
  }
  console.log('');

  console.log('3. Reload generated index');
  const sourceIndex = await loadSourceIndex(path.join(__dirname, 'forward-widgets.json'));
  console.log(`   source title: ${sourceIndex.title}`);
  console.log(`   first widget url: ${sourceIndex.widgets[0].url}\n`);

  console.log('4. Direct metadata extraction');
  const metadata = extractWidgetMetadata(fs.readFileSync(widgetFile, 'utf8'), {
    filename: widgetFile
  });
  console.log(`   extracted title: ${metadata.metadata.title}`);

  if (generation.index.widgets.length !== 1) {
    throw new Error(`Expected 1 widget, got ${generation.index.widgets.length}`);
  }

  console.log('\n5. Encrypted widget artifact');
  const encryptedContent = fs.readFileSync(encryptedWidgetFile, 'utf8');
  console.log(`   starts with FWENC1: ${String(encryptedContent.startsWith('FWENC1'))}`);
  if (!encryptedContent.startsWith('FWENC1')) {
    throw new Error('Expected encrypted widget artifact in widgets/forward-playback-debug.js');
  }

  console.log('\n6. Placeholder scan');
  const forbiddenPatterns = [/example\.com/i, /绀轰緥/, /\bdemo\b/i, /buildSample/, /createDemo/];
  for (const fileName of widgetFiles) {
    const fullPath = path.join(widgetsDir, fileName);
    const content = fs.readFileSync(fullPath, 'utf8');
    const hit = forbiddenPatterns.find((pattern) => pattern.test(content));
    if (hit) {
      throw new Error(`Placeholder content remains in ${fileName}: ${hit}`);
    }

    extractWidgetMetadata(content, { filename: fullPath });
  }
  console.log(`   scanned widgets: ${widgetFiles.length}`);
}

run().catch((error) => {
  console.error('Forward source test failed:', error.message);
  process.exitCode = 1;
});
