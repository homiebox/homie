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

  dialog.flow('MagicBoxEi2i:synth_play',(msg, flow) => {
    console.log(msg)
    flow.end()
    return "D'accord je joue le morceau"
  })

  dialog.flow('MagicBoxEi2i:synth_generate',(msg, flow) => {
      console.log(msg)
      flow.end()
      oscillator1.type = "square";
      //MyLighState.sat(500);
      v3.lightStates
      return "L'oscillateur génère une onde de forme " + msg.slots[0].value.value + "."
  })

  dialog.flow('MagicBoxEi2i:synth_pitch',(msg, flow) => {
    console.log(msg)
    flow.end()
    return "Je change la tonalité de X tons X octaves"
})
})

//****** Synth Game ******//

const Speaker = require("speaker");
var context = new window.AudioContext(); // définition du contexte audio WORKING WITH SNIPS BACKGROUND OK

//****** Demo 1 (web-audio-engine) ******//
/*
const osc = context.createOscillator();
const amp = context.createGain();

osc.type = "square";
osc.frequency.setValueAtTime(987.7666, 0);
osc.frequency.setValueAtTime(1318.5102, 0.075);
osc.frequency.setValueAtTime(440, 1);
osc.start(0);
osc.stop(2);
osc.connect(amp);
/*
osc.onended = () => {
  context.close().then(() => {
    process.exit(0);
  });
};
*/
 /*
amp.gain.setValueAtTime(0.25, 0);
amp.gain.setValueAtTime(0.25, 0.075);
amp.gain.linearRampToValueAtTime(0, 2);
amp.connect(context.destination);
*/
//****** End Demo 1 ******//

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


  oscillator1.type = "sawtooth";
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

  //****** from Odas ******//

  var angle;

  // Add listener for DoA 
  document.addEventListener('tracking', function(e) {

    // Update source
    currentFrame.sources.forEach(function(source,index) {
        angleX = source.x;
        angleY = source.y;
        angleZ = source.z;
        //console.log(angleX, angleY, angleZ);
    });
    

    oscillator1.frequency.value = (angleX + 2) * 100;
    gain1.gain.value = (angleZ + 2);
    oscillator2.frequency.value = (angleY + 2);
    
    //MyLightState.sat(angle);  
});

//****** End Demo 2 ******//

console.log('******synthTest End******');


// Set the output for audio streaming
//context.pipe(process.stdout);

// If you want to playback sound directly in this process, you can use 'node-speaker'.
context.pipe(new Speaker());
 
// Start to render audio
context.resume();
 
// composeWith(context);

