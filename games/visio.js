const { withHermes } = require('hermes-javascript')
const v3 = require('node-hue-api').v3;
const LightState = v3.lightStates.LightState;


//****** Dev Game ******//

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
      .off()
      .ct(200)
      .brightness(50)
    ;
    return api.lights.setLightState(LIGHT_ID, state);
  })
  .then(result => {
    console.log(`Light state change was successful? ${result}`);
  });


//****** Snips ******//

withHermes(hermes => {
    const dialog = hermes.dialog()

    dialog.flow('MagicBoxEi2i:visio_shitCam',(msg, flow) => {
      console.log(msg)
      flow.end()
      return "C'est clair c'est horrible. Dire qu'il y a des gens pour vendre ça. Et des pigeons comme toi pour acheter. ça me révolte."
  })

    dialog.flow('MagicBoxEi2i:visio_turnLightOn',(msg, flow) => {
    console.log(msg)
    flow.end()

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
  });

    return "ça te va comme ça? Cela ne pourra pas être pire de toute façon! Quelle horreur!"
  })

  dialog.flow('MagicBoxEi2i:visio_plusBeau',(msg, flow) => {
    console.log(msg)
    flow.end()
    return "Le plus beau c'est Valéry Giscard d'Estaing. En plusse il est immortel."
  })

    dialog.flow('MagicBoxEi2i:visio_turnOff',(msg, flow) => {
        console.log(msg)
        flow.end()

        v3.discovery.nupnpSearch()
        .then(searchResults => {
          const host = searchResults[0].ipaddress;
          return v3.api.createInsecureLocal(host).connect(USERNAME);
        })
        .then(api => {
          // Using a LightState object to build the desired state
          const state = new LightState()
            .off()
            .ct(200)
            .brightness(50)
          ;
          return api.lights.setLightState(LIGHT_ID, state);
        })
        .then(result => {
          console.log(`Light state change was successful? ${result}`);
        });
      
        return "OK. D'accord. On coupe tout. T'as raison on voit rien. On se tire."
    })
})