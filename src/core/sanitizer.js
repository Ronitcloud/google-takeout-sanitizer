const fs = require("fs-extra");
const path = require("path");
const { getFileHash, getFileDate } = require(path.join(__dirname, './utils'));

/**
 * Main sanitizer function
 * @param {string} sourceDir - Source directory to clean
 * @param {string} destDir - Destination directory for organized files
 * @param {Object} options - Configuration options
 * @param {boolean} options.deleteJson - Whether to delete JSON/HTML files
 * @param {boolean} options.dryRun - Dry run mode (no actual changes)
 * @param {Function} options.onProgress - Progress callback function
 * @returns {Promise<Object>} Statistics object
 */
async function sanitize(sourceDir, destDir, options = {}) {
  const {
    deleteJson = true,
    dryRun = false,
    onProgress = () => {},
  } = options;

  // Statistics
  const stats = {
    processed: 0,
    jsonsDeleted: 0,
    originalsReplaced: 0,
    duplicatesDeleted: 0,
    moved: 0,
    totalSize: 0,
    savedSize: 0,
  };

  // Memory for MD5 Hashes (to detect duplicates)
  const seenHashes = new Set();

  // Safe file operations
  async function safeDelete(filePath) {
    if (dryRun) {
      onProgress({ type: 'log', message: `[DRY-RUN] Would delete: ${filePath}` });
      return;
    }
    const stat = await fs.stat(filePath);
    stats.savedSize += stat.size;
    await fs.remove(filePath);
  }

  async function safeRename(oldPath, newPath) {
    if (dryRun) {
      onProgress({ type: 'log', message: `[DRY-RUN] Would rename: ${path.basename(oldPath)} -> ${path.basename(newPath)}` });
      return;
    }
    await fs.rename(oldPath, newPath);
  }

  async function safeMove(oldPath, newPath) {
    if (dryRun) {
      onProgress({ type: 'log', message: `[DRY-RUN] Would move: ${path.basename(oldPath)} -> ${newPath}` });
      return;
    }
    await fs.move(oldPath, newPath);
  }

  // Process directory recursively
  async function processDirectory(dir) {
    const files = await fs.readdir(dir);
    const fileSet = new Set(files);

    // PHASE 1: Delete JSON/HTML and handle edited files
    for (const file of files) {
      const fullPath = path.join(dir, file);
      
      if (!(await fs.pathExists(fullPath))) continue;
      const stat = await fs.stat(fullPath);

      if (stat.isDirectory()) {
        await processDirectory(fullPath);
        continue;
      }

      stats.totalSize += stat.size;
      stats.processed++;

      // Update progress
      onProgress({
        type: 'progress',
        stats: { ...stats },
        currentFile: file,
      });

      // 1. DELETE JSON/HTML
      if (deleteJson && (file.endsWith(".json") || file.endsWith(".html"))) {
        await safeDelete(fullPath);
        stats.jsonsDeleted++;
        continue;
      }

      // 2. "EDITED" SWAP LOGIC
      if (file.includes("-edited.")) {
        const originalName = file.replace("-edited", "");
        const originalPath = path.join(dir, originalName);

        if (fileSet.has(originalName)) {
          if (await fs.pathExists(originalPath)) {
            await safeDelete(originalPath);
            const newPath = path.join(dir, originalName);
            await safeRename(fullPath, newPath);
            stats.originalsReplaced++;
            onProgress({ type: 'log', message: `✨ Upgraded: ${originalName}` });
          }
        } else {
          const newPath = path.join(dir, originalName);
          await safeRename(fullPath, newPath);
        }
      }
    }

    // PHASE 2: HASHING & MOVING
    const cleanFiles = await fs.readdir(dir);

    for (const file of cleanFiles) {
      const fullPath = path.join(dir, file);

      if (!(await fs.pathExists(fullPath))) continue;
      const stat = await fs.stat(fullPath);
      if (stat.isDirectory()) continue;

      // 3. MD5 DUPLICATE CHECK
      const fileHash = await getFileHash(fullPath);
      if (seenHashes.has(fileHash)) {
        onProgress({ type: 'log', message: `🗑️ Duplicate: ${file}` });
        await safeDelete(fullPath);
        stats.duplicatesDeleted++;
        continue;
      }
      seenHashes.add(fileHash);

      // 4. MOVE TO YEAR/MONTH FOLDER
      const date = await getFileDate(fullPath, file);
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");

      const targetDir = path.join(destDir, year, month);
      if (!dryRun) {
        await fs.ensureDir(targetDir);
      }
      const targetPath = path.join(targetDir, file);

      // Handle naming collision
      if (await fs.pathExists(targetPath)) {
        const ext = path.extname(file);
        const name = path.basename(file, ext);
        const newName = `${name}_${Date.now()}${ext}`;
        await safeMove(fullPath, path.join(targetDir, newName));
      } else {
        await safeMove(fullPath, targetPath);
      }
      stats.moved++;

      // Update progress
      onProgress({
        type: 'progress',
        stats: { ...stats },
        currentFile: file,
      });
    }
  }

  // Start processing
  if (!dryRun) {
    await fs.ensureDir(destDir);
  }

  if (await fs.pathExists(sourceDir)) {
    await processDirectory(sourceDir);
  } else {
    throw new Error(`Source directory not found: ${sourceDir}`);
  }

  // Final progress update
  onProgress({
    type: 'complete',
    stats: { ...stats },
  });

  return stats;
}

module.exports = { sanitize };
