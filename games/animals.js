const { withHermes } = require('hermes-javascript')
const v3 = require('node-hue-api').v3;
const LightState = v3.lightStates.LightState;


//****** Philips Hue ******//

const USERNAME = 'q4lxCJTJLbCSdblLvrsaSrKax8ZPmcspO1vAv4NJ' //'your username to authenticating with the bridge'
  // The name of the light we wish to retrieve by name
  , LIGHT_ID = 2
;

v3.discovery.nupnpSearch()
  .then(searchResults => {
    const host = searchResults[0].ipaddress;
    return v3.api.createInsecureLocal(host).connect(USERNAME);
  })
  .then(api => {
    // Using a LightState object to build the desired state
    const state = new LightState()
      .on()
      .ct(450)
      .brightness(50)
    ;
    return api.lights.setLightState(LIGHT_ID, state);
  })
  .then(result => {
    console.log(`Light state change was successful? ${result}`);
  })
;

//****** Snips  ******//

withHermes(hermes => {
    const dialog = hermes.dialog()

    dialog.flow('MagicBoxEi2i:animals_playAgain',(msg, flow) => {
      console.log(msg)
      flow.end()
      return "Ok tu as mal entendu. Je remet une fois."
    })

    dialog.flow('MagicBoxEi2i:animals_whichAnimal',(msg, flow) => {
      console.log(msg)
      flow.end()
      return "Oui bravoo, tu es trop fort dis donc! On passe au suivant? Tu es pret? 3. 2. 1."
    })

})