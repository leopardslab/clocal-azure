const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect('mongodb://'+ config.serviceHost +':'+ config.nosqlDbServicePort +'/' + config.databaseName, { useNewUrlParser: true });
let mongoSchema =   mongoose.Schema;

let userSchema  = {
    [config.filter1] : String,
    [config.filter2] : String,
    [config.filter3]: String,
    [config.filter4]: String,
    [config.filter5]: String,
};

module.exports = mongoose.model(config.databaseTable, userSchema);
