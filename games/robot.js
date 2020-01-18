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


withHermes(hermes => {
    const dialog = hermes.dialog()

    dialog.flow('MagicBoxEi2i:robot_avance',(msg, flow) => {
      console.log(msg)
      flow.end()
              /* test robot */
                console.log('TEST ROBOT AVANCE');
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
                bit1.low();  
                bit2.low();
                bit3.low();
                bit4.low();
                bit5.low();
                console.log('Test demarre robot with Snips'); 

      return "C'est parti mon kiki ! "
  })

  dialog.flow('MagicBoxEi2i:robot_stop',(msg, flow) => {
    console.log(msg)
    flow.end()
    
      console.log('TEST ROBOT STOP');
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
    
      bit0.low();
      bit1.low();  
      bit2.low();
      bit3.low();
      bit4.high();
      bit5.low();
      
      return "Très bien, je coupe le moteur"
    })
  
    dialog.flow('MagicBoxEi2i:robot_droite',(msg, flow) => {
      console.log(msg)
      flow.end()
        *
      console.log('TEST ROBOT DROITE');
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
    
      bit0.low();
      bit1.low();  
      bit2.low();
      bit3.high();
      bit4.low();
      bit5.low();
      
      return "D'accord je vais à droite"
    })

    dialog.flow('MagicBoxEi2i:robot_gauche',(msg, flow) => {
        console.log(msg)
        flow.end()

      
      console.log('TEST ROBOT GAUCHE');
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
    
      bit0.low();
      bit1.high();  
      bit2.low();
      bit3.low();
      bit4.low();
      bit5.low();
      
        return "D'accord je vais à gauche"
    })

    dialog.flow('MagicBoxEi2i:robot_recule',(msg, flow) => {
      console.log(msg)
      flow.end()

      console.log('TEST ROBOT RECULE');
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
    
      bit0.low();
      bit1.low();  
      bit2.high();
      bit3.low();
      bit4.low();
      bit5.low();
      
      return "Marche arrière toute!"
    })
  
    dialog.flow('MagicBoxEi2i:robot_follow',(msg, flow) => {
      console.log(msg)
      flow.end()
      return "Ok je te suis"
    })
})