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
  'lydevils.tvstations'
];

const PODCAST_WIDGET_IDS = [
  'lydevils.podcast'
];

function buildIndexOptions(outputFile, options = {}) {
  return {
    baseScriptUrl: 'https://raw.githubusercontent.com/LYDevils/Forward/refs/heads/main/widgets',
    widgetsDir: path.join(__dirname, 'widgets'),
    outputFile,
    title: options.title || 'LYDevils Forward Widgets',
    description: options.description || 'LYDevils Forward module source.',
    icon: 'https://github.com/LYDevils/Forward/raw/main/icon.png',
    includeWidgetIds: options.includeWidgetIds || INCLUDED_WIDGET_IDS
  };
}

async function main() {
  const outputs = [
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

  for (const options of outputs) {
    const result = await generateSourceIndex(buildIndexOptions(options.outputFile, options));
    console.log(`Generated ${result.outputFile}`);
    console.log(`Widget count: ${result.index.widgets.length}`);
  }
}

main().catch((error) => {
  console.error('Failed to generate widget index:', error.message);
  process.exitCode = 1;
});
