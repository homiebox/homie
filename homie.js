const electron = require('electron');
const { withHermes } = require('hermes-javascript')

//****** HOMIE ******//

withHermes(hermes => {
    const dialog = hermes.dialog()
  
    dialog.flow('MagicBoxEi2i:home_goHome',(msg, flow) => {
      console.log(msg)
      flow.end()
      return "On arrete le jeu?"
    })

    dialog.flow('MagicBoxEi2i:home_stopGame',(msg, flow) => {
        console.log(msg)
        flow.end()
        return "Veux tu arreter cette partie?"
    })

    /* Open a Game */
    dialog.flow('MagicBoxEi2i:home_openGame',(msg, flow) => {
      console.log(msg.slots[0].value.value)
      flow.end()
      return "D'accord, j'ouvre le jeu de " + msg.slots[0].value.value + "."
    })

    dialog.flow('MagicBoxEi2i:home_startWizard',(msg, flow) => {
      console.log(msg)
      flow.end()
      return "Je lance l'assistant de configuration"
    })

    dialog.flow('MagicBoxEi2i:wizard_yesNo',(msg, flow) => {
      console.log(msg)
      flow.end()
      return "Vous avez repondu "+ msg.slots[0].value.value +"."
    })

    dialog.flow('MagicBoxEi2i:wizard_previous',(msg, flow) => {
      console.log(msg)
      flow.end()
      return "Ok je retourne en arriere"
    })

    dialog.flow('MagicBoxEi2i:wizard_next',(msg, flow) => {
      console.log(msg)
      flow.end()
      return "Ok page suivante"
    })

    dialog.flow('MagicBoxEi2i:wizard_finish',(msg, flow) => {
      console.log(msg)
      flow.end()
      return "Très bien, configuration terminée"
    })


})