import React, { useState } from 'react';

function AboutModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openLink = (url) => {
    if (window.electron) {
      window.electron.openExternal(url);
    }
  };

  if (!isOpen) {
    return (
      <button className="about-button" onClick={() => setIsOpen(true)} title="About this app">
        ℹ️
      </button>
    );
  }

  return (
    <div className="modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setIsOpen(false)}>×</button>
        
        <h2>🧹 Takeout Cleaner Pro</h2>
        <p className="version">Version 2.0.0</p>
        
        <div className="modal-section">
          <h3>About This App</h3>
          <p>
            A professional desktop app that recovers 15GB of storage automatically 
            by cleaning Google Photos Takeout exports. Removes JSON/HTML clutter, 
            merges edited versions, deduplicates files, and organizes photos into 
            a clean timeline structure.
          </p>
        </div>

        <div className="modal-section">
          <h3>Developer</h3>
          <p><strong>Ronit Mehandiratta</strong></p>
          <p>Full Stack Developer</p>
          <div className="developer-links">
            <button 
              className="link-button" 
              onClick={() => openLink('https://www.linkedin.com/in/ronit-mehandiratta')}
            >
              🔗 LinkedIn
            </button>
            <button 
              className="link-button" 
              onClick={() => openLink('https://github.com/Ronitcloud')}
            >
              🔗 GitHub
            </button>
            <button 
              className="link-button" 
              onClick={() => openLink('https://github.com/Ronitcloud/google-takeout-sanitizer')}
            >
              🔗 Source Code
            </button>
          </div>
        </div>

        <div className="modal-section">
          <h3>Tech Stack</h3>
          <div className="tech-stack">
            <span className="tech-badge">Electron</span>
            <span className="tech-badge">React</span>
            <span className="tech-badge">Node.js</span>
            <span className="tech-badge">Vite</span>
          </div>
        </div>

        <div className="modal-section">
          <h3>Privacy</h3>
          <p>
            ✅ 100% local processing<br/>
            ✅ Zero data collection<br/>
            ✅ No internet required<br/>
            ✅ Your files never leave your computer
          </p>
        </div>

        <div className="modal-section support-section">
          <h3>Support This Project</h3>
          <p>If this app saved you storage space, consider supporting development!</p>
          <button 
            className="support-button-large" 
            onClick={() => openLink('https://ko-fi.com/ronitcloud')}
          >
            ☕ Support on Ko-fi
          </button>
        </div>

        <div className="modal-footer">
          <p>Made with ❤️ for people tired of messy Google Takeout exports</p>
          <p className="license">MIT License • Free & Open Source</p>
        </div>
      </div>
    </div>
  );
}

export default AboutModal;
