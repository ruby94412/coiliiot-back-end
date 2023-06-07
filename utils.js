const fs = require('fs');
const path = require('path');

const getData = type => {
  const file = fs.readFileSync(
    path.resolve(__dirname, `./data/${type}.json`),
    'utf8'
  );
  try {
    return new Map(Object.entries(JSON.parse(file)));
  } catch (e) {
    return new Map();
  }
}

const updateData = (type, map) => {
  fs.writeFile(path.resolve(__dirname, `./data/${type}.json`), JSON.stringify(Object.fromEntries(map)), err => {
    if (err) {
      console.error(err);
    }
  });
}

const getUid = (type) => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
  }
  switch (type) {
    default:
    case 'user':
      return s4() + s4() + '-' + s4() + '-' + s4();
    case 'group':
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4();
    case 'device':
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    case 'token':
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4() + '-' + s4() + s4() + s4() + s4(); 
  }
  
}

const nodeToJson = (node) => {
  if (!node) return null;
  const {
    propertyKey, propertyValue, propertyType, children,
  } = node;
  const rst = {};
  switch (propertyType) {
    case 3: {
      let temp = {};
      if (children?.length) {
        children.forEach((child) => {
          temp = { ...temp, ...nodeToJson(child) };
        });
      }
      rst[propertyKey] = temp;
      break;
    }
    case 2:
      // eslint-disable-next-line no-template-curly-in-string
      rst[propertyKey] = '${Date}';
      break;
    case 0:
    case 1:
    default:
      rst[propertyKey] = propertyValue;
      break;
  }
  return rst;
};

const webConfigToDeviceConfig = (config) => {
  const { networkConfigs } = config;
  if (!networkConfigs.length) return config;
  const arr = [];
  networkConfigs.forEach((networkConfig) => {
    const { customizedJson } = networkConfig;
    const jsonObj = nodeToJson(customizedJson)[''];
    arr.push({ ...networkConfig, customizedJson: jsonObj});
  });
  return { ...config, networkConfigs: arr};
};

module.exports = {
  getData,
  updateData,
  getUid,
  nodeToJson,
  webConfigToDeviceConfig,
  users: getData('users'),
  devices: getData('devices'),
  groups: getData('groups'),
  refreshTokens: getData('refreshTokens'),
}