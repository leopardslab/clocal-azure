'use strict';

const CloudLocal = require ('./../azure/cloud-local');

class AzureCDN extends CloudLocal {
  init() {
    this.port = 9581;
    this.app.get('/', (req, res) => {
      res.send('Welcome to clocal azure CDN');
    });
  }
}

module.exports = AzureCDN;
