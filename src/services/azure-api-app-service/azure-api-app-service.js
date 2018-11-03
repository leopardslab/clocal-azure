"use strict";

const CloudLocal = require("./../azure/cloud-local");
const os = require('os');
const Docker = require("dockerode");

let bodyParser = require("body-parser");
let swaggerize = require("swaggerize-express");
let swaggerUi = require("swaggerize-ui");
let path = require("path");
let workingDir = "./example/azure-api-app-service/";
let initFile;
let folder;
// let workingDir = "../../example/azure-api-service/"


// Detecting OS

if (os.platform == "linux") { //Linux

  let docker = new Docker({
    socketPath: "/var/run/docker.sock"
  });

}else if (os.platform == "win32"){ // Windows

  let docker = new Docker({
    socketPath: "//./pipe/docker_engine"
  });

}

if (process.argv[2] == "api-start") {
  folder = process.argv[3];
  initFile = process.argv[4];
}

class AzureApiAppService extends CloudLocal {
  init() {
    this.port = 9567;
    this.app.get("/", (req, res) => {
      res.send("Welcome to clocal azure api app service");
    });
    this.app.use(bodyParser.json());
    if (process.argv[2] == "api-start") {
      this.app.use(
        swaggerize({
          api: path.resolve(workingDir + folder + "/" + initFile),
          handlers: path.resolve(workingDir + folder + "/" + "handlers"),
          docspath: "/swagger"
        })
      );
      this.app.use(
        "/docs",
        swaggerUi({
          docs: "/swagger"
        })
      );
    }
  }
}

module.exports = AzureApiAppService;
