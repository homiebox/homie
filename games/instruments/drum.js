const { withHermes } = require('hermes-javascript')

//****** Drum Game ******//


//****** Philips Hue ******//
/*
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
*/

//****** Web Audio Engine ******//

var context = new window.AudioContext(); // définition du contexte audio WORKING WITH SNIPS BACKGROUND OK
  /*
    context.createBuffer([ "kick.wav", "snare.wav", "hihat1.wav", "hihat2.wav" ]).then(function(instruments) {
      function shot(e) {
        var inst = instruments[e.args.inst % instruments.length];
        var t0 = e.playbackTime;
        var t1 = t0 + inst.duration * e.args.duration;
        var bufSrc = context.createBufferSource();
        var gain = context.createGain();
  
        bufSrc.buffer = inst;
        bufSrc.start(t0);
        bufSrc.stop(t1);
        bufSrc.connect(gain);
  
        gain.gain.setValueAtTime(0.4 * e.args.amp, t0);
        gain.gain.linearRampToValueAtTime(0, t1);
        gain.connect(context.destination);
      }
    });
    */
context.createBufferSource();




//****** Odas ******//

var elevation;
var azimut;

// Add listener for tracking
document.addEventListener('tracking', function(e) {

  currentFrame.sources.forEach(function(source) {

      if (source.index == 0) {
      elevation = Math.asin(source.z) * 180 / Math.PI;
      azimut = Math.atan2(source.y, source.x) * 180 / Math.PI;
      console.log(azimut);

      if ( azimut <= 90 && azimut >= 0) {
        // Play kick! & Set Light Red
      } else if ( azimut > 90 && azimut <= 180) {
        //play snare! & Set Light Blue
      } else if (azimut < 0 && azimut > (-180)) {
        //play hat1 & Set Light Yellow
      } else {
        //play hat2 & Set Light Green
      }
      //console.log('Played drum ', oscillator1.frequency.value);
      }
  });
});


