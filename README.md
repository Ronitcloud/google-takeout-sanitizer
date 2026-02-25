# 🧹 Takeout Cleaner Pro

> **Free & Open Source** | Recover 15GB of storage automatically by cleaning Google Photos Takeout exports

![Version](https://img.shields.io/badge/version-2.0.0-blue) ![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20Mac%20%7C%20Linux-lightgrey) ![License](https://img.shields.io/badge/license-MIT-green) [![Support via Ko-fi](https://img.shields.io/badge/Support-Ko--fi-orange)](https://ko-fi.com/ronitcloud) [![Support via Razorpay](https://img.shields.io/badge/Support%20🇮🇳-Razorpay%20(UPI%2FCard)-blue)](https://razorpay.me/@ronit2322)

---

## 🎯 What This App Does

Google Takeout exports are messy and wasteful, containing:
- 📄 Thousands of `.json` and `.html` metadata files (useless clutter)
- 🖼️ Duplicate images (originals + edited versions)
- 📁 Disorganized folder structure
- 💾 **10-15GB of wasted storage space**

**Takeout Cleaner Pro fixes that automatically:**

| Feature | Benefit |
|---------|---------|
| 🧹 **Sanitize** | Removes JSON/HTML metadata clutter |
| 🔄 **Merge Edits** | Keeps edited versions, removes originals |
| 🗑️ **Deduplicate** | MD5-based duplicate detection |
| 📅 **Organize** | Creates clean `YYYY/MM` timeline structure |
| 💰 **Result** | **Recover 10-15GB of storage space!** |

---

## ⚡ Quick Start

### 1️⃣ Download & Install

**Windows:**
1. Download `Takeout-Cleaner-Pro-Setup.exe` from [Releases](https://github.com/Ronitcloud/google-takeout-sanitizer/releases)
2. Run the installer
3. Launch the app

**macOS & Linux:**
Coming soon! (Or [build from source](#-for-developers))

### 2️⃣ Use the App

1. **Select Source Folder** → Choose your Google Takeout export
2. **Select Destination** → Choose where to save cleaned photos
3. **Click "Start Cleaning"** → Watch the magic happen!
4. **Enjoy** → Your photos are now organized in `YYYY/MM` folders

---

## ✨ Features

### 🎨 Modern Interface
- Beautiful dark theme with glassmorphism effects
- Real-time progress tracking
- Live statistics dashboard
- One-click operation - no command line needed

### 🔒 Privacy First
- ✅ **100% local processing** - your files never leave your computer
- ✅ **Zero data collection** - we don't track anything
- ✅ **No internet required** - works completely offline
- ✅ **Open source** - verify the code yourself

[Read our Privacy Policy](PRIVACY.md)

### 🚀 Performance
- Fast MD5-based deduplication
- EXIF-based timeline organization
- Efficient file processing
- Minimal memory footprint

---

## 📸 Screenshots

### Empty State — Ready to Use
![Main screen](docs/screenshots/screenshot-empty.png)

### Folders Selected — Ready to Clean
![Folders selected](docs/screenshots/screenshot-ready.png)

### Cleaning in Progress — Real-Time Stats
![Cleaning in progress](docs/screenshots/screenshot-progress.png)

### Results — 220MB Recovered!
![Results screen](docs/screenshots/screenshot-results.png)

---

## 🛠️ Tech Stack

Built with modern technologies:

- **Electron** - Cross-platform desktop framework
- **React** - Modern UI library
- **Vite** - Lightning-fast build tool
- **Node.js** - File system operations
- **EXIF Parser** - Photo metadata extraction

---

## 💡 Why I Built This

As a developer who uses Google Takeout regularly, I was frustrated by:
- Wasting 15GB of storage on metadata files
- Manually organizing thousands of photos
- Dealing with duplicate files

So I built **Takeout Cleaner Pro** to solve this problem once and for all.

This project showcases my skills in:
- 🖥️ Desktop application development (Electron)
- ⚛️ Modern UI/UX design (React)
- 📁 File system operations
- 🎨 Glassmorphism and modern design trends
- 🔧 Full-stack development

---

## 🤝 Support This Project

If this app saved you storage space and time, consider supporting development!

### 🌍 International — Ko-fi (PayPal / Card)

<a href="https://ko-fi.com/ronitcloud" target="_blank">
  <img src="https://ko-fi.com/img/githubbutton_sm.svg" alt="Support on Ko-fi" />
</a>

### 🇮🇳 India — Razorpay (UPI / Card / Net Banking)

> **No PayPal?** Indian users can now pay directly via **UPI, credit/debit card, or net banking** — no PayPal account needed!

[![Pay via Razorpay](https://img.shields.io/badge/Pay%20via-Razorpay%20🇮🇳-blue?style=for-the-badge)](https://razorpay.me/@ronit2322)

👉 **[https://razorpay.me/@ronit2322](https://razorpay.me/@ronit2322)**

**Other ways to support:**
- ⭐ Star this repository
- 🐛 Report bugs and suggest features
- 📢 Share with friends who use Google Takeout
- 💬 Leave feedback

---

## 🧑‍💻 For Developers

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org/))
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Ronitcloud/google-takeout-sanitizer.git
cd google-takeout-sanitizer

# Install dependencies
npm install

# Run in development mode
npm run dev
```

### Build from Source

```bash
# Build for Windows
npm run build:win

# Build for macOS
npm run build:mac

# Build for Linux
npm run build:linux
```

### Project Structure

```
├── src/
│   ├── core/          # Sanitizer logic
│   ├── main/          # Electron main process
│   └── renderer/      # React UI components
├── public/            # Icons and assets
├── scripts/           # Build scripts
└── package.json       # Dependencies
```

### Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📖 CLI Usage (Advanced)

The original CLI is still available for advanced users:

```bash
# Dry run (recommended first)
node index.js "./Takeout/Google Photos" "./Final_Gallery" --dry-run

# Actual cleanup
node index.js "./Takeout/Google Photos" "./Final_Gallery"
```

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

**TL;DR:** Free to use, modify, and distribute. No warranty provided.

---

## 👤 About the Developer

**Ronit Mehandiratta**  
Full Stack Developer | Open Source Enthusiast

- 🔗 [LinkedIn](https://www.linkedin.com/in/ronit-mehandiratta)
- 💻 [GitHub](https://github.com/Ronitcloud)
- ☕ [Support on Ko-fi](https://ko-fi.com/ronitcloud)

---

## ⚠️ Disclaimer

**Always backup your data before running any cleanup tool.** While this app is designed to be safe, mistakes can happen. Keep your original Takeout export until you verify the results.

---

## 🌟 Star History

If you find this project useful, please consider starring it! ⭐

---

## 📝 Changelog

### v2.0.0 (Latest)
- ✨ Complete UI redesign with modern glassmorphism
- 🎨 Real-time progress tracking
- 📊 Live statistics dashboard
- 🔧 Improved file processing
- 🌐 Cross-platform support

### v1.0.0
- 🎉 Initial CLI release
- 🧹 Basic sanitization features
- 🗑️ Deduplication support

---

## 🙏 Acknowledgments

- Google Takeout for providing data export functionality
- The Electron and React communities
- All contributors and users

---

**Made with ❤️ for people tired of messy Google Takeout exports**

---

## 🔗 Links

- [Report a Bug](https://github.com/Ronitcloud/google-takeout-sanitizer/issues/new?template=bug_report.md)
- [Request a Feature](https://github.com/Ronitcloud/google-takeout-sanitizer/issues/new?template=feature_request.md)
- [Privacy Policy](PRIVACY.md)
- [Contributing Guidelines](CONTRIBUTING.md)
