#!/usr/bin/env node

"use strict";

const chalk = require("chalk");
const AzureSearch = require("./azure-search")
const mysql = require("mysql");
const search = new AzureSearch();
let config = require("./config");

const action = () => {
  try {
    let connection = mysql.createConnection({
        host: config.serviceHost,
        user: config.databaseUser,
        password: config.databasePassword,
        database: config.databaseName
      });
      connection.connect(err => {
          if (!err) console.log("Database connection successful");
          else
            console.log(
              "Database connection failed \n Error: " + JSON.stringify(err, undefined, 2)
            );
        });
    console.log(
      chalk.blueBright(
        "Starting Azure Search ..." +
          `\nNow listening on:
    Azure Search Emulator listening on port http://`+config.serviceHost+":"+config.servicePort
      )
    );
    const res = search.start();
  
  } catch (err) {
    console.log(chalk.blueBright.bgRed(err));
  }
};

module.exports = {
  commandName: "search-start",
  action: action
};
