let GPIO = require('onoff').Gpio

let LED = new GPIO(18, 'out')

LED.writeSync(0)
