"use strict";

const azureFunctions = require("./azure-functions/cli-functions");
const azureAPIService = require("./azure-api-app-service/cli-api");
const azureCDN = require("./azure-cdn/cli-cdn");
const azureStorage = require("./azure-storage/cli-storage");

const commandsArray = [azureFunctions, azureAPIService, azureCDN, azureStorage];

module.exports = {
  commands: commandsArray
};
