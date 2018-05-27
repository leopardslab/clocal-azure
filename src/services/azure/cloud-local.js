const express = require ('express');
const path = require('path');
class CloudLocal{

  constructor() {
    this.app = express();
    this.app.use(express.static(__dirname + '../assets'));

    this.init();
  }

  start() {
    if (!this.port) {
      throw new Error('Port is not assigned');
    }

    return (this.server = this.app.listen(this.port));
  }

  stop() {
    return this.server.listening && this.server.close();
  }

  init(){}
}

module.exports = CloudLocal;
