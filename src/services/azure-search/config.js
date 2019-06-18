const mysql = require("mysql");

let config = {};

config.serviceHost = 'localhost';

config.servicePort = '9520';

config.databaseName = 'mysampledb';

config.databaseUser = 'root';

config.databasePassword = '';

config.databaseTable = 'inventory';

config.searchValue1 = 'name';

config.searchValue2 = 'quantity';

config.column1 = 'id';

config.column2 = 'name';

config.column3 = 'quantity';

config.connection = mysql.createConnection({
    host: config.serviceHost,
    user: config.databaseUser,
    password: config.databasePassword,
    database: config.databaseName,
    port: '3306',

  });
  
module.exports = config;
