const utils = require('../utils');
const {devices, groups} = utils;

const addDevice = (req, res) => {
  const {groupId, deviceId, deviceType, deviceComment} = req.body;
  if (devices.has(deviceId)) {
    return res.status(404).send({message: 'device not found'});
  }
  devices.set(deviceId, {
    groupId,
    deviceComment,
    deviceType,
    updateTime: new Date().toISOString().slice(0,10),
    id: deviceId,
  });
  let groupInfo = groups.get(groupId);
  const groupDevices = groupInfo.devices || [];
  groupDevices.push(deviceId);
  groupInfo.devices = groupDevices;
  groups.set(groupId, groupInfo);

  utils.updateData('groups', groups);
  utils.updateData('devices', devices);
  return res.status(200).send({
    status: 'success',
    message: 'add device success',
  });
}

const updateDevice = (req, res) => {
  const {groupId, id, deviceComment, deviceType} = req.body;
  devices.set(id, {
    groupId,
    deviceComment,
    id,
    updateTime: new Date().toISOString().slice(0,10),
    deviceType,
  });
  utils.updateData('devices', devices);
  return res.status(200).send({
    status: 'success',
    message: 'update device success',
  });
}

const deleteDevice = (req, res) => {
  const {deviceId} = req.body.data;
  const groupId = devices.get(deviceId).groupId;
  let groupInfo = groups.get(groupId);
  const deviceSet = new Set(groupInfo ? groupInfo.devices : []);
  deviceSet.delete(deviceId);
  groupInfo.devices = [...deviceSet];
  groups.set(groupId, groupInfo);
  utils.updateData('groups', groups);
  devices.delete(deviceId);
  utils.updateData('devices', devices);
  return res.status(200).send({
    status: 'success',
    message: 'delete device success',
  });
}

const getDevices = (req, res) => {
  const groupId = req.body.groupId;
  const rst = [];
  const deviceIdArr = groups.get(groupId)?.devices || [];
  deviceIdArr.forEach(id => {
    rst.push(devices.get(id));
  });
  return res.status(200).send({
    status: 'success',
    data: rst,
  });
}

const getDeviceConfig = (req, res) => {
  const {deviceId} = req.params;
  const deviceInfo = devices.get(deviceId);
  const {groupId} = deviceInfo;
  const groupInfo = groups.get(groupId);
  return res.status(200).send(groupInfo.config);
}

const checkDeviceFirmwareVersion = (req, res) => {
  return res.status(200).send({
    hasUpdate: req.params.firmware_version !== '2.0',
    newVersion: '2.0'
  });
}

const downloadFirmware = (req, res) => {
  const filePath = path.resolve(__dirname, '../data/firmware.bin');
  return res.download(filePath);
}

module.exports = {
  addDevice,
  deleteDevice,
  getDevices,
  updateDevice,
  getDeviceConfig,
  checkDeviceFirmwareVersion,
  downloadFirmware,
}