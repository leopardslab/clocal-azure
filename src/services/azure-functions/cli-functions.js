#!/usr/bin/env node

'use strict';

const chalk = require('chalk');
const AzureFunction = require('./azure-function');
const functions = new AzureFunction();

const action = () => {
  try {
    const res = functions.start();
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

    \nNow listening on: http://localhost:`+
    functions.port + ` Press Ctrl+C to shut down.\nNote: Currently HTTP Trigger functions working.`
    
  ));

  } catch (err) {
    console.log(chalk.blueBright.bgRed(err));
  }
};

module.exports = {
  commandName: 'function-start',
  // option:"-p, --path', 'Path for the file",
  argument: '<path>',
  action: action,
};