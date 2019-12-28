const electron = require('electron');
const { withHermes } = require('hermes-javascript')

//const spawn = require('child_process').spawn;
//const path = require('path')
//const url = require('url')

//const BrowserWindow = electron.BrowserWindow;
//const ipcMain = electron.ipcMain;

// Snips tests
withHermes(hermes => {
    const dialog = hermes.dialog()
  
    dialog.flow('MagicBoxEi2i:turnOn',(msg, flow) => {
      console.log(msg)
      flow.end()
      return "Homie lights goes on! (forked)"
    })
  
    dialog.flow('turnOff',(msg, flow) => {
      console.log(msg)
      flow.end()
      return "Homie lights goes off!"
    })  
})