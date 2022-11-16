const {Router} = require('express');
const path = require('path');
const testRouter = Router();

// const fileName = 'testPic.png';
testRouter.get('/download/:id/:firmware_version', (req, res) => {
  console.log('to download', req.params);
    const filePath = path.resolve(__dirname, '../data/firmware.bin');
    res.download(filePath);
});
// localhost:8080/test/download

testRouter.get('/hasUpdates/:id/:firmware_version', (req, res) => {
  console.log(req.params);
  res.status(200).send({hasUpdate: req.params.firmware_version !== '2.0', newVersion: '2.0'});
});

module.exports = testRouter;