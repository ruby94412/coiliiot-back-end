const {Router} = require('express');
const deviceRouter = Router();
const TEST_JSON_STRING = `{"fota": 0, "uartReadTime": 25, "flow": "", "param_ver": 1, "pw
rmod": "normal", "password": "", "netReadTime": 0, "passon": 1, "nolog": "1", "plate": 0, "reg": 
{"type": 3, "data": "273L62XH9LA89ARF", "prefix": "", "postfix": ""}, "convert": 0, "uconf": [[1,
   "9600", 8, 2, 0, ""], [], []], "conf": [["tcp", {"type": 0, "data": "273L62XH9LA89ARF", "prefix": "
   ", "postfix": ""}, 300, "mbrtu.tlink.io", "8651", 1, "", "", "", ""], [], [], [], [], [], []], "pre
   set": {"number": "", "delay": "", "smsword": ""}, "apn": ["", "", ""], "cmds": [[""], [], []], "p
   ins": ["pio0", "pio0", "pio0"], "gps": {"pio": [], "fun": []}, "upprot": ["", "", "", "", "", "", ""], "dwp
   rot": ["", "", "", "", "", "", ""], "warn": {"adc0": [], "adc1": [], "vbatt": [], "gpio": []}}`
const {
  addDevice,
  deleteDevice,
  getDevices,
  updateDevice,
} = require('../controllers/deviceController');

deviceRouter.post('/getDeviceList', (req, res) => {
  const devices = getDevices(req.body.groupId)
  res.status(200).send({
    status: 'success',
    data: devices,
  });
});

deviceRouter.post('/add', (req, res) => {
  const addResult = addDevice(req.body);
  res.status(200).send({
    status: addResult ? 'success' : 'failure',
    message: addResult ? 'add device success' : 'failure',
  });
});

deviceRouter.post('/update', (req, res) => {
  updateDevice(req.body);
  res.status(200).send({
    status: 'success',
    message: 'update device success',
  });
});

deviceRouter.delete('/delete', (req, res) => {
  deleteDevice(req.body.deviceId);
  res.status(200).send({
    status: 'success',
    message: 'delete device success',
  });
});

deviceRouter.get('/deviceId/:deviceId/configVersion/:configVersion', (req, res) => {
  console.log(req.params.deviceId, req.params.configVersion);
  res.status(200).send(JSON.parse(TEST_JSON_STRING));
});

module.exports = deviceRouter;
