const { ipcMain, dialog, shell } = require('electron');
const path = require('path');
const { sanitize } = require(path.join(__dirname, '../core/sanitizer'));
const { app } = require('electron');

function setupIpcHandlers(mainWindow) {
  // Folder selection dialog
  ipcMain.handle('select-folder', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
    });
    
    if (result.canceled) {
      return null;
    }
    return result.filePaths[0];
  });

  // Start sanitization process
  ipcMain.handle('start-sanitize', async (event, sourceDir, destDir, options) => {
    try {
      const stats = await sanitize(sourceDir, destDir, {
        ...options,
        onProgress: (progressData) => {
          // Send progress updates to renderer
          mainWindow.webContents.send('sanitize-progress', progressData);
        },
      });
      
      return { success: true, stats };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });

  // Open folder in file explorer
  ipcMain.handle('open-folder', async (event, folderPath) => {
    await shell.openPath(folderPath);
  });

  // Open external URL in default browser
  ipcMain.handle('open-external', async (event, url) => {
    await shell.openExternal(url);
  });

  // Get app version
  ipcMain.handle('get-version', () => {
    return app.getVersion();
  });
}

module.exports = { setupIpcHandlers };
