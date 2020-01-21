const { withHermes } = require('hermes-javascript')
const v3 = require('node-hue-api').v3;
const LightState = v3.lightStates.LightState;

//****** Philips Hue ******//

const USERNAME =  'your username to authenticating with the bridge'
  // The name of the light we wish to retrieve by name
  , LIGHT_ID = 2
;

const MyLighState = new LightState();

v3.discovery.nupnpSearch()
  .then(searchResults => {
    const host = searchResults[0].ipaddress;
    return v3.api.createInsecureLocal(host).connect(USERNAME);
  })
  .then(api => {
    // Using a LightState object to build the desired state
    const state = new LightState()
      .on()
      .ct(200)
      .brightness(50)
    ;
    return api.lights.setLightState(LIGHT_ID, MyLighState);
  })
  .then(result => {
    console.log(`Light state change was successful? ${result}`);
  })
;


//****** from Snips  ******//

withHermes(hermes => {
  const dialog = hermes.dialog()

  dialog.flow('MagicBoxEi2i:theremin_addNode',(msg, flow) => {
      console.log(msg)
      flow.end()
      return "Très bien l'artiste. J'ajoute un biquoide. Mais comment t'es complétement glucose!"
  })

  dialog.flow('MagicBoxEi2i:teremin_changeFrequency',(msg, flow) => {
    console.log(msg)
    flow.end()
    return "OK chef! C'est compris chef! Bon et bien go! Je modifie la fréquence de l'oscillo à 100 Hertz. "
  })

  dialog.flow('MagicBoxEi2i:theremin_generate',(msg, flow) => {
      console.log(msg)
      flow.end()
      oscillator1.type = "square";
      //MyLighState.sat(500);
      v3.lightStates
      return "Ouaaah! Tellement glucose! Il a demandé une forme d'onde " + msg.slots[0].value.value + "."
  })

  dialog.flow('MagicBoxEi2i:theremin_tune',(msg, flow) => {
    console.log(msg)
    flow.end()
    return "Je change la tonalité de X tons X octaves"
  })

  dialog.flow('MagicBoxEi2i:theremin_mute',(msg, flow) => {
    console.log(msg)
    flow.end()
    return "Ok tranquille j'arretes c'est bon"
  })


})

//****** Synth Game ******//

//const Speaker = require("speaker");
var context = new window.AudioContext(); // définition du contexte audio WORKING WITH SNIPS BACKGROUND OK

//****** Demo 2 (web-audio-engine) ******//

//module.exports = function(context) {
  // +---------------+   +---------------+
  // | oscillator1   |   | oscillator2   |
  // +---------------+   +---------------+
  //         |                   |
  //         |           +---------------+
  //         |           | gain2         |
  //         |           +---------------+
  //         |                   |
  // +---------------+           |
  // | biquadFilter  |           |
  // | * frequency <-------------+
  // +---------------+
  //         |
  // +---------------+
  // | gain1         |
  // +---------------+
  var oscillator1 = context.createOscillator();
  var biquadFilter = context.createBiquadFilter();
  var gain1 = context.createGain();
  var oscillator2 = context.createOscillator();
  var gain2 = context.createGain();


  oscillator1.type = "sine";
  oscillator1.frequency.value = 500 ;
  oscillator1.start();
  oscillator1.connect(biquadFilter);

  biquadFilter.type = "lowpass";
  biquadFilter.frequency.value = 400;
  biquadFilter.connect(gain1);

  //gain1.gain.value = 0.25;
  gain1.connect(context.destination);

  oscillator2.type = "sine";
  oscillator2.frequency.value = 5;
  oscillator2.start();
  oscillator2.connect(gain2);


  gain2.gain.value = 400;
  gain2.connect(biquadFilter.frequency);


//****** Odas ******//

var elevation;
var azimut;

// Add listener for tracking
document.addEventListener('tracking', function(e) {

  currentFrame.sources.forEach(function(source) {

      if (source.index == 0) {
      elevation = Math.asin(source.z) * 180 / Math.PI;
      azimut = Math.atan2(source.y, source.x) * 180 / Math.PI;

      oscillator1.frequency.value = Math.trunc((azimut + 360) * 1.5) ;
      oscillator2.frequency.value = Math.trunc(elevation / 10);
      //gain1.gain.value = Math.trunc(angleZ / 10);
    
      //MyLightState.sat(angle); 

      console.log('Fréquence osc 1: ', oscillator1.frequency.value);
      console.log('Fréquence osc 2: ', oscillator2.frequency.value);
      }
  });
});

// Set the output for audio streaming
//context.pipe(process.stdout);

// If you want to playback sound directly in this process, you can use 'node-speaker'.
//context.pipe(new Speaker());
 
// Start to render audio
//context.resume();
 
// composeWith(context);

