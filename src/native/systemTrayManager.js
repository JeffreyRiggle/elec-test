const {Tray, Menu} = require('electron');
const path = require('path');

let tray;
let menuItems = new Map();
let icon = '';

function createTray() {
    tray = new Tray(icon);
}
const setIcon = (ico) => {
    icon = ico;
    createTray();
};

const onClick = (action) => {
    if (!tray) {
        createTray();
    }

    tray.on('click', action);
};

const setTooltip = (tooltip) => {
    if (!tray) {
        createTray();
    }

    tray.setToolTip(tooltip);
};

const addMenuItem = (id, item) => {
    menuItems.set(id, item);
    updateMenu();
};

const removeMenuItem = (id) => {
    menuItems.delete(id);
    updateMenu();
};

function updateMenu() {
    if (!tray) {
        createTray();
    }

    let items = [];
    menuItems.forEach((value, key, m) => {
        items.push(value);
    
    });

    tray.setContextMenu(Menu.buildFromTemplate(items));
};

module.exports = {
    setIcon,
    onClick,
    setTooltip,
    addMenuItem,
    removeMenuItem
};