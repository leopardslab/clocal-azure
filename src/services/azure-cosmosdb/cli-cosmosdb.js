#!/usr/bin/env node

"use strict";

const chalk = require("chalk");
const AzureCosmosDB = require("./azure-cosmosdb");
const logger = require("../../bin/logger");
const cosmosdb = new AzureCosmosDB();

const action = () => {
  try {
    cosmosdb.start();
    logger.info(chalk.blueBright("Starting Azure Cosmos DB ..."));
  } catch (err) {
    logger.error(chalk.blueBright.bgRed(err));
  }
};

module.exports = {
  commandName: "cosmosdb-init",
  action: action
};
