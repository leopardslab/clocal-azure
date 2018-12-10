#!/usr/bin/env node

"use strict";
const common = require('../common/cli');
const chalk = require("chalk");
const AzureCosmosDB = require("./azure-cosmosdb");
const cosmosdb = new AzureCosmosDB();

const action = () => {
  try {
    console.log(common.figlet());
    console.log(chalk.blueBright("Starting Azure Cosmos DB ..."));
    const res = cosmosdb.start();
  } catch (err) {
    console.log(chalk.blueBright.bgRed(err));
  }
};

module.exports = {
  commandName: "cosmosdb-init",
  action: action
};
