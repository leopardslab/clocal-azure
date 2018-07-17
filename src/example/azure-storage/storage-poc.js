const azure = require('azure-storage');
const accountKey = 'Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==';
const accountName = 'devstoreaccount1';

var devStoreCreds = azure.generateDevelopmentStorageCredentials();

const blobService = azure.createBlobService(devStoreCreds);
const tableService = azure.createTableService(devStoreCreds);
const queueService = azure.createQueueService(devStoreCreds);

blobService.logger.level = azure.Logger.LogLevels.DEBUG
tableService.logger.level = azure.Logger.LogLevels.DEBUG
queueService.logger.level = azure.Logger.LogLevels.DEBUG

const container = 'taskcontainer';
const task = 'taskblob';
const filename = 'data.txt';

let proxyBlob = {
    protocol: 'http:',
    host: '127.0.0.1',
    port: 9569,
  };
  blobService.setProxy(proxyBlob);

let proxyQueue = {
    protocol: 'http:',
    host: '127.0.0.1',
    port: 9570
  };
    queueService.setProxy(proxyQueue);

let proxyTbl = {
    protocol: 'http:',
    host: '127.0.0.1',
    port: 9571,
  };
  tableService.setProxy(proxyTbl);

blobService.createContainerIfNotExists(container, error => {
  if (error) return console.log(error);
  blobService.createBlockBlobFromLocalFile(
   container,
    task,
    filename,
    (error, result) => {
      if (error) return console.log(error);
      console.dir(result, { depth: null, colors: true });
    }
  ); 
});

queueService.createQueueIfNotExists('taskqueue', "Hello world!", function(error, result, response) {
    if(!error){
      // Queue length is available in results.approximateMessageCount
      console.log(response);
    } else {
      console.log(error);
    }
});

tableService.createTableIfNotExists('mytable', function(error, result, response) {
    if (!error) {
      // result contains true if created; false if already exists
      console.dir(result)
    } else {
      console.log(error)
    }
  });
  