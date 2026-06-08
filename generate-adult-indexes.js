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

const commonOptions = {
  widgetsDir: path.join(__dirname, 'widgets'),
  baseScriptUrl: 'https://raw.githubusercontent.com/LYDevils/Forward/refs/heads/main/widgets',
  icon: 'https://github.com/LYDevils/Forward/raw/main/icon.png'
};

async function main() {
  const outputs = [
    {
      outputFile: path.join(__dirname, 'adult-widgets.fwd'),
      title: 'LYDevils Adult Widgets',
      description: 'Adult-only Forward module source.',
      includeWidgetIds: ADULT_WIDGET_IDS
    },
    {
      outputFile: path.join(__dirname, 'pornhub-only.fwd'),
      title: 'LYDevils Pornhub',
      description: 'Pornhub-only Forward module source.',
      includeWidgetIds: ['lydevils.pornhub']
    }
  ];

  for (const options of outputs) {
    const result = await generateSourceIndex(Object.assign({}, commonOptions, options));
    console.log(`Generated ${result.outputFile}`);
    console.log(`Widget count: ${result.index.widgets.length}`);
  }
}

main().catch((error) => {
  console.error('Failed to generate adult widget indexes:', error.message);
  process.exitCode = 1;
});
