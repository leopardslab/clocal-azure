#!/usr/bin/env node

"use strict";
const common = require('../common/cli');
const chalk = require("chalk");
const AzureStorage = require("./azure-storage");
const storage = new AzureStorage();

const action = () => {
  try {
    console.log(common.figlet());
    console.log(
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
    console.log(chalk.blueBright.bgRed(err));
  }
};

module.exports = {
  commandName: "storage-start",
  action: action
};
