const utils = require('../utils');
const {users} = utils;

const validateUser = ({username, password}) => {
  if (!users.has(username)) return false;
  return users.get(username).password === password ? users.get(username) : false;
}

const addRootUser = () => {
  users.set('root', {
    username: 'root',
    password: 'root',
    permissions: ['*'],
    role: ['*'],
    id: utils.getUid('user'),
    groups: [],
  });
  utils.updateData('users', users);
}

module.exports = {
  validateUser,
  addRootUser,
}