#!/usr/bin/env node

"use strict";

const chalk = require("chalk");
const AzureStorage = require("./azure-storage");
const logger = require("../../bin/logger");
const storage = new AzureStorage();

const action = () => {
  try {
    logger.info(
      chalk.blueBright(
        "Starting Azure Storage ..." +
          `\nNow listening on:
    Azure Blob Storage Emulator listening on port http://localhost:9569
    Azure Queue Storage Emulator listening on port http://localhost:9570
    Azure Table Storage Emulator listening on port http://localhost:9571
Enter \"clocal storage-stop\" to stop service.`
      )
    );
    const res = storage.start();
  } catch (err) {
    logger.error(chalk.blueBright.bgRed(err));
  }
};

module.exports = {
  commandName: "storage-start",
  action: action
};
