const mysql = require("mysql");
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
      console.log("SQL Database connection success");
    } else {
      console.log(
        "SQL Database connection failed \n Error: " +
          JSON.stringify(err, undefined, 2)
      );
    }
  });

  module.exports = sql;
  