#!/usr/bin/env node

"use strict";

const chalk = require("chalk");
const AzureSQL = require("./azure-sql-server");
const sql = new AzureSQL();

const action = () => {
  try {

    const res = sql.start();
    console.log(chalk.blueBright("Initialising Azure SQL Server..."));
   
  } catch (err) {
    console.log(chalk.blueBright.bgRed(err));
  }
};

module.exports = {
  commandName: "sql-start",
  action: action
};
