const {dialog} = require('electron');

let win;

const setWindow = (window) => {
    win = window;
};

const showMessage = (item) => {
    dialog.showMessageBox(win, item);
};

const showError = (item) => {
    dialog.showErrorBox(win, item);
};

module.exports = {
    setWindow,
    showMessage,
    showError
};