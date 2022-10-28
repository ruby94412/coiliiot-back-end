const {Router} = require('express');
const deviceRouter = Router();

const {
  addDevice,
  deleteDevice,
  getDevices,
  updateDevice,
} = require('../controllers/deviceController');

deviceRouter.post('/get', (req, res) => {
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
  deleteDevice(req.body?.deviceId);
  res.status(200).send({
    status: 'success',
    message: 'delete device success',
  });
})

module.exports = deviceRouter;
