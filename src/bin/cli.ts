import commander from 'commander';
import chalk from 'chalk';
import AzureFunction from '../services/azure-functions/azure-function';
import AzureApiManagement from '../services/azure-api-management/azure-api-management';
import AzureStorage from '../services/azure-storage/azure-storage';
import AzureCDN from '../services/azure-cdn/azure-cdn';

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
