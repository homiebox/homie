const electron = require('electron')
//const { withHermes } = require('hermes-javascript')

// Module to control application life.
const app = electron.app
app.commandLine.appendSwitch('--ignore-gpu-blacklist');   // Allows Web GL on Ubuntu

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let homie = {}

function createWindow () {

  // Create the browser window.
  homie.mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
              webgl: true,
              nodeIntegration : true
    },
    icon: path.join(__dirname, 'resources/img/homie_logo.png'),
    show: false
  })


  // and load the index.html of the app.
  homie.mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'homie_views_test/accueil.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  homie.mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    homie.mainWindow = null
    record.quit()
    app.quit()
  })

  homie.mainWindow.on('ready-to-show', function() {
    homie.mainWindow.show()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (homie.mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const sockets = require('./resources/odas_web/servers.js')
//const record = require('./resources/odas_web/record.js')
require('./resources/odas_web/share.js')
require('./resources/odas_web/configure.js')
homie.odas = require('./resources/odas_web/odas.js')

sockets.startTrackingServer(homie)
sockets.startPotentialServer(homie)

//****** HOMIE games ******//

require('./homie.js')
require('./games/dev.js')
require('./games/pendu.js')