const os = require('os')

const getIPAddress = () => {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
      const interface = interfaces[interfaceName];
      for (const info of interface) {
        if (!info.internal && info.family === 'IPv4') {
          return info.address;
        }
      }
    }
    return false;
  }
  module.exports = getIPAddress;