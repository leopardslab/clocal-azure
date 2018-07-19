#!/usr/bin/env node

"use strict";

const chalk = require("chalk");
const AzureApiAppService = require("./azure-api-app-service");
const APIService = new AzureApiAppService();
// const prompt = require("prompt");
// let promptPath; 

const action = (cmd, path) => {
  try {
    // prompt.start();
    // prompt.get(['apipath'], function (err, result) {
    //   console.log('API Path: ' + result.apipath);
    //   if (result.apipath != undefined){
        const res = APIService.start();
        console.log(
          chalk.blueBright(
            "Starting azure api app service ..." +
              "\nNow listening on: http://localhost:" +
              APIService.port +
              ". Press Ctrl+C to shut down."
          )
        );
    //   } else{
    //     console.log("Something went wrong");
    //   }
    //   promptPath = result.apipath;
    // });
   
  } catch (err) {
    console.log(chalk.blueBright.bgRed(err));
  }
};

module.exports = {
  commandName: "api-start",
  // option:"-s, start', 'Start Command",
  argument: "<path>",
  action: action,
  // apiPath: promptPath
};
