const mysql = require("mysql");
const logger = require("../../bin/logger");
let config = require("./config");
let sql = {};

sql.connection = mysql.createConnection({
    host: config.serviceHost,
    user: config.databaseUser,
    password: config.databasePassword,
    database: config.databaseName,
    port: config.dbServicePort

  });

  sql.connection.connect(err => {
    if (!err) {
      logger.info("SQL Database connection success");
    } else {
      logger.error(
        "SQL Database connection failed \n Error: " +
          JSON.stringify(err, undefined, 2)
      );
    }
  });

  module.exports = sql;
  