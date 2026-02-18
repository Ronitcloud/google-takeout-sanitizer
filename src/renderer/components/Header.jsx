import React from 'react';
import SupportButton from './SupportButton';
import AboutModal from './AboutModal';

function Header() {
  return (
    <div className="header">
      <div className="header-content">
        <h1>
          🧹 Takeout Cleaner Pro
        </h1>
        <p>Recover 15GB of storage automatically</p>
      </div>
      <div className="header-actions">
        <SupportButton />
        <AboutModal />
      </div>
    </div>
  );
}

export default Header;
