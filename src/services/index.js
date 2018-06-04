'use strict';

const azureFunctions = require('./azure-functions/cli-functions');
const azureAPIManagement = require('./azure-api-management/cli-api');
const azureCDN = require('./azure-cdn/cli-cdn');
const azureStorage = require('./azure-storage/cli-storage');

const commandsArray = [azureFunctions, azureAPIManagement, azureCDN, azureStorage];

module.exports = {
  commands: commandsArray,
};
