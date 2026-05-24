const path = require('path');
const { generateSourceIndex } = require('./ForwardWidgetSource');

function buildIndexOptions(outputFile) {
  return {
    baseScriptUrl: 'https://raw.githubusercontent.com/LYDevils/Forward/refs/heads/main/widgets',
    widgetsDir: path.join(__dirname, 'widget-sources'),
    outputFile,
    title: 'LYDevils Widgets',
    description: 'LYDevils Forward Widget Source',
    icon: 'https://github.com/LYDevils/Forward/raw/main/icon.png',
    includeWidgetIds: [
      'debug'
    ]
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
