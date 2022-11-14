const utils = require('../utils');
const {groups, users} = utils;

const addGroup = (req, res) => {
  const {username, groupName} = req.body;
  const groupId = utils.getUid('group');
  groups.set(groupId, {
    username: username,
    groupName: groupName,
    id: groupId,
    updateTime: new Date().toISOString().slice(0,10),
  });
  let userInfo = users.get(username);
  const userGroups = userInfo? userInfo.groups : [];
  userGroups.push(groupId);
  userInfo.groups = userGroups;
  users.set(username, userInfo);

  utils.updateData('users', users);
  utils.updateData('groups', groups);
  return res.status(200).send({
    status: 'success',
    message: 'add group success',
  });
}

const updateGroup = (req, res) => {
  const {username, id, groupName, config, devices} = req.body;
  groups.set(id, {
    username,
    groupName,
    id,
    updateTime: new Date().toISOString().slice(0,10),
    config,
    devices,
  });
  utils.updateData('groups', groups);
  return res.status(200).send({
    status: 'success',
    message: 'update group success',
  });
}

const deleteGroup = (req, res) => {
  const {groupId} = req.body.data;
  const username = groups.get(groupId).username;
  let userInfo = users.get(username);
  const groupSet = new Set(userInfo ? userInfo.groups : []);
  groupSet.delete(groupId);
  userInfo.groups = [...groupSet];
  users.set(username, userInfo);
  utils.updateData('users', users);
  groups.delete(groupId);
  utils.updateData('groups', groups);
  return res.status(200).send({
    status: 'success',
    message: 'delete group success',
  });
}

const getGroupConfig = (req, res) => {
  const {groupId} = req.body;
  return groups.get(groupId).config;
}

const getUserGroup = (req, res) => {
  const username = req.body.username;
  const rst = [];
  const groupIdArr = users.get(username) ? users.get(username).groups : [];
  groupIdArr.forEach(id => {
    rst.push(groups.get(id));
  });
  return res.status(200).send({
    status: 'success',
    data: rst,
  });
}

module.exports = {
  addGroup,
  updateGroup,
  deleteGroup,
  getGroupConfig,
  getUserGroup,
}