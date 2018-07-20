const express = require("express");

class CloudLocal {
  constructor() {
    this.app = express();
    this.init();
  }

  start() {
    return (this.server = this.app.listen(this.port));
  }

  stop() {
    return this.server.listening && this.server.close();
  }

  init() {}
}

module.exports = CloudLocal;
