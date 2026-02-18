const { build } = require('vite');
const fs = require('fs-extra');
const path = require('path');

async function buildApp() {
  console.log('🔨 Building Electron app...\n');

  // Step 1: Build renderer (React UI)
  console.log('📦 Building renderer process...');
  await build({
    configFile: 'vite.config.js',
  });
  console.log('✅ Renderer built\n');

  // Step 2: Copy main process files
  console.log('📦 Copying main process files...');
  await fs.ensureDir('dist/main');
  await fs.copy('src/main', 'dist/main');
  console.log('✅ Main process copied\n');

  // Step 3: Copy core files
  console.log('📦 Copying core files...');
  await fs.ensureDir('dist/core');
  await fs.copy('src/core', 'dist/core');
  console.log('✅ Core files copied\n');

  // Step 4: Update main.js paths for production
  const mainJsPath = path.join('dist', 'main', 'main.js');
  let mainJs = await fs.readFile(mainJsPath, 'utf8');
  
  // Fix the loadFile path
  mainJs = mainJs.replace(
    "mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));",
    "mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));"
  );
  
  await fs.writeFile(mainJsPath, mainJs);
  console.log('✅ Production paths updated\n');

  console.log('🎉 Build complete! Ready for packaging.\n');
}

buildApp().catch(console.error);
