const { withHermes } = require('hermes-javascript')
//****** Dev Game ******//

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
  