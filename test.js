const path = require('path');
const { ForwardPlayer, platforms, gitHubSourceLoader } = require('./index');

async function testAllPlatforms() {
  console.log('=== Forward Player - Registry Test ===\n');

  console.log('1. Built-in platforms:');
  const supportedPlatforms = ForwardPlayer.getSupportedPlatforms();
  console.log(`   Supported platforms: ${supportedPlatforms.join(', ')}`);
  console.log(`   Total: ${supportedPlatforms.length}\n`);

  console.log('2. Platform contract check:');
  for (const platformName of supportedPlatforms) {
    const platform = platforms[platformName];
    const hasRequiredMethods = platform &&
      typeof platform.extractVideo === 'function' &&
      typeof platform.search === 'function' &&
      typeof platform.getVideoInfo === 'function';

    console.log(`   ${platformName}: ${hasRequiredMethods ? 'OK' : 'FAIL'}`);
  }
  console.log('');

  console.log('3. ForwardPlayer registry access:');
  const player = new ForwardPlayer();
  player.setPlatform('pornhub');
  console.log(`   Current platform selected: ${player.currentPlatformName}`);

  const matchedPlatform = player.setPlatformByUrl('https://www.xvideos.com/video12345/example');
  console.log(`   URL matched platform: ${matchedPlatform}\n`);

  console.log('4. Manifest loading from disk:');
  const manifestPath = path.join(__dirname, 'sources', 'example-manifest.json');
  const manifest = await gitHubSourceLoader.loadSourceManifest(manifestPath);
  console.log(`   Manifest source count: ${manifest.sources.length}`);
  console.log(`   Manifest source names: ${manifest.sources.map((source) => source.name).join(', ')}`);

  const registeredNames = await ForwardPlayer.registerSourcesFromManifest(manifestPath, { overwrite: true });
  console.log(`   Registered from manifest: ${registeredNames.join(', ')}\n`);

  console.log('5. Error handling:');
  try {
    player.setPlatform('nonexistent');
    console.log('   FAIL: invalid platform should throw');
  } catch (error) {
    console.log('   OK: invalid platform throws');
  }

  try {
    const tempPlayer = new ForwardPlayer();
    await tempPlayer.loadVideo('https://example.com');
    console.log('   FAIL: loadVideo without platform should throw');
  } catch (error) {
    console.log('   OK: loadVideo without platform throws');
  }

  console.log('\n=== Test Summary ===');
  console.log('Registry and manifest loading are available.');
}

testAllPlatforms().catch((error) => {
  console.error('\nUnexpected test error:', error.message);
  process.exitCode = 1;
});
