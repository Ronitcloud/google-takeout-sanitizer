import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FolderSelector from './components/FolderSelector';
import ActionButton from './components/ActionButton';
import ProgressDisplay from './components/ProgressDisplay';
import ResultsSummary from './components/ResultsSummary';

function App() {
  const [sourceFolder, setSourceFolder] = useState('');
  const [destFolder, setDestFolder] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stats, setStats] = useState({
    processed: 0,
    jsonsDeleted: 0,
    originalsReplaced: 0,
    duplicatesDeleted: 0,
    moved: 0,
    savedSize: 0,
  });
  const [currentFile, setCurrentFile] = useState('');

  useEffect(() => {
    // Listen for progress updates from main process
    if (window.electron) {
      window.electron.onProgress((data) => {
        if (data.type === 'progress') {
          setStats(data.stats);
          setCurrentFile(data.currentFile || '');
          // Calculate progress percentage
          const total = data.stats.processed + data.stats.moved;
          setProgress(Math.min(total / 10, 100)); // Rough estimate
        } else if (data.type === 'complete') {
          setStats(data.stats);
          setIsProcessing(false);
          setIsComplete(true);
          setProgress(100);
        }
      });
    }
  }, []);

  const handleSelectSource = async () => {
    const folder = await window.electron.selectFolder();
    if (folder) {
      setSourceFolder(folder);
    }
  };

  const handleSelectDest = async () => {
    const folder = await window.electron.selectFolder();
    if (folder) {
      setDestFolder(folder);
    }
  };

  const handleStart = async () => {
    if (!sourceFolder || !destFolder) {
      alert('Please select both source and destination folders');
      return;
    }

    setIsProcessing(true);
    setIsComplete(false);
    setProgress(0);
    setStats({
      processed: 0,
      jsonsDeleted: 0,
      originalsReplaced: 0,
      duplicatesDeleted: 0,
      moved: 0,
      savedSize: 0,
    });

    const result = await window.electron.startSanitize(sourceFolder, destFolder, {
      deleteJson: true,
      dryRun: false,
    });

    if (!result.success) {
      alert(`Error: ${result.error}`);
      setIsProcessing(false);
    }
  };

  const handleOpenFolder = () => {
    window.electron.openFolder(destFolder);
  };

  const handleReset = () => {
    setIsComplete(false);
    setProgress(0);
    setStats({
      processed: 0,
      jsonsDeleted: 0,
      originalsReplaced: 0,
      duplicatesDeleted: 0,
      moved: 0,
      savedSize: 0,
    });
  };

  return (
    <div className="app">
      <Header />
      
      {!isComplete ? (
        <>
          <div className="card">
            <FolderSelector
              label="📁 Source Folder"
              placeholder="Select your Google Takeout folder..."
              value={sourceFolder}
              onSelect={handleSelectSource}
            />
            <FolderSelector
              label="📂 Destination Folder"
              placeholder="Select where to save cleaned photos..."
              value={destFolder}
              onSelect={handleSelectDest}
            />
          </div>

          <ActionButton
            onClick={handleStart}
            disabled={!sourceFolder || !destFolder || isProcessing}
            isProcessing={isProcessing}
          />

          {isProcessing && (
            <div className="card">
              <ProgressDisplay
                progress={progress}
                stats={stats}
                currentFile={currentFile}
              />
            </div>
          )}
        </>
      ) : (
        <div className="card">
          <ResultsSummary
            stats={stats}
            onOpenFolder={handleOpenFolder}
            onReset={handleReset}
          />
        </div>
      )}
    </div>
  );
}

export default App;
