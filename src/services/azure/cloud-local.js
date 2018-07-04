const express = require ('express');

class CloudLocal{

  constructor() {
    this.app = express();

    this.init();
  }

  start() {
    // if (!this.port) {
    //   throw new Error('Port is not assigned');
    // }

    return (this.server = this.app.listen(this.port));
  }

  stop() {
    return this.server.listening && this.server.close();
  }

  init(){}
}

module.exports = CloudLocal;
