#!/usr/bin/env node

'use strict';

const chalk = require('chalk');
const AzureFunction = require('./azure-function');
const functions = new AzureFunction();

const action = () => {
  try {
    console.log(chalk.blueBright(`
                  %%%%%%
                 %%%%%%
            @   %%%%%%    @
          @@   %%%%%%      @@
       @@@    %%%%%%%%%%%    @@@
     @@      %%%%%%%%%%        @@
       @@         %%%%       @@
         @@      %%%       @@
           @@    %%      @@
                %%
                %

    Now listening on: http://localhost:`+
    functions.port + ` Press Ctrl+C to shut down.`
  ));

    const res = functions.start();
  } catch (err) {
    console.log(chalk.blueBright.bgRed(err));
  }
};

module.exports = {
  commandName: 'func start',
  action: action,
};