#!/usr/bin/env node

"use strict";

const chalk = require("chalk");
const AzureSearch = require("./azure-search");
const logger = require("../../bin/logger");
const search = new AzureSearch();

let config = require("./config");

const action = () => {
  try {
    logger.info(
      chalk.blueBright(
        "Starting Azure Search ..." +
          `\nNow listening on:
    Azure Search Emulator listening on port http://` +
          config.serviceHost +
          ":" +
          config.servicePort
      )
    );
    search.start();
  } catch (err) {
    logger.error(chalk.blueBright.bgRed(err));
  }
};

module.exports = {
  commandName: "search-start",
  action: action
};
