const utils = require('../utils');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/authConfig');
const {users, refreshTokens, getUid, updateData} = utils;

const createRefreshToken = username => {
  const user = users.get(username);
  user.refreshToken && refreshTokens.delete(user.refreshToken);
  const token = getUid('token');
  users.set(user.username, {
    ...user,
    refreshToken: token,
  });
  let expiredAt = new Date();
  expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);
  const refreshToken = {
    token,
    username: username,
    expiryDate: expiredAt.getTime(),
  }
  refreshTokens.set(token, refreshToken);
  updateData('users', users);
  updateData('refreshTokens', refreshTokens);
}

const validateUser = (req, res) => {
  const {username, password} = req.body;
  if (!users.has(username)){
    return res.status(404).send({message: 'User not found'});
  }
  const isPasswordValid = bcrypt.compareSync(password, users.get(username).password);
  if (!isPasswordValid){
    return res.status(401).send({
      accessToken: null,
      message: 'Invalid Password',
    });
  }
  createRefreshToken(username);
  const user = users.get(username);
  const token = jwt.sign({id: user.id}, config.secret, {
    expiresIn: 86400,
  });
  return res.status(200).send({
    accessToken: token,
    ...user,
  });
}

const registerUser = (req, res) => {
  const {username, password} = req.body;
  const id = getUid('user');
  users.set(username, {
    username,
    id,
    password: bcrypt.hashSync(password, 8),
    permissions: ['*'],
    role: ['*'],
    groups: [],
  });
  updateData('users', users);
  res.status(200).send({
    message: 'Register Success',
  });
}

const refreshToken = (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  let refreshToken = refreshTokens.get(requestToken);
  if (!refreshToken) {
    return res.status(403).json({ message: "Refresh token is not in database!" });
  }

  if (refreshToken.expiryDate < new Date().getTime()) {
    refreshTokens.delete(requestToken);
    return res.status(403).json({
      message: "Refresh token was expired. Please make a new signin request",
    });
  }

  let newAccessToken = jwt.sign({ id: refreshToken.user.id }, config.secret, {
    expiresIn: config.jwtExpiration,
  });
  const user = users.get(refreshToken.username);
  users.set(refreshToken.username, {
    ...user,
    accessToken: newAccessToken,
  });
  updateData('users', users);
  
  return res.status(200).json({
    accessToken: newAccessToken,
    refreshToken: refreshToken.token,
  });
}

const addRootUser = () => {
  users.set('root', {
    username: 'root',
    password: 'root',
    permissions: ['*'],
    role: ['*'],
    id: getUid('user'),
    groups: [],
  });
  updateData('users', users);
}

module.exports = {
  validateUser,
  addRootUser,
  registerUser,
  refreshToken,
}