import express from 'express';
import { Express } from 'express';
import { Server } from 'http';

abstract class CloudLocal {
  protected app: Express;
  private server: Server;
  protected port: number;

  constructor() {
    this.app = express();
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

  abstract init(): any;
}

export default CloudLocal;
