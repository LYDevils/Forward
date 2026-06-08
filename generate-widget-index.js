const path = require('path');
const { generateSourceIndex } = require('./ForwardWidgetSource');

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
  'lydevils.tvstations',
  'lydevils.podcast'
];

function buildIndexOptions(outputFile) {
  return {
    baseScriptUrl: 'https://raw.githubusercontent.com/LYDevils/Forward/refs/heads/main/widgets',
    widgetsDir: path.join(__dirname, 'widgets'),
    outputFile,
    title: 'LYDevils Forward Widgets',
    description: 'LYDevils Forward module source.',
    icon: 'https://github.com/LYDevils/Forward/raw/main/icon.png',
    includeWidgetIds: INCLUDED_WIDGET_IDS
  };
}

async function main() {
  const outputs = [
    path.join(__dirname, 'widgets.fwd'),
    path.join(__dirname, 'forward-widgets.fwd'),
    path.join(__dirname, 'forward-widgets.json')
  ];

  for (const outputFile of outputs) {
    const result = await generateSourceIndex(buildIndexOptions(outputFile));
    console.log(`Generated ${result.outputFile}`);
    console.log(`Widget count: ${result.index.widgets.length}`);
  }
}

main().catch((error) => {
  console.error('Failed to generate widget index:', error.message);
  process.exitCode = 1;
});
