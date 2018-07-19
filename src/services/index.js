"use strict";

const azureFunctions = require("./azure-functions/cli-functions");
const azureAPIService = require("./azure-api-app-service/cli-api");
const azureCosmosDB = require("./azure-cosmosdb/cli-cosmosdb");
const azureStorage = require("./azure-storage/cli-storage");

const commandsArray = [azureFunctions, azureAPIService, azureCosmosDB, azureStorage];

module.exports = {
  commands: commandsArray
};
