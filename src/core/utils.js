const fs = require("fs-extra");
const path = require("path");
const crypto = require("crypto");
const exifParser = require("exif-parser");

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

// Format bytes to human readable
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

module.exports = {
  getFileHash,
  getFileDate,
  formatBytes,
};
