const utils = require('../utils');
const {users} = utils;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  const {username} = req.body;
  if (users.has(username)) {
    return res.status(400).send({message: 'Username Exists'});
  }
  next();
};

module.exports = {
  checkDuplicateUsernameOrEmail,
}