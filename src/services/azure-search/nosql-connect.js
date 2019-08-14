const mongoose = require('mongoose');
const logger = require("../../bin/logger");
const config = require('./config');

mongoose.connect('mongodb://'+ config.serviceHost +':'+ config.nosqlDbServicePort +'/' + config.databaseName, { useNewUrlParser: true }, err => {
    if (!err) {
      logger.info("NoSQL Database connection success");
    } else {
      logger.error(
        "NoSQL database connection failed \n Error: " +
          JSON.stringify(err, undefined, 2)
      );
    }
  }
  );
// let mongoSchema =   mongoose.Schema;

let userSchema  = mongoose.Schema ({
    [config.filter1] : String,
    [config.filter2] : String,
    [config.filter3]: String,
    [config.filter4]: String,
    [config.filter5]: String,
});

module.exports = mongoose.model(config.databaseTable, userSchema);
