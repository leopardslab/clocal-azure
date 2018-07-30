var config = {}

config.host = process.env.HOST || "[URI for DocumentDB endpoint]";
config.authKey = process.env.AUTH_KEY || "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";
config.databaseId = "ToDoList";
config.collectionId = "Items";

module.exports = config;
