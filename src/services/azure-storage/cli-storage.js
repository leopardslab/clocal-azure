#!/usr/bin/env node

"use strict";

const chalk = require("chalk");
const AzureStorage = require("./azure-storage");
const storage = new AzureStorage();

const action = () => {
  try {
    console.log(chalk.blueBright("starting azure storage ..."));
    const res = storage.start();
  } catch (err) {
    console.log(chalk.blueBright.bgRed(err));
  }
};

module.exports = {
  commandName: "storage start",
  argument: "<path>",
  action: action
};
