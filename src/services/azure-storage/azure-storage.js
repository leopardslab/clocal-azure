'use strict';

const CloudLocal = require ('./../azure/cloud-local');

class AzureStorage extends CloudLocal {
  init() {
    this.port = 9569;
    this.app.get('/', (req, res) => {
      res.send('Welcome to clocal azure storage');
    });
  }
}

module.exports = AzureStorage;
