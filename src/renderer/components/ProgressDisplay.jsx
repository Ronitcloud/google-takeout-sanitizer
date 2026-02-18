import React from 'react';

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function ProgressDisplay({ progress, stats, currentFile }) {
  return (
    <div className="progress-container">
      <div className="progress-bar-wrapper">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="progress-text">
        {currentFile && `Processing: ${currentFile}`}
      </div>
      
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-label">Files Processed</div>
          <div className="stat-value">{stats.processed.toLocaleString()}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">JSONs Deleted</div>
          <div className="stat-value">{stats.jsonsDeleted.toLocaleString()}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Duplicates Removed</div>
          <div className="stat-value">{stats.duplicatesDeleted.toLocaleString()}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Space Saved</div>
          <div className="stat-value">{formatBytes(stats.savedSize)}</div>
        </div>
      </div>
    </div>
  );
}

export default ProgressDisplay;
