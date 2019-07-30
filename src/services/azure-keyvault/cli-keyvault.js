#!/usr/bin/env node

"use strict";

const chalk = require("chalk");
const AzureKeyVault = require("./azure-keyvault");
const vault = new AzureKeyVault();

const action = () => {
  try {

    const res = vault.start();
    console.log(chalk.blueBright("Initialising Azure Key Vault..."));
   
  } catch (err) {
    console.log(chalk.blueBright.bgRed(err));
  }
};

module.exports = {
  commandName: "keyvault-start",
  action: action
};
