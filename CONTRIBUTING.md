# Contributing to Takeout Cleaner Pro

First off, thank you for considering contributing to Takeout Cleaner Pro! 🎉

It's people like you that make this tool better for everyone.

## 🌟 Ways to Contribute

- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Submit code improvements
- 🎨 Enhance UI/UX
- 🧪 Write tests

## 🚀 Getting Started

### 1. Fork & Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/google-takeout-sanitizer.git
cd google-takeout-sanitizer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 4. Make Your Changes

- Write clean, readable code
- Follow the existing code style
- Test your changes thoroughly
- Update documentation if needed

### 5. Test

```bash
# Run the app in development mode
npm run dev

# Test the build
npm run build:win  # or build:mac, build:linux
```

### 6. Commit

Use clear, descriptive commit messages:

```bash
git commit -m "feat: add support for WebP images"
git commit -m "fix: resolve memory leak in file processing"
git commit -m "docs: update installation instructions"
```

**Commit message format:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### 7. Push & Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title describing the change
- Description of what you changed and why
- Screenshots (if UI changes)
- Reference any related issues

## 📋 Code Style Guidelines

### JavaScript/React

- Use ES6+ features
- Use functional components with hooks
- Keep components small and focused
- Use meaningful variable names
- Add comments for complex logic

```javascript
// Good
const handleFileSelection = async () => {
  const selectedPath = await selectFolder();
  setSourcePath(selectedPath);
};

// Avoid
const h = async () => {
  const p = await sf();
  sp(p);
};
```

### CSS

- Use CSS variables for colors and spacing
- Follow BEM naming convention when appropriate
- Keep selectors specific but not overly nested
- Use modern CSS features (flexbox, grid)

```css
/* Good */
.support-button {
  background: var(--accent-primary);
  padding: 0.6rem 1.2rem;
}

/* Avoid */
div button span {
  background: #00d9ff;
  padding: 10px 20px;
}
```

## 🐛 Reporting Bugs

Before creating a bug report, please check existing issues to avoid duplicates.

**When reporting bugs, include:**
- OS and version (Windows 11, macOS Sonoma, etc.)
- App version
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Error messages or console logs

Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md).

## 💡 Suggesting Features

We love feature suggestions! Before creating a feature request:
- Check if it's already been suggested
- Explain the use case clearly
- Describe the expected behavior

Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md).

## 🔧 Development Tips

### Project Structure

```
src/
├── core/              # Core sanitization logic
│   └── sanitizer.js   # Main processing functions
├── main/              # Electron main process
│   ├── main.js        # App entry point
│   ├── preload.js     # Preload script
│   └── ipc-handlers.js # IPC communication
└── renderer/          # React UI
    ├── App.jsx        # Main app component
    ├── components/    # UI components
    └── styles/        # CSS files
```

### Key Files

- `src/core/sanitizer.js` - File processing logic
- `src/main/main.js` - Electron main process
- `src/renderer/App.jsx` - Main React component
- `src/renderer/styles/App.css` - Styling

### Debugging

```bash
# Open DevTools in development
npm run dev
# Then: Ctrl+Shift+I (Windows/Linux) or Cmd+Option+I (Mac)
```

### Building

```bash
# Test production build
npm run build:win  # Creates installer in release/
```

## 📝 Documentation

When adding features:
- Update README.md if user-facing
- Add JSDoc comments for functions
- Update CHANGELOG.md

```javascript
/**
 * Processes a single image file
 * @param {string} filePath - Path to the image file
 * @param {Object} options - Processing options
 * @returns {Promise<Object>} Processing result
 */
async function processImage(filePath, options) {
  // ...
}
```

## ✅ Pull Request Checklist

Before submitting your PR, make sure:

- [ ] Code follows the style guidelines
- [ ] Self-review of code completed
- [ ] Comments added for complex logic
- [ ] Documentation updated (if needed)
- [ ] No new warnings or errors
- [ ] Tested on your platform
- [ ] Commit messages are clear
- [ ] PR description explains changes

## 🤝 Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## 📞 Questions?

- Open a [Discussion](https://github.com/Ronitcloud/google-takeout-sanitizer/discussions)
- Reach out on [LinkedIn](https://www.linkedin.com/in/ronit-mehandiratta)

## 🙏 Thank You!

Your contributions make this project better for everyone. Thank you for taking the time to contribute! ❤️

---

**Happy Coding!** 🚀
