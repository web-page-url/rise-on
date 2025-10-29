const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceImage = 'public/rise-on.jpg';
const outputDir = 'public';

// Favicon sizes to generate
const sizes = [
  { width: 16, height: 16, name: 'favicon-16x16.png' },
  { width: 32, height: 32, name: 'favicon-32x32.png' },
  { width: 180, height: 180, name: 'apple-touch-icon.png' },
  { width: 192, height: 192, name: 'android-chrome-192x192.png' },
  { width: 512, height: 512, name: 'android-chrome-512x512.png' },
];

async function generateFavicons() {
  console.log('🎨 Generating favicons from rise-on.jpg...');

  for (const size of sizes) {
    try {
      await sharp(sourceImage)
        .resize(size.width, size.height, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(path.join(outputDir, size.name));

      console.log(`✅ Generated ${size.name} (${size.width}x${size.height})`);
    } catch (error) {
      console.error(`❌ Failed to generate ${size.name}:`, error.message);
    }
  }

  // Generate favicon.ico (32x32 PNG converted to ICO format)
  try {
    const favicon32Buffer = await sharp(sourceImage)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toBuffer();

    // For favicon.ico, we'll create it as a 32x32 PNG (browsers will handle it)
    fs.writeFileSync(path.join(outputDir, 'favicon.ico'), favicon32Buffer);
    console.log('✅ Generated favicon.ico (32x32)');
  } catch (error) {
    console.error('❌ Failed to generate favicon.ico:', error.message);
  }

  console.log('\n🎉 All favicons generated successfully!');
  console.log('📁 Files created in public/ directory:');
  sizes.forEach(size => console.log(`   - ${size.name}`));
  console.log('   - favicon.ico');
}

generateFavicons().catch(console.error);
