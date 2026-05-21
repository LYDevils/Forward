const { platforms } = require('./index');

async function testRealPlatforms() {
  console.log('=== 真实数据源测试 ===\n');
  
  const testKeyword = 'test';
  const platformList = Object.keys(platforms);
  
  for (const platformName of platformList) {
    console.log(`🔍 测试平台: ${platformName}`);
    const platform = platforms[platformName];
    
    try {
      console.log(`   └─ 尝试搜索: "${testKeyword}"`);
      const results = await platform.search(testKeyword, { page: 1 });
      
      if (results && results.length > 0) {
        console.log(`   ✓ 搜索成功! 找到 ${results.length} 个结果`);
        console.log(`   ├─ 第一个结果: ${results[0].title}`);
        console.log(`   ├─ 链接: ${results[0].url}`);
        console.log(`   └─ 时长: ${results[0].duration || '未知'}`);
        
        if (results[0].url) {
          try {
            console.log(`   └─ 尝试获取视频信息...`);
            const info = await platform.getVideoInfo(results[0].url);
            console.log(`   ✓ 获取信息成功!`);
            console.log(`      标题: ${info.title || '未知'}`);
            console.log(`      播放量: ${info.views || '未知'}`);
          } catch (infoError) {
            console.log(`   ⚠️ 获取视频信息失败: ${infoError.message}`);
          }
        }
      } else {
        console.log(`   ⚠️ 搜索结果为空`);
      }
    } catch (error) {
      console.log(`   ✗ 测试失败: ${error.message}`);
    }
    
    console.log('');
  }
  
  console.log('=== 测试完成 ===');
  console.log('\n注意: 真实网站可能有反爬机制或结构变化');
  console.log('实际使用时可能需要调整解析规则');
}

testRealPlatforms().catch(error => {
  console.error('❌ 测试出错:', error.message);
});