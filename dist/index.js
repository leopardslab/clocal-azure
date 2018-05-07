// import commander from 'commander';
// import chalk from 'chalk';
// import AzureFunction from './services/azure-functions/azure-function';
// import AzureApiManagement from './services/azure-api-management/azure-api-management';
// const functions = new AzureFunction();
// const apiManagement = new AzureApiManagement();
// commander.version('1.0.0').description('Clocal azure');
// commander.command('func start').action(() => {
//   try {
//     console.log(chalk.blueBright('starting azure functions ...'));
//     const res = functions.start();
//   } catch (err) {
//     console.log(chalk.blueBright.bgRed(err));
//   }
// });
// commander.command('api start').action(() => {
//   try{
//     console.log(chalk.blueBright('starting azure api management ...'));
//     const res = apiManagement.start();
//   } catch (err) {
//     console.log(chalk.blueBright.bgRed(err));
//   }
// });
// commander.command('help').action(() => {
//   try {
//     console.log(chalk.blueBright('- CLocal Azure Help - \n ------------------- '));
//     console.log(chalk.cyanBright('* Azure functions'));
//     console.log('func start \nfunc stop');
//     console.log(chalk.cyanBright('* Azure API Management'));
//     console.log('api start');
//   } catch (err){
//     console.log(chalk.blueBright.bgRed(err));
//   }
// }) 
// commander.parse(process.argv);
//# sourceMappingURL=index.js.map