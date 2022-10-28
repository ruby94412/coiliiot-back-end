const utils = require('../utils');
const {devices, groups} = utils;

const addDevice = ({groupId, deviceId, deviceType, deviceComment}) => {
  if (devices.has(deviceId)) return false;
  devices.set(deviceId, {
    groupId,
    deviceComment,
    deviceType,
    updateTime: new Date().toISOString().slice(0,10),
    id: deviceId,
  });
  let groupInfo = groups.get(groupId);
  const groupDevices = groupInfo?.devices || [];
  groupDevices.push(deviceId);
  groupInfo.devices = groupDevices;
  groups.set(groupId, groupInfo);

  utils.updateData('groups', groups);
  utils.updateData('devices', devices);
  return true;
}

const updateDevice = ({
  groupId,
  id,
  deviceComment,
  deviceType
}) => {
  devices.set(id, {
    groupId,
    deviceComment,
    id,
    updateTime: new Date().toISOString().slice(0,10),
    deviceType,
  });
  utils.updateData('devices', devices);
}

const deleteDevice = deviceId => {
  const groupId = devices.get(deviceId).groupId;
  let groupInfo = groups.get(groupId);
  const deviceSet = new Set(groupInfo?.devices || []);
  deviceSet.delete(deviceId);
  groupInfo.devices = [...deviceSet];
  groups.set(groupId, groupInfo);
  utils.updateData('groups', groups);
  devices.delete(deviceId);
  utils.updateData('devices', devices);
}

const getDevices = groupId => {
  const rst = [];
  const deviceIdArr = groups.get(groupId)?.devices || [];
  deviceIdArr?.forEach(id => {
    rst.push(devices.get(id));
  });
  return rst;
}

module.exports = {
  addDevice,
  deleteDevice,
  getDevices,
  updateDevice,
}