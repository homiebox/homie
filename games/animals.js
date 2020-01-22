const { withHermes } = require('hermes-javascript')
const v3 = require('node-hue-api').v3;
const LightState = v3.lightStates.LightState;
const player = require('node-wav-player');

//****** Philips Hue ******//

const USERNAME = 'q4lxCJTJLbCSdblLvrsaSrKax8ZPmcspO1vAv4NJ' //'your username to authenticating with the bridge'
  // The name of the light we wish to retrieve by name
  , LIGHT_ID = 2
;
const answerLightState = new LightState().off();


//****** Node wav player ******//

var animalBuffer = ['canard','chat','cheval','mouton','vache'];
var min = 0;
var max = 4;
var tmp = 0;

//****** Snips  ******//

withHermes(hermes => {
    const dialog = hermes.dialog()

    dialog.flow('MagicBoxEi2i:animals_play',(msg, flow) => {
      console.log(msg)
      flow.end()
      player.play({
        path: './resources/audio/animals/'+animalBuffer[tmp = Math.floor(Math.random() * (max - min + 1)) + min]+'.wav',
      }).then(() => {
        console.log('The wav file started to be played successfully.');
      }).catch((error) => {
        console.error(error);
      });
      return null
    })

    dialog.flow('MagicBoxEi2i:animals_playAgain',(msg, flow) => {
      console.log(msg)
      flow.end()
      return "Ok tu as mal entendu. Je remet une fois."
    })

    //****** Answer compare ******//
    dialog.flow('MagicBoxEi2i:animals_whichAnimal',(msg, flow) => {
      console.log(msg)
      flow.end()

      // If true
    if(msg.slots[0].value.value == animalBuffer[tmp]) {
      answerLightState.on().ct(500).rgb(0,254,0);
      //****** Philips Hue ******//
      v3.discovery.nupnpSearch()
      .then(searchResults => {
        const host = searchResults[0].ipaddress;
        return v3.api.createInsecureLocal(host).connect(USERNAME);
      })
      .then(api => {
        return api.lights.setLightState(LIGHT_ID, answerLightState);
      })
      .then(result => {
        console.log(`Light state change TRUE ${result}`);
      });
      //****** Hue End******//
      return "Oui bravoo, tu es trop fort dis donc! On passe au suivant? Tu es pret? 3. 2. 1."
    }

    //If false
    else
      answerLightState.on().ct(500).rgb(254,0,0);
      //****** Philips Hue ******//
      v3.discovery.nupnpSearch()
      .then(searchResults => {
        const host = searchResults[0].ipaddress;
        return v3.api.createInsecureLocal(host).connect(USERNAME);
      })
      .then(api => {
        return api.lights.setLightState(LIGHT_ID, answerLightState);
      })
      .then(result => {
        console.log(`Light state change FALSE ${result}`);
      });
      //****** Hue End******//
      return "Et non ça n'est pas ça. Concentre toi, et écoute bien. Je suis sûre que tu vas trouver"
    })
})


//****** Philips Hue ******//
  v3.discovery.nupnpSearch()
 .then(searchResults => {
  const host = searchResults[0].ipaddress;
  return v3.api.createInsecureLocal(host).connect(USERNAME);
 })
.then(api => {
  return api.lights.setLightState(LIGHT_ID, answerLightState);
 })
.then(result => {
 console.log(`EOF light state change ${result}`);
});
//****** Hue End******//
