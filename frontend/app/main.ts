import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

let win: BrowserWindow | null = null;
let pythonProcess: ChildProcessWithoutNullStreams | null = null;

const args = process.argv.slice(1);
const serve = args.some(val => val === '--serve')

function createWindow(): BrowserWindow {
  const size = screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve),
      contextIsolation: false,
    },
  });
  win.maximize();

  if (serve) {
    require('electron-reloader')(module);
    win.loadURL('http://localhost:4200');
  } else {
    let pathIndex = './index.html';
    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
      pathIndex = '../dist/index.html';
    }
    win.loadURL(new URL(path.join('file:', __dirname, pathIndex)).href);
  }

  win.on('closed', () => {
    win = null;
  });

  return win;
}

function startPythonExecutable() {
  const pythonExecutablePathDev = path.join(__dirname, '..', 'python', 'app.exe');
  //console.log(__dirname)
  //console.log(`Attempting to spawn python process at: ${pythonExecutablePathDev}`);
  pythonProcess = spawn(pythonExecutablePathDev);
}

app.on('ready', () => {
  setTimeout(createWindow, 400);
  startPythonExecutable();
});


app.on('will-quit', async () => {
  if (pythonProcess && !pythonProcess.killed) {
    try {
      const response = await fetch('http://127.0.0.1:5000/shutdown', {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      pythonProcess.kill();
    } catch (error) {
      console.error('Error al intentar cerrar el servidor Flask:', error);
    }
  }
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

ipcMain.on('close-window', () => {
  if (win) {
    win.close();
  }
});
