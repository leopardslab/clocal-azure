import express from 'express';
import { Express } from 'express';
import { Server } from 'http';
import CloudLocal from './../azure/cloud-local';

class AzureCDN extends CloudLocal {
  init() {
    this.port = 9581;
    this.app.get('/', (req, res) => {
      res.send('Welcome to clocal azure CDN');
    });
  }
}

export default AzureCDN;
