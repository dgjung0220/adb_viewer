'use strict'

const electron = require('electron');
const app = electron.app;

const BrowserWindow = electron.BrowserWindow;

const locals = {};
const pug = require('electron-pug')({pretty: true, locals});

const path = require('path');
const url = require('url');

let mainWindow;

var createWindow = () => {
    mainWindow = new BrowserWindow({width : 1200, height : 600});

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.pug'),
        protocol: 'file:',
        slashes: true
    }))

    //mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
    
app.on('activate', function() {
    if (mainWindow === null) {
        createWindow();
    }
})