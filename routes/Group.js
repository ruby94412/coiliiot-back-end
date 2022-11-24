const {
  getUserGroup,
  addGroup,
  deleteGroup,
  updateGroup,
} = require('../controllers/groupController');
const {verifyToken} = require('../middleware/authJwt');

const groupRoutes = app => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post('/group/getGroupList', [verifyToken], getUserGroup);
  app.post('/group/add', [verifyToken], addGroup);
  app.post('/group/update', [verifyToken], updateGroup);
  app.post('/group/delete', [verifyToken], deleteGroup);
}

module.exports = groupRoutes;
