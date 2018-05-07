"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const chalk_1 = __importDefault(require("chalk"));
const azure_function_1 = __importDefault(require("../services/azure-functions/azure-function"));
const azure_api_management_1 = __importDefault(require("../services/azure-api-management/azure-api-management"));
const functions = new azure_function_1.default();
const apiManagement = new azure_api_management_1.default();
commander_1.default.version('1.0.0').description('Clocal azure');
commander_1.default.command('func start').action(() => {
    try {
        console.log(chalk_1.default.blueBright('starting azure functions ...'));
        const res = functions.start();
    }
    catch (err) {
        console.log(chalk_1.default.blueBright.bgRed(err));
    }
});
commander_1.default.command('api start').action(() => {
    try {
        console.log(chalk_1.default.blueBright('starting azure api management ...'));
        const res = apiManagement.start();
    }
    catch (err) {
        console.log(chalk_1.default.blueBright.bgRed(err));
    }
});
commander_1.default.command('start').action(() => {
    try {
        console.log(chalk_1.default.blueBright('- CLocal Azure \n ------------------- '));
        console.log(chalk_1.default.cyanBright('* Azure functions'));
        console.log('func start \nfunc stop');
        console.log(chalk_1.default.cyanBright('* Azure API Management'));
        console.log('api start');
    }
    catch (err) {
        console.log(chalk_1.default.blueBright.bgRed(err));
    }
});
commander_1.default.parse(process.argv);
//# sourceMappingURL=cli.js.map