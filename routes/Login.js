const {Router} = require('express');
const {
  validateUser,
} = require('../controllers/loginController');
const loginRouter = Router();


loginRouter.get('/test', (req, res) => {
  res.status(200).send({
    foo: 'bar',
  });
});

loginRouter.post('/', (req, res) => {
  const isValidUser = validateUser(req.body);
  res.status(200).send({
    status: isValidUser ? 'success' : 'failure',
    data: isValidUser,
  });
});

loginRouter.post('/add', (req, res) => {
  res.status(200).send({
    status: 'success',
    message: 'add user success',
  });
});

loginRouter.delete('/delete', (req, res) => {
  res.status(200).send({
    status: 'success',
    message: 'add user success',
  });
});

loginRouter.post('/update', (req, res) => {
  res.status(200).send({
    status: 'success',
    message: 'update user success',
  });
});

module.exports = loginRouter;
