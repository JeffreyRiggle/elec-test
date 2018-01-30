const {app, BrowserWindow, Menu, Tray, dialog, remote, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const systemTray = require(path.resolve('src/native/systemTrayManager.js'));

let win, tray;

function createWindow() {
    win = new BrowserWindow({width: 800, height: 600});

    // Remove the application menu
    Menu.setApplicationMenu(null);

    win.loadURL(url.format({
        pathname: path.join(__dirname, './build/index.html'),
        protocol: 'file',
        slashes: true
    }));

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });

    setupSysTray();
    setupPowerListeners();
};

function setupPowerListeners() {
    let {powerMonitor} = require('electron');

    powerMonitor.on('suspend', () => {
        console.log('application going to sleep');
    });

    powerMonitor.on('resume', () => {
        console.log('application resuming');
    });
};

function setupSysTray() {
    systemTray.setIcon(path.join(__dirname, 'icon.png'));
    systemTray.onClick(() => {
        win.show();
    });

    systemTray.setTooltip('Electron test application');

    systemTray.addMenuItem('Test', {
        label: 'Test',
        submenu: [
            {
                label: 'Test Item 1',
                click: () => {
                    dialog.showMessageBox(win, {
                        title: 'Context Click',
                        message: 'Item 1 pressed'
                    });
                }
            },
            {
                label: 'Test Item 2',
                click: () => {
                    dialog.showMessageBox(win, {
                        title: 'Context Click',
                        message: 'Item 2 pressed'
                    });
                }
            },
            {
                label: 'Test Item 3',
                click: () => {
                    dialog.showMessageBox(win, {
                        title: 'Context Click',
                        message: 'Item 3 pressed'
                    });
                }
            }
        ]
    });

    systemTray.addMenuItem('Exit', {
        label: 'Exit',
        click: () => {
            app.quit();
        }
    });

    ipcMain.on('tray', (event, tray) => {
        systemTray.addMenuItem(tray.id, tray.item);
    });
};

app.on('ready', createWindow);

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