#!/usr/bin/env node

"use strict";

const program = require("commander");

const commandsArray = require("../services/index").commands;

program.version("1.0.0", "-v, --version").description("CLocal Azure");

const commandNameList = [];

commandsArray.map(command => {
  commandNameList.push(command.commandName);
  program.command(command.commandName).action(command.action);
});

program.command("list").action(() => {
  const commandNames = commandNameList.reduce((prev, current) => {
    return `${prev}\n${current}`;
  }, "");
  console.log(commandNameList.toString());
});

program.parse(process.argv);
