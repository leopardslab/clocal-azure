const CloudLocal = require ('./../azure/cloud-local');

class AzureApiManagement extends CloudLocal {
  init() {
    this.port = 9567;
    this.app.get('/', (req, res) => {
      res.send('Welcome to clocal azure api management');
    });
  }
}

module.exports = AzureApiManagement;
