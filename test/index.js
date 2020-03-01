const reader = require('../index.js')('/dev/ttyACM0', {
    // baudRate: 115200
    onScan: code => {
      console.log('code: ', code)
    }
})

reader.trigger()

