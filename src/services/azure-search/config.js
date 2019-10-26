let config = {};

config.serviceHost = "localhost";

config.servicePort = "9520";

config.dbServicePort = "3306";

config.nosqlDbServicePort = "27017";

config.databaseName = "mysampledb";

config.databaseUser = "root";

config.databasePassword = "";

config.databaseTable = "users";

config.searchable1 = "first_name";

config.searchable2 = "last_name";

config.filter1 = "first_name";

config.filter2 = "last_name";

config.filter3 = "email";

config.filter4 = "gender";

config.filter5 = "ip_address";

config.indexName = "idx_users";

config.indexSQLColumns = "first_name, last_name";

config.indexNoSQLColumns = { first_name: 1, last_name: 1 };

module.exports = config;
