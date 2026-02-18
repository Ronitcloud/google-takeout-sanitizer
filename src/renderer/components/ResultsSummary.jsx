import React from 'react';

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function ResultsSummary({ stats, onOpenFolder, onReset }) {
  return (
    <div className="results-summary">
      <h2>✅ Cleaning Complete!</h2>
      <div className="highlight">{formatBytes(stats.savedSize)}</div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Storage space recovered
      </p>

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
          <div className="stat-label">Edits Merged</div>
          <div className="stat-value">{stats.originalsReplaced.toLocaleString()}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Duplicates Removed</div>
          <div className="stat-value">{stats.duplicatesDeleted.toLocaleString()}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Photos Organized</div>
          <div className="stat-value">{stats.moved.toLocaleString()}</div>
        </div>
      </div>

      <button className="btn-open-folder" onClick={onOpenFolder}>
        📂 Open Cleaned Folder
      </button>
      <button 
        className="btn-select" 
        onClick={onReset}
        style={{ marginTop: '1rem', width: '100%' }}
      >
        🔄 Clean Another Folder
      </button>
    </div>
  );
}

export default ResultsSummary;
