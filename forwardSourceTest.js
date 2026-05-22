const path = require('path');
const {
  extractWidgetMetadata,
  generateSourceIndex,
  inspectWidget,
  loadSourceIndex
} = require('./ForwardWidgetSource');

async function run() {
  const widgetFile = path.join(__dirname, 'widgets', 'jable.js');
  const inspection = await inspectWidget(widgetFile);

  console.log('=== Forward Source Test ===\n');
  console.log('1. Widget metadata');
  console.log(`   encrypted: ${inspection.encrypted}`);
  console.log(`   title: ${inspection.metadata.title}`);
  console.log(`   modules: ${inspection.metadata.modules.length}\n`);

  console.log('2. Generate .fwd index');
  const outputFile = path.join(__dirname, 'forward-widgets.fwd');
  const generation = await generateSourceIndex({
    widgetsDir: path.join(__dirname, 'widgets'),
    outputFile,
    baseScriptUrl: 'https://raw.githubusercontent.com/LYDevils/Forward/main/widgets',
    title: 'LYDevils 模块库',
    description: 'LYDevils Forward 模块源'
  });
  console.log(`   output: ${generation.outputFile}`);
  console.log(`   widgets: ${generation.index.widgets.length}\n`);

  console.log('3. Reload generated index');
  const sourceIndex = await loadSourceIndex(outputFile);
  console.log(`   source title: ${sourceIndex.title}`);
  console.log(`   first widget url: ${sourceIndex.widgets[0].url}\n`);

  console.log('4. Direct metadata extraction');
  const metadata = extractWidgetMetadata(require('fs').readFileSync(widgetFile, 'utf8'), {
    filename: widgetFile
  });
  console.log(`   extracted title: ${metadata.metadata.title}`);

  if (generation.index.widgets.length !== 15) {
    throw new Error(`Expected 15 widgets, got ${generation.index.widgets.length}`);
  }
}

run().catch((error) => {
  console.error('Forward source test failed:', error.message);
  process.exitCode = 1;
});
