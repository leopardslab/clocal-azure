'use strict';

const azureFunctions = require('./azure-functions/cli');

const commandsArray = [azureFunctions];

module.exports = {
  commands: commandsArray,
};