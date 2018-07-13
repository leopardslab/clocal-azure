"use strict";

const CloudLocal = require("./../azure/cloud-local");
let bodyParser = require("body-parser");
let swaggerize = require("swaggerize-express");
let swaggerUi = require("swaggerize-ui");
let path = require("path");
let exampleFolder = "./src/example/azure-api-service/";

class AzureApiAppService extends CloudLocal {
  init() {
    this.port = 9567;

    this.app.use(bodyParser.json());
    this.app.use(
      swaggerize({
        api: path.resolve(exampleFolder+"api.json"),
        handlers: path.resolve(exampleFolder+"handlers"),
        docspath: "/swagger"
      })
    );

    this.app.use(
      "/docs",
      swaggerUi({
        docs: "/swagger"
      })
    );

    this.app.get("/", (req, res) => {
      res.send("Welcome to clocal azure api app service");
    });
  }
}

module.exports = AzureApiAppService;
