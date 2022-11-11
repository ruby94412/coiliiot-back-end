// const {Router} = require('express');
const {
  validateUser,
  registerUser,
} = require('../controllers/loginController');
// const loginRouter = Router();
const {checkDuplicateUsernameOrEmail} = require('../middleware/verifySignUp');

// loginRouter.get('/test', (req, res, next) => {

// }, (req, res) => {
//   res.status(200).send({
//     foo: 'bar',
//   });
// });

// loginRouter.post('/', (req, res) => {
//   validateUser(req, res);
// });

// loginRouter.post('/add', (req, res) => {
//   registerUser(req.body);
//   res.status(200).send({
//     status: 'success',
//     message: 'add user success',
//   });
// });

// loginRouter.delete('/delete', (req, res) => {
//   res.status(200).send({
//     status: 'success',
//     message: 'add user success',
//   });
// });

// loginRouter.post('/update', (req, res) => {
//   res.status(200).send({
//     status: 'success',
//     message: 'update user success',
//   });
// });



// module.exports = loginRouter;

const loginRoutes = app => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post('/login/add', [checkDuplicateUsernameOrEmail], registerUser);
  app.post('/login', validateUser);
}

module.exports = loginRoutes;