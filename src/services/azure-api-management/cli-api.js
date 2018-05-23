#!/usr/bin/env node

'use strict';

const chalk = require('chalk');
const AzureAPIManagement = require('./azure-api-management');
const APIManagement = new AzureAPIManagement();

const action = () => {
  try {
    console.log(chalk.blueBright('starting azure api management ...'));
    const res = APIManagement.start();
  } catch (err) {
    console.log(chalk.blueBright.bgRed(err));
  }
};

module.exports = {
  commandName: 'api start',
  action: action,
};