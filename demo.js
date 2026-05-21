const path = require('path');
const { ForwardPlayer } = require('./index');

async function demo() {
  console.log('=== ForwardPlayer Demo ===\n');

  const player = new ForwardPlayer({
    onReady: (videoData) => {
      console.log('Video ready');
      console.log(`  title: ${videoData.title}`);
      console.log(`  duration: ${videoData.duration}`);
      console.log(`  platform: ${videoData.platform}`);
    },
    onError: (error) => {
      console.error('Player error:', error.message);
    }
  });

  console.log('1. Built-in platforms');
  console.log(`   ${ForwardPlayer.getSupportedPlatforms().join(', ')}\n`);

  console.log('2. Load manifest from disk');
  const manifestPath = path.join(__dirname, 'sources', 'example-manifest.json');
  const loadedNames = await player.loadSourcesFromManifest(manifestPath, { overwrite: true });
  console.log(`   loaded: ${loadedNames.join(', ')}\n`);

  console.log('3. Auto match by URL');
  const platformName = player.setPlatformByUrl('https://www.xvideos.com/video12345/example');
  console.log(`   matched platform: ${platformName}\n`);

  console.log('4. Manual platform switch');
  player.setPlatform('xvideos');
  console.log(`   current platform: ${player.currentPlatformName}\n`);

  console.log('5. GitHub plan');
  console.log('   Put manifest and source JSON files in GitHub.');
  console.log('   Load them with ForwardPlayer.registerSourcesFromManifest(...).');
}

demo().catch((error) => {
  console.error('Demo failed:', error.message);
  process.exitCode = 1;
});
