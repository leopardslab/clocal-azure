#!/usr/bin/env node

"use strict";

const chalk = require("chalk");
const AzureCLI = require("./azure-cli");
const cli = new AzureCLI();

const action = () => {
  try {

    const res = cli.start();
    console.log(chalk.blueBright("Initialising Azure CLI..."));
   
  } catch (err) {
    console.log(chalk.blueBright.bgRed(err));
  }
};

module.exports = {
  commandName: "cli-start",
  action: action
};
