const { withHermes } = require('hermes-javascript')
const v3 = require('node-hue-api').v3;
const LightState = v3.lightStates.LightState;


//****** Dev Game ******//

//****** Philips Hue ******//

const USERNAME = 'q4lxCJTJLbCSdblLvrsaSrKax8ZPmcspO1vAv4NJ' //'your username to authenticating with the bridge'
  // The name of the light we wish to retrieve by name
  , LIGHT_ID = 2
;
/*
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
    return api.lights.setLightState(LIGHT_ID, state);
  })
  .then(result => {
    console.log(`Light state change was successful? ${result}`);
  })
;
*/
//****** from Odas ******//

var elevation;
var azimut;

// Add listener for DoA 
document.addEventListener('tracking', function(e) {

  // Update source
  currentFrame.sources.forEach(function(source,index) {
      elevation = source.z;
      azimut = source.x;
      console.log('Elevation: ', elevation);
      console.log('Azimut: ', azimut);
  });
});

//****** from Snips ******//

withHermes(hermes => {
    const dialog = hermes.dialog()
  
    dialog.flow('MagicBoxEi2i:dev_quelAngle',(msg, flow) => {
      console.log(msg)
      flow.end()
      return "Ton angle est de " + elevation + " degrés en élévation. Et de " + azimut + " degrés en azimut."  
    })
  })
  