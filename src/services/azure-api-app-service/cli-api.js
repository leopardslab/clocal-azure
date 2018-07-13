#!/usr/bin/env node

"use strict";

const chalk = require("chalk");
const AzureApiAppService = require("./azure-api-app-service");
const APIService = new AzureApiAppService();

const action = (cmd, path) => {
    try {
      console.log(chalk.blueBright("Starting azure api app service ..."+
      "\nNow listening on: http://localhost:"+
      APIService.port + ". Press Ctrl+C to shut down."));
      const res = APIService.start();
    } catch (err) {
      console.log(chalk.blueBright.bgRed(err));
    }
};

module.exports = {
  commandName: "api-start",
  // option:"-s, start', 'Start Command",
  argument: "<path>",
  action: action
};
