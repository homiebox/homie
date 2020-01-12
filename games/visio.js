const { withHermes } = require('hermes-javascript')

withHermes(hermes => {
    const dialog = hermes.dialog()
  
    dialog.flow('MagicBoxEi2i:home_goHome',(msg, flow) => {
      console.log(msg)
      flow.end()
      return "Veux tu arreter le jeu?"
    })

    dialog.flow('MagicBoxEi2i:home_stopGame',(msg, flow) => {
        console.log(msg)
        flow.end()
        return "Veux tu arreter cette partie?"
    })
  
    dialog.flow('MagicBoxEi2i:visio_turnOn',(msg, flow) => {
      console.log(msg)
      flow.end()
      return "Souriez vous êtes filmé"
    })

    dialog.flow('MagicBoxEi2i:visio_turnOff',(msg, flow) => {
        console.log(msg)
        flow.end()
        return "On coupe tout"
    })
})