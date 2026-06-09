const fs = require('fs');
const path = require('path');
const {
  extractWidgetMetadata,
  generateSourceIndex,
  inspectWidget,
  loadSourceIndex
} = require('./ForwardWidgetSource');

const INCLUDED_WIDGET_IDS = [
  'lydevils.vodmax',
  'lydevils.vod',
  'lydevils.pornhub',
  'lydevils.jable',
  'lydevils.91porn',
  'lydevils.javday',
  'lydevils.javrate',
  'lydevils.xvideos',
  'lydevils.xhamster',
  'lydevils.spankbang',
  'lydevils.redtube',
  'lydevils.youporn',
  'lydevils.tube8',
  'lydevils.livetv',
  'lydevils.tvstations'
];

const PODCAST_WIDGET_IDS = [
  'lydevils.podcast'
];

async function run() {
  const widgetFile = path.join(__dirname, 'widgets', 'vod.js');
  const widgetsDir = path.join(__dirname, 'widgets');
  const widgetFiles = fs.readdirSync(widgetsDir).filter((fileName) => fileName.endsWith('.js'));
  const inspection = await inspectWidget(widgetFile);

  console.log('=== Forward Source Test ===\n');
  console.log('1. Widget metadata');
  console.log(`   encrypted: ${inspection.encrypted}`);
  console.log(`   title: ${inspection.metadata.title}`);
  console.log(`   modules: ${inspection.metadata.modules.length}\n`);

  console.log('2. Generate source indexes');
  const outputTargets = [
    {
      outputFile: path.join(__dirname, 'widgets.fwd'),
      includeWidgetIds: INCLUDED_WIDGET_IDS,
      title: 'LYDevils Forward Widgets',
      description: 'LYDevils Forward module source.'
    },
    {
      outputFile: path.join(__dirname, 'forward-widgets.fwd'),
      includeWidgetIds: INCLUDED_WIDGET_IDS,
      title: 'LYDevils Forward Widgets',
      description: 'LYDevils Forward module source.'
    },
    {
      outputFile: path.join(__dirname, 'forward-widgets.json'),
      includeWidgetIds: INCLUDED_WIDGET_IDS,
      title: 'LYDevils Forward Widgets',
      description: 'LYDevils Forward module source.'
    },
    {
      outputFile: path.join(__dirname, 'forward-widgets-clean.fwd'),
      includeWidgetIds: INCLUDED_WIDGET_IDS,
      title: 'LYDevils Forward Clean',
      description: 'Clean 15-widget Forward module source.'
    },
    {
      outputFile: path.join(__dirname, 'podcast-only.fwd'),
      includeWidgetIds: PODCAST_WIDGET_IDS,
      title: 'LYDevils Podcast',
      description: 'Podcast-only Forward module source.'
    }
  ];
  let generation = null;
  for (const target of outputTargets) {
    generation = await generateSourceIndex({
      widgetsDir,
      outputFile: target.outputFile,
      baseScriptUrl: 'https://raw.githubusercontent.com/LYDevils/Forward/refs/heads/main/widgets',
      title: target.title,
      description: target.description,
      icon: 'https://github.com/LYDevils/Forward/raw/main/icon.png',
      includeWidgetIds: target.includeWidgetIds
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

  if (sourceIndex.widgets.length !== INCLUDED_WIDGET_IDS.length) {
    throw new Error(`Expected ${INCLUDED_WIDGET_IDS.length} widgets, got ${sourceIndex.widgets.length}`);
  }

  console.log('\n5. Placeholder scan');
  const forbiddenPatterns = [/example\.com/i, /缁€杞扮伐/, /\bdemo\b/i, /buildSample/, /createDemo/];
  let scannedCount = 0;
  for (const fileName of widgetFiles) {
    const fullPath = path.join(widgetsDir, fileName);
    let inspectionResult;
    try {
      inspectionResult = await inspectWidget(fullPath);
    } catch (error) {
      if (String(error.message || error).includes('Cannot read properties of null')
        || String(error.message || error).includes('No WidgetMetadata found')
        || String(error.message || error).includes('encrypted')) {
        continue;
      }
      throw error;
    }
    if (!inspectionResult.metadata || !INCLUDED_WIDGET_IDS.concat(PODCAST_WIDGET_IDS).includes(inspectionResult.metadata.id)) {
      continue;
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    const hit = forbiddenPatterns.find((pattern) => pattern.test(content));
    if (hit) {
      throw new Error(`Placeholder content remains in ${fileName}: ${hit}`);
    }

    extractWidgetMetadata(content, { filename: fullPath });
    scannedCount += 1;
  }
  console.log(`   scanned widgets: ${scannedCount}`);
}

run().catch((error) => {
  console.error('Forward source test failed:', error.message);
  process.exitCode = 1;
});
