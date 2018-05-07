import express from 'express';
import { Express } from 'express';
import { Server } from 'http';
import CloudLocal from './../azure/cloud-local';

class AzureStorage extends CloudLocal {
  init() {
    this.port = 9569;
    this.app.get('/', (req, res) => {
      res.send('Welcome to clocal azure storage');
    });
  }
}

export default AzureStorage;
