#!/usr/bin/env node

"use strict";

const chalk = require("chalk");
const AzureSQL = require("./azure-sql-server");
const logger = require("../../bin/logger");
const sql = new AzureSQL();

const action = () => {
  try {

    const res = sql.start();
    logger.info(chalk.blueBright("Initialising Azure SQL Server..."));
   
  } catch (err) {
    logger.error(chalk.blueBright.bgRed(err));
  }
};

module.exports = {
  commandName: "sql-start",
  action: action
};
