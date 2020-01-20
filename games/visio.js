const { withHermes } = require('hermes-javascript')

withHermes(hermes => {
    const dialog = hermes.dialog()

    dialog.flow('MagicBoxEi2i:visio_anotherPicture',(msg, flow) => {
      console.log(msg)
      flow.end()
      return "Allez. C'est reparti. Pret? 3. 2. 1."
  })

    dialog.flow('MagicBoxEi2i:visio_turnOff',(msg, flow) => {
        console.log(msg)
        flow.end()
        return "OK. D'accord. On coupe tout. Les acteurs sont fatigués."
    })
})