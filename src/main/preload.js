const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  // Folder selection
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  
  // Start sanitization
  startSanitize: (sourceDir, destDir, options) => 
    ipcRenderer.invoke('start-sanitize', sourceDir, destDir, options),
  
  // Listen to progress updates
  onProgress: (callback) => {
    ipcRenderer.on('sanitize-progress', (event, data) => callback(data));
  },
  
  // Open folder in file explorer
  openFolder: (folderPath) => ipcRenderer.invoke('open-folder', folderPath),
  
  // Open external URL in default browser
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  
  // Get app version
  getVersion: () => ipcRenderer.invoke('get-version'),
});
