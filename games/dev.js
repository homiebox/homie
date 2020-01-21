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
//****** Odas ******//

var elevation;
var azimut;

// Add listener for tracking
document.addEventListener('tracking', function(e) {

  currentFrame.sources.forEach(function(source) {

      if (source.index == 0) {
      elevation = Math.asin(source.z) * 180 / Math.PI;
      azimut = Math.atan2(source.y, source.x) * 180 / Math.PI;

      console.log('Elevation: ', elevation);
      console.log('Azimut: ', azimut);
      }
  });
});

//****** Snips ******//

withHermes(hermes => {
    const dialog = hermes.dialog()
    
    dialog.flow('MagicBoxEi2i:dev_quelAngle',(msg, flow) => {
      console.log(msg)
      flow.end()
      return "Ton angle est de " + Math.trunc(elevation) + " degrés en élévation. Et de " + Math.trunc(azimut) + " degrés en azimut."   
    })

    dialog.flow('MagicBoxEi2i:dev_merci',(msg, flow) => {
      console.log(msg)
      flow.end()
      return "Merci de votre écoute. En espérant vous avoir fait kiffé. Un chapeau va maintenant passer dans les rangs pour faire vos dons. A très bientot! Kiss"  
    })
  })
  