const path = require('path');
const { generateSourceIndex } = require('./ForwardWidgetSource');

const ADULT_WIDGET_IDS = [
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
  'lydevils.tube8'
];

const EXTRA_WIDGET_IDS = [
  'lydevils.vodmax',
  'lydevils.vod',
  'lydevils.livetv',
  'lydevils.tvstations',
  'lydevils.podcast'
];

const FULL_WIDGET_IDS = [
  'lydevils.vodmax',
  'lydevils.vod',
  ...ADULT_WIDGET_IDS,
  'lydevils.livetv',
  'lydevils.tvstations',
  'lydevils.podcast'
];

const LABEL_BY_ID = {
  'lydevils.vodmax': 'vodmax',
  'lydevils.vod': 'vod',
  'lydevils.livetv': 'livetv',
  'lydevils.tvstations': 'tvstations',
  'lydevils.podcast': 'podcast'
};

const commonOptions = {
  widgetsDir: path.join(__dirname, 'widgets'),
  baseScriptUrl: 'https://raw.githubusercontent.com/LYDevils/Forward/refs/heads/main/widgets',
  icon: 'https://github.com/LYDevils/Forward/raw/main/icon.png'
};

async function writeIndex(fileName, title, includeWidgetIds) {
  const result = await generateSourceIndex(Object.assign({}, commonOptions, {
    outputFile: path.join(__dirname, fileName),
    title,
    description: 'Diagnostic Forward module source.',
    includeWidgetIds
  }));
  console.log(`Generated ${result.outputFile}`);
  console.log(`Widget count: ${result.index.widgets.length}`);
}

async function main() {
  await writeIndex('diag-adult-baseline.fwd', 'LYDevils Diagnostic Adult Baseline', ADULT_WIDGET_IDS);

  for (const widgetId of EXTRA_WIDGET_IDS) {
    const label = LABEL_BY_ID[widgetId];
    await writeIndex(`diag-adult-plus-${label}.fwd`, `LYDevils Diagnostic Adult + ${label}`, ADULT_WIDGET_IDS.concat(widgetId));
  }

  for (const widgetId of EXTRA_WIDGET_IDS) {
    const label = LABEL_BY_ID[widgetId];
    await writeIndex(`diag-full-minus-${label}.fwd`, `LYDevils Diagnostic Full - ${label}`, FULL_WIDGET_IDS.filter((id) => id !== widgetId));
  }
}

main().catch((error) => {
  console.error('Failed to generate diagnostic widget indexes:', error.message);
  process.exitCode = 1;
});
