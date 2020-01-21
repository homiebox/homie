const { withHermes } = require('hermes-javascript')
const v3 = require('node-hue-api').v3;
const LightState = v3.lightStates.LightState;
//const wae = require("web-audio-engine");
const WavDecoder = require("wav-decoder");
//wae.decoder.set("wav", WavDecoder);


//****** Wave Decoder ******//

const fs = require("fs")
//const AudioContext = require("web-audio-engine").RenderingAudioContext;
const context = new window.AudioContext(); // définition du contexte audio WORKING WITH SNIPS BACKGROUND OK


const readFile = (filepath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, (err, buffer) => {
      if (err) {
        return reject(err);
      }
      return resolve(buffer);
    });
  });
};

const decodedWav = readFile("./games/ane.wav").then((buffer) => {
  return WavDecoder.decode(buffer);
}).then(function(audioData) {
  //console.log(audioData.sampleRate);
  //console.log(audioData.channelData[0]); // Float32Array
  //console.log(audioData.channelData[1]); // Float32Array
});

console.log(readFile);
var source = context.createBufferSource();
//const audioData =  fs.readFileSync("./games/ane.wav");
//source.buffer = decodedWav;
source.connect(context.destination);
source.start();

/*
context.decodeAudioData(audioData).then((audioBuffer) => {
  console.log(audioBuffer);
})
*/


/*
const audioData = fs.readFileSync("./games/ane.wav");

context.decodeAudioData(audioData).then((audioBuffer) => {
  console.log(audioBuffer);
});
*/

//context.pipe(new Speaker());
//context.resume();


//****** Philips Hue ******//

const USERNAME = 'q4lxCJTJLbCSdblLvrsaSrKax8ZPmcspO1vAv4NJ' //'your username to authenticating with the bridge'
  // The name of the light we wish to retrieve by name
  , LIGHT_ID = 2
;
const answerLightState = new LightState().off();

//****** Snips  ******//

withHermes(hermes => {
    const dialog = hermes.dialog()

    dialog.flow('MagicBoxEi2i:animals_playAgain',(msg, flow) => {
      console.log(msg)
      flow.end()
      return "Ok tu as mal entendu. Je remet une fois."
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
    if(msg.slots[0].value.value == 'lapin') {
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
