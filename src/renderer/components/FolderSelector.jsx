import React from 'react';

function FolderSelector({ label, placeholder, value, onSelect }) {
  return (
    <div className="folder-selector">
      <label>{label}</label>
      <div className="folder-input-group">
        <div className={`folder-path ${value ? 'selected' : ''}`}>
          {value || placeholder}
        </div>
        <button className="btn-select" onClick={onSelect}>
          Browse
        </button>
      </div>
    </div>
  );
}

export default FolderSelector;
