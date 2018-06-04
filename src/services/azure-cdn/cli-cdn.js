#!/usr/bin/env node

'use strict';

const chalk = require('chalk');
const AzureCDN = require('./azure-cdn');
const CDN = new AzureCDN();

const action = () => {
  try {
    console.log(chalk.blueBright('starting azure cdn ...'));
    const res = CDN.start();
  } catch (err) {
    console.log(chalk.blueBright.bgRed(err));
  }
};

module.exports = {
  commandName: 'cdn start',
  // option:"-p, --path', 'Path for the file",
  action: action
};