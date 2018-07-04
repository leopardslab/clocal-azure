const azure = require('azure-storage');
const accountKey = 'Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==';
const accountName = 'devstoreaccount1';

var devStoreCreds = azure.generateDevelopmentStorageCredentials();

const blobService = azure.createBlobService(devStoreCreds);

blobService.logger.level = azure.Logger.LogLevels.DEBUG

const container = 'taskcontainer';
const task = 'taskblob';
const filename = 'data.txt';

var proxy = {
    protocol: 'http:',
    host: '127.0.0.1',
    port: 9569,
  };
  blobService.setProxy(proxy);

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