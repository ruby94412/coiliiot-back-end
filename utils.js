const fs = require('fs');
const path = require('path');

const getData = type => {
  return new Map(Object.entries(JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, `./data/${type}.json`),
      'utf8'
  ))));
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


module.exports = {
  getData,
  updateData,
  getUid,
  users: getData('users'),
  devices: getData('devices'),
  groups: getData('groups'),
  refreshTokens: getData('refreshTokens'),
}