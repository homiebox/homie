'use strict';

const { withHermes } = require('hermes-javascript')

const {
  EtherPortClient
} = require('etherport-client');
const five = require('johnny-five');
const board = new five.Board({
  port: new EtherPortClient({
    host: '192.168.43.158',
    port: 3030
  }),
  repl: false
});

const PIN1= 5;
const PIN2= 4;
const PIN5= 14;
const PIN6= 12;
const PIN7= 13;
const PIN8= 15;

const STOP=1025;

board.on('ready', () => {
	send(STOP);
});


function genericsendp0(bit)
  {

  board.pinMode(PIN1, five.Pin.OUTPUT);
  const bit0 = five.Pin(PIN1);
  board.pinMode(PIN2, five.Pin.OUTPUT);
  const bit1 = five.Pin(PIN2);
  board.pinMode(PIN5, five.Pin.OUTPUT);
  const bit2 = five.Pin(PIN5);
  board.pinMode(PIN6, five.Pin.OUTPUT);
  const bit3 = five.Pin(PIN6);
  board.pinMode(PIN7, five.Pin.OUTPUT);
  const bit4 = five.Pin(PIN7);
  board.pinMode(PIN8, five.Pin.OUTPUT);
  const bit5 = five.Pin(PIN8);  
  //PAyload 0:
    bit0.low();

  if(bit[1]==1)
    bit1.high();
  else if(bit[1]==0)
    bit1.low();
  if(bit[2]==1)
    bit2.high();
  else if(bit[2]==0)
    bit2.low();
  if(bit[3]==1)
    bit3.high();
  else if(bit[3]==0)
    bit3.low();
  if(bit[4]==1)
    bit4.high();
  else if(bit[4]==0)
    bit4.low();
  if(bit[5]==1)
    bit5.high();
  else if(bit[1]==0)
    bit5.low();
  }

function genericsendp1(bit)
  {
    //PAyload 0:

  board.pinMode(PIN1, five.Pin.OUTPUT);
  const bit0 = five.Pin(PIN1);
  board.pinMode(PIN2, five.Pin.OUTPUT);
  const bit1 = five.Pin(PIN2);
  board.pinMode(PIN5, five.Pin.OUTPUT);
  const bit2 = five.Pin(PIN5);
  board.pinMode(PIN6, five.Pin.OUTPUT);
  const bit3 = five.Pin(PIN6);
  board.pinMode(PIN7, five.Pin.OUTPUT);
  const bit4 = five.Pin(PIN7);
  board.pinMode(PIN8, five.Pin.OUTPUT);
  const bit5 = five.Pin(PIN8);
  
  bit0.high();

  if(bit[6]==1)
    bit1.high();
  else if(bit[6]==0)
    bit1.low();
  if(bit[7]==1)
    bit2.high();
  else if(bit[7]==0)
    bit2.low();
  if(bit[8]==1)
    bit3.high();
  else if(bit[8]==0)
    bit3.low();
  if(bit[9]==1)
    bit4.high();
  else if(bit[9]==0)
    bit4.low();
  if(bit[10]==1)
    bit5.high();
  else if(bit[10]==0)
    bit5.low();
  }



function send(data) {

  var bit=[];
  var i=10;
  var diviseur;
  var reste;
  if((data)<(Math.pow(2,i)+2))
  {
      for(i;i>0;i--)
      {
          diviseur=Math.pow(2,i);
          reste= (data%(diviseur));
          
          bit[i]=parseInt(data/diviseur);
          data=reste;
      }
  }
	//console.log(bit)


  //will separate 10 bits data in 2*5 payload
  
	
	genericsendp0(bit);
  setTimeout(genericsendp1, 50,bit);

}

withHermes(hermes => {
    const dialog = hermes.dialog()

    dialog.flow('MagicBoxEi2i:robot_avance',(msg, flow) => {
      console.log(msg)
      flow.end()
              /* test robot */
                console.log('TEST ROBOT AVANCE');

                console.log('Test demarre robot with Snips'); 

      return "C'est parti mon kiki ! "
  })

  dialog.flow('MagicBoxEi2i:robot_stop',(msg, flow) => {
    console.log(msg)
    flow.end()
    
      console.log('TEST ROBOT STOP');
      send(STOP);
      
      return "Très bien, je coupe le moteur"
    })
  
    dialog.flow('MagicBoxEi2i:robot_droite',(msg, flow) => {
      console.log(msg)
      flow.end()
      console.log('TEST ROBOT DROITE');
      azimut=270;
      send(azimut);
      
      return "D'accord je vais à droite"
    })

    dialog.flow('MagicBoxEi2i:robot_gauche',(msg, flow) => {
        console.log(msg)
        flow.end()

      
      console.log('TEST ROBOT GAUCHE');
      azimut=90;
      send(azimut);
      
        return "D'accord je vais à gauche"
    })

    dialog.flow('MagicBoxEi2i:robot_recule',(msg, flow) => {
      console.log(msg)
      flow.end()

      console.log('TEST ROBOT RECULE');
      azimut=180;
      send(azimut);
      
      return "Marche arrière toute!"
    })
  
    dialog.flow('MagicBoxEi2i:robot_follow',(msg, flow) => {
      console.log(msg)
      console.log('TEST ROBOT VIENS');
      azimut = (Math.atan2(source.y, source.x) * 180 / Math.PI)+180;
      send(azimut);
      flow.end()
      return "Ok je te suis"
    })
})