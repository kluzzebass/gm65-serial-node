
const { Buffer } = require("buffer")
const SerialPort = require('serialport')

const bitRates = [
    1200,
    4800,
    9600,
    14400,
    19200,
    38400,
    57600,
    115200
]

const defaults = {
    bitRate: 9600
}

const commands = {
  trigger: Buffer.from([0x7e, 0x00, 0x08, 0x01, 0x00, 0x02, 0x01, 0xab, 0xcd]),
  confirmation: Buffer.from([0x02, 0x00, 0x00, 0x01, 0x00, 0x33, 0x31])
}


module.exports = (dev, options = {}) => {
    this.dev = dev
    this.buf = Buffer.alloc(2048) // Probably enough...?
    this.port = null

    this.bitRate = (options.bitRate && bitRates.includes(options.bitRate)) || defaults.bitRate

    this.port = new SerialPort(this.dev, {
        baudRate: this.bitRate,
        autoOpen: true
    })

    // open errors will be emitted as an error event
    this.port.on('error', err => {
        console.error('Error: ', err.message)
    })

    this.port.on('open', () => {
        console.log('port is open')
    })

    this.port.on('data', data => {
        console.log(data)
    })

    this.trigger = () => {
      this.port.write(commands.trigger)
    }

    return this
}
