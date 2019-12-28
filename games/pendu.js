const electron = require('electron');
const { withHermes } = require('hermes-javascript')

withHermes(hermes => {
    const dialog = hermes.dialog()
  
    dialog.flow('MagicBoxEi2i:home_goHome',(msg, flow) => {
      console.log(msg)
      flow.end()
      return "Homie go home"
    })

    dialog.flow('MagicBoxEi2i:home_stopGame',(msg, flow) => {
        console.log(msg)
        flow.end()
        return "Homie fin du game wesh"
    })
  
    dialog.flow('MagicBoxEi2i:hangman_whichLetter',(msg, flow) => {
      console.log(msg)
      flow.end()
      return "Ta lettre est"
    })

    dialog.flow('MagicBoxEi2i:hangman_whichWord',(msg, flow) => {
        console.log(msg)
        flow.end()
        return "Ton mot est"
    })
})
  