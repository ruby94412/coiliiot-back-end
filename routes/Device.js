const {Router} = require('express');
const deviceRouter = Router();
const TEST_JSON_STRING = `{"test": "test"}`
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
