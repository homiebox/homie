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
  
    dialog.flow('MagicBoxEi2i:robot_follow',(msg, flow) => {
      console.log(msg)
      flow.end()
      return "Ok je te suis"
    })

    dialog.flow('MagicBoxEi2i:robot_stop',(msg, flow) => {
        console.log(msg)
        flow.end()
        return "Très bien, je coupe le moteur"
    })

    dialog.flow('MagicBoxEi2i:robot_go',(msg, flow) => {
        console.log(msg)
        flow.end()
        return "D'accord j'arrive"
    })
    
})