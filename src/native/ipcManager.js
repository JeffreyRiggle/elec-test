const {ipcMain} = require('electron');
const path = require('path');
const systemTray = require('./systemTrayManager.js');
const dialogManager = require('./dialogManager.js');

function trayItemClicked(event, id) {
    return function() {
        event.sender.send(`tray${id}click`);
    }
}

const start = () => {
    ipcMain.on('tray', (event, tray) => {
        tray.item.click = trayItemClicked(event, tray.id);

        if (tray.item.icon) {
            tray.item.icon = path.join(__dirname, `../../${tray.item.icon}`);
        }

        systemTray.addMenuItem(tray.id, tray.item);
    });

    ipcMain.on('messageDialog', (event, message) => {
        dialogManager.showMessage(message);
    });

    ipcMain.on('errorDialog', (event, message) => {
        dialogManager.showError(message);
    });
};

module.exports = {
    start
};