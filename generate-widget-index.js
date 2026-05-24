const path = require('path');
const { generateSourceIndex } = require('./ForwardWidgetSource');

function getArgValue(flagName) {
  const flagIndex = process.argv.indexOf(flagName);
  if (flagIndex === -1) {
    return null;
  }

  return process.argv[flagIndex + 1] || null;
}

async function main() {
  const baseScriptUrl = getArgValue('--base-url');
  if (!baseScriptUrl) {
    throw new Error('Missing required --base-url argument');
  }

  const widgetsDir = getArgValue('--widgets-dir') || path.join(__dirname, 'widgets');
  const outputFile = getArgValue('--out') || path.join(__dirname, 'forward-widgets.fwd');
  const title = getArgValue('--title') || 'LYDevils Widgets';
  const description = getArgValue('--description') || 'LYDevils Forward Widget Source';
  const icon = getArgValue('--icon') || 'https://raw.githubusercontent.com/LYDevils/Forward/main/icon.png';

  const result = await generateSourceIndex({
    baseScriptUrl,
    widgetsDir,
    outputFile,
    title,
    description,
    icon,
    includeWidgetIds: [
      'lydevils.forward-playback-debug'
    ]
  });

  console.log(`Generated ${result.outputFile}`);
  console.log(`Widget count: ${result.index.widgets.length}`);
}

main().catch((error) => {
  console.error('Failed to generate widget index:', error.message);
  process.exitCode = 1;
});
