#!/usr/bin/env node

"use strict";

const chalk = require("chalk");
const AzureFunction = require("./azure-function");
const logger = require("../../bin/logger");
const functions = new AzureFunction();

const action = () => {
  try {
    const res = functions.start();
   
  } catch (err) {
    logger.error(chalk.blueBright.bgRed(err));
  }
};

module.exports = {
  commandName: "function-init",
  action: action
};
