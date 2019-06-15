const mysql = require("mysql");

let config = {};

config.serviceHost = 'localhost';

config.servicePort = '9520';

config.databaseName = 'employeedb';

config.databaseUser = 'root';

config.databasePassword = '';

config.databaseTable = 'customer';

config.searchValue1 = 'name';

config.searchValue2 = 'email';

config.column1 = 'id';

config.column2 = 'name';

config.column3 = 'email';

config.column4 = 'phone';

config.connection = mysql.createConnection({
    host: config.serviceHost,
    user: config.databaseUser,
    password: config.databasePassword,
    database: config.databaseName
  });
  
module.exports = config;
