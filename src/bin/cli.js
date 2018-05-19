const commander = require('commander');
const chalk = require('chalk');

const AzureFunction = require('../services/azure-functions/azure-function');
const AzureApiManagement = require('../services/azure-api-management/azure-api-management');
const AzureStorage = require('../services/azure-storage/azure-storage');
const AzureCDN = require('../services/azure-cdn/azure-cdn');

const functions = new AzureFunction();
const apiManagement = new AzureApiManagement();
const storage = new AzureStorage();
const CDN = new AzureCDN();

commander.version('1.0.0').description('Clocal azure');

commander.command('func start').action(() => {
  try {
    console.log(chalk.blueBright('starting azure functions ...'));
    const res = functions.start();
  } catch (err) {
    console.log(chalk.blueBright.bgRed(err));
  }
});

commander.command('storage start').action(() => {
    try{
      console.log(chalk.blueBright('starting azure storage ...'));
      const res = storage.start();
    } catch (err) {
      console.log(chalk.blueBright.bgRed(err));
    }
  });

commander.command('cdn start').action(() => {
    try{
      console.log(chalk.blueBright('starting azure CDN ...'));
      const res = CDN.start();
    } catch (err) {
      console.log(chalk.blueBright.bgRed(err));
    }
  });

commander.command('api start').action(() => {
  try{
    console.log(chalk.blueBright('starting azure api management ...'));
    const res = apiManagement.start();
  } catch (err) {
    console.log(chalk.blueBright.bgRed(err));
  }
});

commander.parse(process.argv);
