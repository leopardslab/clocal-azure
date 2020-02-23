#!/usr/bin/env node

"use strict";

const chalk = require("chalk");
const AzureKeyVault = require("./azure-keyvault");
const logger = require("../../bin/logger");
const vault = new AzureKeyVault();

const action = () => {
  try {
    vault.start();
    logger.info(chalk.blueBright("Initialising Azure Key Vault..."));
  } catch (err) {
    logger.error(chalk.blueBright.bgRed(err));
  }
};

module.exports = {
  commandName: "keyvault-start",
  action: action
};
