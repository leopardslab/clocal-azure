#!/usr/bin/env node

"use strict";

const chalk = require("chalk");
const AzureApiAppService = require("./azure-api-app-service");
const logger = require("../../bin/logger");
const APIService = new AzureApiAppService();

const action = (cmd, path) => {
  try {
    APIService.start();
    logger.info(
      chalk.blueBright(
        "Starting azure api app service ..." +
          "\nNow listening on: http://localhost:" +
          APIService.port +
          ". Press Ctrl+C to shut down."
      )
    );
  } catch (err) {
    logger.error(chalk.blueBright.bgRed(err));
  }
};

module.exports = {
  commandName: "api-start",
  action: action
};
