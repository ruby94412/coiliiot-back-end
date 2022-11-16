const {Router} = require('express');
// const loginRouter = require('./Login');
const deviceRouter = require('./Device');
// const groupRouter = require('./Group');
const testRouter = require('./Test');

const router = Router();
// router.use('/login', loginRouter);
router.use('/device', deviceRouter);
// router.use('/group', groupRouter);
router.use('/test', testRouter);

module.exports = router;
