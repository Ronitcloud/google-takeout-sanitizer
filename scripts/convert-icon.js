/**
 * Converts the SVG icon to PNG using sharp.
 * Run with: node scripts/convert-icon.js
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sizes = [16, 32, 64, 128, 256, 512, 1024];
const svgPath = path.join(__dirname, '..', 'public', 'icon-1024.svg');
const svgContent = fs.readFileSync(svgPath);

async function convertIcons() {
  console.log('🎨 Converting SVG icon to PNG...\n');

  for (const size of sizes) {
    const outputPath = path.join(__dirname, '..', 'public', `icon-${size}.png`);
    await sharp(svgContent)
      .resize(size, size)
      .png()
      .toFile(outputPath);
    console.log(`✅ Generated icon-${size}.png`);
  }

  // Also copy the 1024 as the main icon.png for electron-builder
  const mainIconPath = path.join(__dirname, '..', 'public', 'icon.png');
  await sharp(svgContent)
    .resize(1024, 1024)
    .png()
    .toFile(mainIconPath);

  console.log('\n✅ Generated icon.png (main icon for electron-builder)');
  console.log('\n🎉 All icons generated successfully!');
}

convertIcons().catch(console.error);
