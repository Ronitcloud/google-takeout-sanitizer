import React from 'react';

function ActionButton({ onClick, disabled, isProcessing }) {
  return (
    <button
      className={`action-button ${isProcessing ? 'processing' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {isProcessing ? (
        <span className="processing-indicator">🔄 Cleaning in Progress...</span>
      ) : (
        '🚀 Start Cleaning'
      )}
    </button>
  );
}

export default ActionButton;
