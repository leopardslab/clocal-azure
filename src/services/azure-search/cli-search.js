#!/usr/bin/env node

"use strict";

const chalk = require("chalk");
const AzureSearch = require("./azure-search")
const search = new AzureSearch();

let config = require("./config");

const action = () => {
  try {
   
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
