const { withHermes } = require('hermes-javascript')
const v3 = require('node-hue-api').v3;
const LightState = v3.lightStates.LightState;


//****** Dev Game ******//

const USERNAME = 'your username to authenticating with the bridge'
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
      .ct(200)
      .brightness(100)
    ;
    return api.lights.setLightState(LIGHT_ID, state);
  })
  .then(result => {
    console.log(`Light state change was successful? ${result}`);
  })
;

//****** from Odas ******//

var angle;

// Add listener for DoA 
document.addEventListener('tracking', function(e) {

  // Update source
  currentFrame.sources.forEach(function(source,index) {
      angle = source.x;
      console.log(angle);
  });
});

//****** from Snips ******//

withHermes(hermes => {
    const dialog = hermes.dialog()
  
    dialog.flow('MagicBoxEi2i:home_goHome',(msg, flow) => {
      console.log(msg)
      flow.end()
      return "Homie go home"
    })
  
    dialog.flow('MagicBoxEi2i:dev_quelAngle',(msg, flow) => {
      console.log(msg)
      flow.end()
      return "Ton angle est " +angle 
    })
  })
  