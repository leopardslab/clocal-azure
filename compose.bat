@echo off

SET FUNCTIONFOLDER=example/azure-functions/function-sample
SET COSMOSFOLDER=src/services/azure-cosmosdb/cosmosdb-image
SET APIFOLDER=src/services/azure-api-app-service/Image/ContactList

docker-compose config
docker-compose up
