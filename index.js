const fs = require("fs-extra");
const path = require("path");
const crypto = require("crypto");
const exifParser = require("exif-parser");

// ================= CLI CONFIGURATION =================
const rawArgs = process.argv.slice(2); // Remove 'node' and 'index.js' from args

// Check for dry-run flag and remove it from the usable args
const IS_DRY_RUN = rawArgs.includes("--dry-run");
const args = rawArgs.filter((a) => a !== "--dry-run");

// Show help if arguments are missing
if (args.length < 2) {
  console.log("❌ Error: Missing arguments.");
  console.log("\nUsage:");
  console.log(
    "  node index.js <SOURCE_FOLDER> <DESTINATION_FOLDER> [--dry-run]",
  );
  console.log("\nExample:");
  console.log(
    '  node index.js "./Takeout/Google Photos" "./Final_Gallery" --dry-run',
  );
  process.exit(1);
}

const SOURCE_DIR = args[0];
const DEST_DIR = args[1];
const DELETE_JSON = true;

if (IS_DRY_RUN) {
  console.log("🛡️  DRY RUN MODE ACTIVE: No files will be touched.");
}
// Statistics
let stats = {
  processed: 0,
  jsonsDeleted: 0,
  originalsReplaced: 0,
  duplicatesDeleted: 0,
  moved: 0,
};

// Memory for MD5 Hashes (to detect duplicates)
const seenHashes = new Set();

// Helper: Calculate MD5 Hash of a file (stream based approach)
function getFileHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("md5");
    const stream = fs.createReadStream(filePath);
    stream.on("error", (err) => reject(err));
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () => resolve(hash.digest("hex")));
  });
}

// Helper: Extract Date from EXIF or Filename
async function getFileDate(filePath, filename) {
  try {
    const buffer = await fs.readFile(filePath);
    const parser = exifParser.create(buffer);
    const result = parser.parse();
    if (result.tags && result.tags.DateTimeOriginal) {
      return new Date(result.tags.DateTimeOriginal * 1000);
    }
  } catch (e) {}

  // Fallback: Regex for dates in filename (e.g., 20230101)
  const match = filename.match(/(\d{4})(\d{2})(\d{2})/);
  if (match) {
    return new Date(`${match[1]}-${match[2]}-${match[3]}`);
  }

  // Final Fallback: File creation time
  const stat = await fs.stat(filePath);
  return stat.birthtime;
}

// ================= SAFE FILE OPERATIONS =================
// Wrap destructive/fs-changing operations so --dry-run can be honored
async function safeDelete(filePath) {
  if (IS_DRY_RUN) {
    console.log(`[DRY-RUN] 🗑️  WOULD delete: ${filePath}`);
    return;
  }
  await fs.remove(filePath);
}

async function safeRename(oldPath, newPath) {
  if (IS_DRY_RUN) {
    console.log(
      `[DRY-RUN] ✏️  WOULD rename: ${path.basename(oldPath)} -> ${path.basename(newPath)}`,
    );
    return;
  }
  await fs.rename(oldPath, newPath);
}

async function safeMove(oldPath, newPath) {
  if (IS_DRY_RUN) {
    console.log(
      `[DRY-RUN] 📂 WOULD move: ${path.basename(oldPath)} -> ${newPath}`,
    );
    return;
  }
  await fs.move(oldPath, newPath);
}

// MAIN PROCESS
async function processDirectory(dir) {
  const files = await fs.readdir(dir);

  // Map to quickly find if an "Original" exists for an "Edited" file
  const fileSet = new Set(files);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = await fs.stat(fullPath);

    if (stat.isDirectory()) {
      await processDirectory(fullPath); // Recursive dive
      continue;
    }

    // 1. DELETE JSON/HTML
    if (DELETE_JSON && (file.endsWith(".json") || file.endsWith(".html"))) {
      await safeDelete(fullPath);
      stats.jsonsDeleted++;
      continue;
    }

    // 2. "EDITED" SWAP LOGIC
    // If we find "IMG-edited.jpg", we check for "IMG.jpg"
    if (file.includes("-edited.")) {
      const originalName = file.replace("-edited", "");
      const originalPath = path.join(dir, originalName);

      if (fileSet.has(originalName)) {
        // The Original exists! Kill it.
        if (await fs.pathExists(originalPath)) {
          await safeDelete(originalPath);

          // Rename "IMG-edited.jpg" to "IMG.jpg"
          const newPath = path.join(dir, originalName);
          await safeRename(fullPath, newPath);

          stats.originalsReplaced++;
          console.log(
            `✨ Upgraded: ${originalName} (Deleted original, kept edited)`,
          );
        }
      } else {
        // If no original exists, just rename the edited file to be clean anyway
        const originalName = file.replace("-edited", "");
        const newPath = path.join(dir, originalName);
        await safeRename(fullPath, newPath);
      }
    }
  }

  // PHASE 2: HASHING & MOVING (Re-read directory to get clean filenames)
  // We re-read because we might have renamed files in Phase 1
  const cleanFiles = await fs.readdir(dir);

  for (const file of cleanFiles) {
    const fullPath = path.join(dir, file);

    // Skip directories or files we already deleted
    if (!(await fs.pathExists(fullPath))) continue;
    const stat = await fs.stat(fullPath);
    if (stat.isDirectory()) continue;

    // 3. MD5 DUPLICATE CHECK
    const fileHash = await getFileHash(fullPath);
    if (seenHashes.has(fileHash)) {
      console.log(`🗑️ Duplicate Found: ${file} -> Deleting.`);
      await safeDelete(fullPath);
      stats.duplicatesDeleted++;
      continue;
    }
    seenHashes.add(fileHash);

    // 4. MOVE TO YEAR/MONTH FOLDER
    const date = await getFileDate(fullPath, file);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");

    const targetDir = path.join(DEST_DIR, year, month);
    if (!IS_DRY_RUN) {
      await fs.ensureDir(targetDir);
    } else {
      console.log(`[DRY-RUN] Would ensure directory: ${targetDir}`);
    }
    const targetPath = path.join(targetDir, file);

    // Handle naming collision in destination
    if (await fs.pathExists(targetPath)) {
      const ext = path.extname(file);
      const name = path.basename(file, ext);
      const newName = `${name}_${Date.now()}${ext}`;
      await safeMove(fullPath, path.join(targetDir, newName));
    } else {
      await safeMove(fullPath, targetPath);
    }
    stats.moved++;
  }
}

(async () => {
  console.log("🚀 Starting Deep Clean & Organize...");
  if (!IS_DRY_RUN) {
    await fs.ensureDir(DEST_DIR);
  } else {
    console.log(`[DRY-RUN] Would ensure destination directory: ${DEST_DIR}`);
  }

  if (await fs.pathExists(SOURCE_DIR)) {
    await processDirectory(SOURCE_DIR);

    console.log("\n========================================");
    console.log("✅ MISSION COMPLETE");
    console.log(`🗑️  JSONs/HTMLs Deleted: ${stats.jsonsDeleted}`);
    console.log(`✨ Edited Photos Swapped: ${stats.originalsReplaced}`);
    console.log(`👯 Binary Duplicates Killed: ${stats.duplicatesDeleted}`);
    console.log(`📂 Photos Organized: ${stats.moved}`);
    console.log(`📁 Location: ${path.resolve(DEST_DIR)}`);
    console.log("========================================");
  } else {
    console.error(`❌ ERROR: Could not find folder: "${SOURCE_DIR}"`);
    console.error(
      'Make sure you are running the script from inside the "Google Photos" folder.',
    );
  }
})();
