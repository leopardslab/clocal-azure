#!/usr/bin/env node

"use strict";

const chalk = require("chalk");
const AzureCosmosDB = require("./azure-cosmosdb");
const logger = require('../../bin/logger');
const cosmosdb = new AzureCosmosDB();

const action = () => {
  try {
    logger.info(chalk.blueBright("Starting Azure Cosmos DB ..."));
    const res = cosmosdb.start();
  } catch (err) {
    logger.error(chalk.blueBright.bgRed(err));
  }
};

module.exports = {
  commandName: "cosmosdb-init",
  action: action
};
