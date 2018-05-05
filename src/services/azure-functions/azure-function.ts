import express from 'express';
import { Express } from 'express';
import { Server } from 'http';
import CloudLocal from './../azure/cloud-local';

class AzureFunction extends CloudLocal {
  init() {
    this.port = 9574;
    this.app.get('/', (req, res) => {
      res.send('Welcome to clocal azure functions');
    });
  }
}

export default AzureFunction;
