const electron = require('electron');
const { withHermes } = require('hermes-javascript')

const ipcRenderer = require('electron').ipcRenderer

withHermes(hermes => {
    const dialog = hermes.dialog()
  
    dialog.flow('MagicBoxEi2i:home_goHome',(msg, flow) => {
      console.log(msg)
      flow.end()
      return "Homie go home"
    })
  
    dialog.flow('MagicBoxEi2i:dev_quelAngle',(msg, flow) => {
      console.log(msg)
      flow.end()
      return "Ton angle est de X degrés"
    })
  })
  



