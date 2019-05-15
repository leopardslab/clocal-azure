#!/usr/bin/env node

"use strict";
const common = require('../common/cli');
const chalk = require("chalk");
const AzureFunction = require("./azure-function");
const functions = new AzureFunction();

const action = () => {
  try {
    console.log(common.figlet());
    const res = functions.start();
   
  } catch (err) {
    console.log(chalk.blueBright.bgRed(err));
  }
};

module.exports = {
  commandName: "function-init",
  action: action
};
