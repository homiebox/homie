const electron = require('electron')
const { withHermes } = require('hermes-javascript')

// Module to control application life.
const app = electron.app
app.commandLine.appendSwitch('--ignore-gpu-blacklist');   // Allows Web GL on Ubuntu

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let odasStudio = {}

function createWindow () {

  // Create the browser window.
  odasStudio.mainWindow = new BrowserWindow({
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
  odasStudio.mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'homie_views_test/accueil.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  odasStudio.mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    odasStudio.mainWindow = null
    record.quit()
    app.quit()
  })

  odasStudio.mainWindow.on('ready-to-show', function() {
    odasStudio.mainWindow.show()
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
  if (odasStudio.mainWindow === null) {
    createWindow()
  }
})

// Snips test Philips Hue Lights 
withHermes(hermes => {
  const dialog = hermes.dialog()

  dialog.flow('turnOn',(msg, flow) => {
    console.log(msg)
    flow.end()
    return "Homie lights goes on!"
  })

  dialog.flow('turnOff',(msg, flow) => {
    console.log(msg)
    flow.end()
    return "Homie lights goes off!"
  })
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const sockets = require('./servers.js')
const record = require('./record.js')
require('./share.js')
require('./configure.js')
odasStudio.odas = require('./odas.js')

sockets.startTrackingServer(odasStudio)
sockets.startPotentialServer(odasStudio)