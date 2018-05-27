'use strict';
const createHandler = require("azure-function-express").createHandler;
const CloudLocal = require ('./../azure/cloud-local');
const path = require('path');
let localPath = "/api/:foo/:bar";
const express = require ('express');

class AzureFunction extends CloudLocal {
  init() {
    
    this.port = 9574;
    this.app.use(express.static(__dirname + './../../assets'));

    this.app.get('/', (req, res) => {
     //  res.send('Welcome to clocal azure functions');
       res.sendFile(path.join(__dirname)+ '/azure-function.html')
    });

    this.app.get(localPath, (req, res) => {

      if (req.query.name || (req.body && req.body.name)) {
        res.send ({
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name)
        });
      }
      else {
        res.send ({
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        });
      }
    });
  }
}
module.exports = AzureFunction, createHandler(this.app);
