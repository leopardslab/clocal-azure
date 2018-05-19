const CloudLocal = require ('./../azure/cloud-local');

class AzureFunction extends CloudLocal {
  init() {
    this.port = 9574;
    this.app.get('/', (req, res) => {
      res.send('Welcome to clocal azure functions');
    });
  }
}

module.exports = AzureFunction;
