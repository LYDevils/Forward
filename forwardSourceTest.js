const fs = require('fs');
const path = require('path');
const {
  extractWidgetMetadata,
  generateSourceIndex,
  inspectWidget,
  loadSourceIndex
} = require('./ForwardWidgetSource');

async function run() {
  const widgetFile = path.join(__dirname, 'widgets', 'forward-playback-debug.js');
  const inspection = await inspectWidget(widgetFile);
  const widgetsDir = path.join(__dirname, 'widgets');
  const widgetFiles = fs.readdirSync(widgetsDir).filter((fileName) => fileName.endsWith('.js'));

  console.log('=== Forward Source Test ===\n');
  console.log('1. Widget metadata');
  console.log(`   encrypted: ${inspection.encrypted}`);
  console.log(`   title: ${inspection.metadata.title}`);
  console.log(`   modules: ${inspection.metadata.modules.length}\n`);

  console.log('2. Generate .fwd index');
  const outputFile = path.join(__dirname, 'forward-widgets.fwd');
  const generation = await generateSourceIndex({
    widgetsDir,
    outputFile,
    baseScriptUrl: 'https://raw.githubusercontent.com/LYDevils/Forward/main/widgets',
    title: 'LYDevils Widgets',
    description: 'LYDevils Forward Widget Source',
    icon: 'https://raw.githubusercontent.com/LYDevils/Forward/main/icon.png',
    includeWidgetIds: [
      'lydevils.forward-playback-debug'
    ]
  });
  console.log(`   output: ${generation.outputFile}`);
  console.log(`   widgets: ${generation.index.widgets.length}\n`);

  console.log('3. Reload generated index');
  const sourceIndex = await loadSourceIndex(outputFile);
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

  console.log('\n5. Placeholder scan');
  const forbiddenPatterns = [/example\.com/i, /示例/, /\bdemo\b/i, /buildSample/, /createDemo/];
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
