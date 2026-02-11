# Google Takeout Sanitizer 📸

> **A safety-first tool to clean, deduplicate, and organize your Google Photos Takeout export.**

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green) ![License](https://img.shields.io/badge/license-MIT-blue) ![Status](https://img.shields.io/badge/status-stable-brightgreen)

## ⚠️ PRECAUTIONS (Read First)

**This script deletes files.** While it is designed to remove only junk and exact duplicates, mistakes can happen. Follow these safety rules:

1.  **Backup:** Keep the original Takeout ZIP or a separate copy of the folder.
2.  **Test:** Run it against a small sample folder (10–20 photos) first.
3.  **Storage:** Ensure you have enough disk space for the destination folder.

---

## 🚀 What This Tool Does

Google Takeout exports are often chaotic, containing:

- Thousands of split `.json` and `.html` metadata files.
- Duplicate images (Originals vs. Edited versions).
- "Date-based" folders that split single events into multiple directories.

**This script fixes that by:**

1.  **Sanitizing:** Recursively removes JSON/HTML clutter.
2.  **Merging Edits:** Intelligent logic to prefer `*-edited.jpg` over originals.
3.  **Deduplicating:** Uses **Stream-based MD5 Hashing** to remove exact binary duplicates without loading large files into RAM.
4.  **Organizing:** Moves cleaned photos into a `Final_Gallery/YYYY/MM` timeline based on EXIF data.

---

## 🛠️ Installation

**Prerequisites:** [Node.js](https://nodejs.org/) (LTS recommended).

Open your terminal (PowerShell or Command Prompt) and run:

````bash
# 1. Clone the repository
git clone https://github.com/Ronitcloud/google-takeout-sanitizer.git

# 2. Enter the folder
cd google-takeout-sanitizer

# 3. Install dependencies
npm install

## 🏃 Quick Usage

Run the script by providing your **Source Folder** and **Destination Folder**:

```bash
# Syntax: node index.js <SOURCE_FOLDER> <DESTINATION_FOLDER>

Example: node index.js "./Takeout/Google Photos" "./My_Clean_Gallery"
````
