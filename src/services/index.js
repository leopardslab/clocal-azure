"use strict";

const azureFunctions = require("./azure-functions/cli-functions");
const azureAPIService = require("./azure-api-app-service/cli-api");
const azureCosmosDB = require("./azure-cosmosdb/cli-cosmosdb");
const azureStorage = require("./azure-storage/cli-storage");
const azureCli = require("./azure-cli/cli-cli");
const azureSearch = require("./azure-search/cli-search");
const azureSQL = require("./azure-sql-server/cli-sql-server");
const azureKeyVault = require("./azure-keyvault/cli-keyvault");

const commandsArray = [
  azureFunctions,
  azureAPIService,
  azureCosmosDB,
  azureStorage,
  azureCli,
  azureSearch,
  azureSQL,
  azureKeyVault
];

module.exports = {
  commands: commandsArray
};
