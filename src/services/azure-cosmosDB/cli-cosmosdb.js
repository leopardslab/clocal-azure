#!/usr/bin/env node

"use strict";

const chalk = require("chalk");
const AzureCosmosDB = require("./azure-cosmosdb");
const cosmosdb = new AzureCosmosDB();

const action = () => {
  try {
    console.log(chalk.blueBright("starting azure cosmosDB ..."));
    const res = cosmosdb.start();
  } catch (err) {
    console.log(chalk.blueBright.bgRed(err));
  }
};

module.exports = {
  commandName: "cosmosdb-init",
  action: action
};
