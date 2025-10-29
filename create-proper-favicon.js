#!/usr/bin/env node

/**
 * Rise On Favicon Generator
 *
 * This script generates favicon files for the Rise On motivational music app.
 * It creates multiple favicon sizes from the source image (public/rise-on.jpg).
 *
 * Usage:
 *   node create-proper-favicon.js
 *
 * Requirements:
 *   - sharp package installed (npm install sharp)
 *   - Source image: public/rise-on.jpg
 *
 * Output:
 *   - public/favicon.ico (32x32 PNG format, browsers handle as ICO)
 *   - public/favicon-16x16.ico (16x16 PNG format)
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const CONFIG = {
  sourceImage: 'public/rise-on.jpg',
  outputDir: 'public',
  background: { r: 0, g: 0, b: 0, alpha: 0 }, // Transparent background
  compressionLevel: 9, // Maximum compression
};

const FAVICON_SIZES = [
  { width: 32, height: 32, filename: 'favicon.ico' },
  { width: 16, height: 16, filename: 'favicon-16x16.ico' },
];

/**
 * Check if source image exists
 */
function checkSourceImage() {
  if (!fs.existsSync(CONFIG.sourceImage)) {
    console.error(`❌ Source image not found: ${CONFIG.sourceImage}`);
    console.error('Please ensure the source image exists before running this script.');
    process.exit(1);
  }
}

/**
 * Create favicon files
 */
async function createFavicons() {
  console.log('🎨 Rise On Favicon Generator');
  console.log('============================');
  console.log(`📁 Source: ${CONFIG.sourceImage}`);
  console.log(`📂 Output: ${CONFIG.outputDir}/`);
  console.log('');

  for (const size of FAVICON_SIZES) {
    try {
      const outputPath = path.join(CONFIG.outputDir, size.filename);

      await sharp(CONFIG.sourceImage)
        .resize(size.width, size.height, {
          fit: 'contain',
          background: CONFIG.background
        })
        .png({ compressionLevel: CONFIG.compressionLevel })
        .toFile(outputPath);

      console.log(`✅ Created ${size.filename} (${size.width}x${size.height})`);
    } catch (error) {
      console.error(`❌ Failed to create ${size.filename}:`, error.message);
    }
  }
}

/**
 * Main execution function
 */
async function main() {
  console.log('🚀 Starting favicon generation...\n');

  checkSourceImage();
  await createFavicons();

  console.log('\n🎉 Favicon generation completed!');
  console.log('📋 Files created:');
  FAVICON_SIZES.forEach(size => {
    console.log(`   - ${CONFIG.outputDir}/${size.filename}`);
  });

  console.log('\n💡 Tip: If favicons don\'t update immediately, try:');
  console.log('   - Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)');
  console.log('   - Clear browser cache');
  console.log('   - Try incognito/private mode');
}

// Handle errors gracefully
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught exception:', error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled rejection:', reason);
  process.exit(1);
});

// Run the script
if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Script failed:', error.message);
    process.exit(1);
  });
}

module.exports = { createFavicons, CONFIG };
