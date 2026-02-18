import React from 'react';

function SupportButton() {
  const handleSupport = () => {
    // Open Ko-fi link in external browser
    if (window.electron) {
      window.electron.openExternal('https://ko-fi.com/ronitcloud');
    }
  };

  return (
    <button className="support-button" onClick={handleSupport} title="Support this project">
      <span className="support-icon">☕</span>
      <span className="support-text">Support</span>
    </button>
  );
}

export default SupportButton;
