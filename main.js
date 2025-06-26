// main.js

const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

// This function creates the main application window.
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      // The preload script is a security best-practice.
      // It allows secure communication between the main process (Node.js) and your webpage.
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // This line loads your app's HTML file into the window.
  win.loadFile('src/index.html');

  // Optional: Open the DevTools for debugging, you can comment this out later.
  // win.webContents.openDevTools();

  autoUpdater.checkForUpdatesAndNotify();
};

// This script will be run when your webpage has loaded.
// It's a secure bridge between Node.js and the web content.
// For now, it can be empty.
const createPreloadScript = () => {
    const fs = require('fs');
    if (!fs.existsSync(path.join(__dirname, 'preload.js'))) {
        fs.writeFileSync(path.join(__dirname, 'preload.js'), '// This file is a preload script. You can use it to securely expose Node.js APIs to your renderer process.');
    }
};

// Create the preload script file if it doesn't exist.
createPreloadScript();


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(() => {
  createWindow();

  // This is for macOS. If no windows are open, create a new one when the
  // dock icon is clicked.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
