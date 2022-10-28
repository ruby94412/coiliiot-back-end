const modbusRTU = require("modbus-serial");
const SerialPort = require("serialport");
const client = new modbusRTU();

const write = () => {
  client?.writeRegister(0, 5)
    .then(response => {
        // res.send(response);
        console.log('temperture fetch success:', response);
    });
}
const read = async () => {
  const response = [];
  for (let i = 0; i <= 80; i += 10) {
    await client.readHoldingRegisters(i, 10).then(res => {
      console.log(res?.buffer);
      response.push(...res?.data)
    });
  }
  console.log(response);
}

client.connectRTU("/dev/tty.usbserial-110", {baudRate: 9600}, read);


