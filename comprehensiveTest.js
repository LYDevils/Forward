const path = require('path');
const { ForwardPlayer, platformRegistry } = require('./index');

async function runComprehensiveTest() {
  console.log('=== ForwardPlayer Comprehensive Test ===\n');

  console.log('1. Registry baseline');
  const beforeLoad = ForwardPlayer.getSupportedPlatforms();
  console.log(`   built-in count: ${beforeLoad.length}`);
  console.log(`   built-in names: ${beforeLoad.join(', ')}\n`);

  console.log('2. Load manifest and overwrite built-ins if needed');
  const manifestPath = path.join(__dirname, 'sources', 'example-manifest.json');
  const loadedNames = await ForwardPlayer.registerSourcesFromManifest(manifestPath, { overwrite: true });
  console.log(`   loaded names: ${loadedNames.join(', ')}\n`);

  console.log('3. Check registry after manifest load');
  const afterLoad = platformRegistry.getSupportedPlatforms();
  console.log(`   registry count: ${afterLoad.length}`);
  console.log(`   xvideos exists: ${Boolean(platformRegistry.getPlatform('xvideos'))}\n`);

  console.log('4. Player URL matching');
  const player = new ForwardPlayer();
  const matched = player.setPlatformByUrl('https://www.xvideos.com/video12345/example');
  console.log(`   matched platform: ${matched}`);
  console.log(`   current platform name: ${player.currentPlatformName}\n`);

  console.log('5. Contract check');
  for (const name of afterLoad) {
    const platform = platformRegistry.getPlatform(name);
    const methods = ['extractVideo', 'search', 'getVideoInfo'];
    const ok = methods.every((methodName) => typeof platform[methodName] === 'function');
    console.log(`   ${name}: ${ok ? 'OK' : 'FAIL'}`);
  }

  console.log('\n=== Test Completed ===');
}

runComprehensiveTest().catch((error) => {
  console.error('Comprehensive test failed:', error.message);
  process.exitCode = 1;
});
