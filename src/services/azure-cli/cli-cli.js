#!/usr/bin/env node

"use strict";

const chalk = require("chalk");
const AzureCLI = require("./azure-cli");
const logger = require("../../bin/logger");

const cli = new AzureCLI();

const action = () => {
  try {
    cli.start();
    logger.info(chalk.blueBright("Initialising Azure CLI..."));
  } catch (err) {
    logger.error(chalk.blueBright.bgRed(err));
  }
};

module.exports = {
  commandName: "cli-start",
  action: action
};
