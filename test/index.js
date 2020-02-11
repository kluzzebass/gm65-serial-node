const reader = require('../index.js')('/dev/ttyACM0', {
    // baudRate: 115200
})

reader.trigger()

