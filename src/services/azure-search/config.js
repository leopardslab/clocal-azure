const mysql = require("mysql");

let config = {};

config.serviceHost = 'localhost';

config.servicePort = '9520';

config.dbServicePort = '3306';

config.databaseName = 'mysampledb';

config.databaseUser = 'root';

config.databasePassword = '';

config.databaseTable = 'inventory';

config.searchable1 = 'name';

config.searchable2 = 'quantity';

config.filter1 = 'id';

config.filter2 = 'name';

config.filter3 = 'quantity';

config.indexName = 'idx_inventory';

config.indexColumns = 'name, quantity';

config.connection = mysql.createConnection({
    host: config.serviceHost,
    user: config.databaseUser,
    password: config.databasePassword,
    database: config.databaseName,
    port: config.dbServicePort

  });
  
module.exports = config;
