const {
  addDevice,
  deleteDevice,
  getDevices,
  updateDevice,
  getDeviceConfig,
  checkDeviceFirmwareVersion,
  downloadFirmware,
} = require('../controllers/deviceController');
const {verifyToken} = require('../middleware/authJwt');

const deviceRoutes = app => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post('/device/getDeviceList', [verifyToken], getDevices);
  app.post('/device/add', [verifyToken], addDevice);
  app.post('/device/update', [verifyToken], updateDevice);
  app.post('/device/delete', [verifyToken], deleteDevice);
  app.get('/config/:deviceId', getDeviceConfig);
  app.get('/firmware/:deviceId/:firmware_version', checkDeviceFirmwareVersion);
  app.get('/firmware/download/:deviceId/:firmware_version', downloadFirmware);
}

module.exports = deviceRoutes;
