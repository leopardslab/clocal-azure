#!/usr/bin/env node

"use strict";
const common = require('../common/cli');
const chalk = require("chalk");
const AzureApiAppService = require("./azure-api-app-service");
const APIService = new AzureApiAppService();

const action = (cmd, path) => {
  try {
    const res = APIService.start();
    console.log(common.figlet());
    console.log(
      chalk.blueBright(
        "Starting azure api app service ..." +
          "\nNow listening on: http://localhost:" +
          APIService.port +
          ". Press Ctrl+C to shut down."
      )
    );
  } catch (err) {
    console.log(chalk.blueBright.bgRed(err));
  }
};

module.exports = {
  commandName: "api-start",
  action: action
};
