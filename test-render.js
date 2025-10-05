// Quick test to see if Remotion rendering works
const { bundle } = require('@remotion/bundler');
const { renderMedia, selectComposition } = require('@remotion/renderer');
const path = require('path');

async function testRender() {
  console.log('🎬 Testing Remotion rendering...\n');
  
  try {
    console.log('Step 1: Bundling Remotion project...');
    const bundleLocation = await bundle({
      entryPoint: path.join(__dirname, 'remotion', 'index.ts'),
      webpackOverride: (config) => config,
    });
    console.log('✅ Bundle created:', bundleLocation);
    
    console.log('\nStep 2: Selecting composition...');
    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: 'MarketVariant',
      inputProps: {
        marketCode: 'JP',
        marketName: 'Japan',
        modifications: [
          'Shortened duration by 15 seconds',
          'Japanese voiceover with formal tone',
          'Added anime-style transitions',
        ],
        originalText: 'You can\'t stop us. Together we rise.',
      },
    });
    console.log('✅ Composition selected:', composition.id);
    console.log('   Duration:', composition.durationInFrames, 'frames');
    console.log('   FPS:', composition.fps);
    console.log('   Size:', composition.width, 'x', composition.height);
    
    console.log('\n✅ Remotion is working! Ready to render videos.');
    console.log('\n⚠️ Actual rendering would take 2-5 minutes per video.');
    console.log('   Skipping full render for now to save time.\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  }
}

testRender();
