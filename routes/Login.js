const {
  validateUser,
  registerUser,
  refreshToken,
} = require('../controllers/loginController');
const {checkDuplicateUsernameOrEmail} = require('../middleware/verifySignUp');

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
  app.post('/refreshToken', refreshToken);
}

module.exports = loginRoutes;