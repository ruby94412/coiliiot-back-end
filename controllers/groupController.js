const utils = require('../utils');
const {groups, users} = utils;

const addGroup = (username, groupName) => {
  const groupId = utils.getUid('group');
  groups.set(groupId, {
    username: username,
    groupName: groupName,
    id: groupId,
    updateTime: new Date().toISOString().slice(0,10),
  });
  let userInfo = users.get(username);
  const userGroups = userInfo?.groups || [];
  userGroups.push(groupId);
  userInfo.groups = userGroups;
  users.set(username, userInfo);

  utils.updateData('users', users);
  utils.updateData('groups', groups);
}

const updateGroup = ({username, id, groupName, config, devices}) => {
  groups.set(id, {
    username,
    groupName,
    id,
    updateTime: new Date().toISOString().slice(0,10),
    config,
    devices,
  });
  utils.updateData('groups', groups);
}

const deleteGroup = groupId => {
  const username = groups.get(groupId).username;
  let userInfo = users.get(username);
  const groupSet = new Set(userInfo?.groups || []);
  groupSet.delete(groupId);
  userInfo.groups = [...groupSet];
  users.set(username, userInfo);
  utils.updateData('users', users);
  groups.delete(groupId);
  utils.updateData('groups', groups);
}

const getGroupConfig = groupId => {
  return groups.get(groupId).config;
}

const getUserGroup = user => {
  const rst = [];
  const groupIdArr = users.get(user)?.groups || [];
  groupIdArr?.forEach(id => {
    rst.push(groups.get(id));
  });
  return rst;
}

module.exports = {
  addGroup,
  updateGroup,
  deleteGroup,
  getGroupConfig,
  getUserGroup,
}