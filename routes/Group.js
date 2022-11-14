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
// groupRouter.post('/getGroupList', (req, res) => {
//   const groups = getUserGroup(req.body.username);
//   res.status(200).send({
//     status: 'success',
//     data: groups,
//   });
// });

// groupRouter.post('/add', (req, res) => {
//   const {groupName, username} = req.body;
//   addGroup(username, groupName);
//   res.status(200).send({
//     status: 'success',
//     message: 'add group success',
//   });
// });

// groupRouter.post('/update', (req, res) => {
//   updateGroup(req.body);
//   setTimeout(() => {
//     res.status(200).send({
//       status: 'success',
//       message: 'update group success',
//     });
//   }, 1000);
// });

// groupRouter.delete('/delete', (req, res) => {
//   const {groupId} = req.body;
//   deleteGroup(groupId);
//   res.status(200).send({
//     status: 'success',
//     message: 'delete group success',
//   });
// })



module.exports = groupRoutes;
