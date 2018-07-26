# Clocal Azure

![CLocal-Azure](./src/assets/clocal-logo.png)

![[CLocal-Azure](https://github.com/cloudlibz/clocal-azure)](https://img.shields.io/badge/CLocal-Azure-blue.svg)
[![Join the chat at https://gitter.im/cloudlibz/clocal-azure](https://badges.gitter.im/cloudlibz/clocal-azure.svg)](https://gitter.im/cloudlibz/clocal-azure?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Emulation engine for Azure Services 

_Clocal-azure_ provides an easy-to-use test/mocking framework for developing Cloud applications.

Currently features are under development.

# Overview

_Clocal-azure_ spins up the following core Cloud APIs on your local machine:

## Services & Ports
* **Azure Functions** at http://localhost:9574
* **Azure Storage** at http://localhost:9569 (Blobs), http://localhost:9570 (Queues), http://localhost:9571 (Tables)
* **Azure CosmosDB** at http://localhost:9581
* **Azure API App Service** at http://localhost:9567

## Getting Started

### Requirements \*

* NodeJS (^8.9.4)
* yarn (^1.6.0)
* Docker

### Steps

Step 1: Clone the project
```
git clone https://github.com/cloudlibz/clocal-azure.git
```

Step 2: Go to the working directory
```
cd clocal-azure
```

Step 3: Install yarn and dependencies
```
yarn
```

Step 4: Run the commands via following method
```
yarn dev <command> 
```
or
```
clocal <command>
```

## Commands

### All Services at once

Go to root folder where docker compose file is located.
```
docker-compose up
```

### Azure Functions 

* **Init Functions**
```
clocal function-init <folder> <init-file>
```
Azure functions working directory is located in example/azure-functions.
You can create a folder inside the location and give the folder location.
Then attach the init file where the service starting file.

Example: ```clocal function-init function-sample function-sample.tar```

* **Start Functions**
```
clocal function-start
```
* **Stop Functions**
```
 clocal function-stop 
 ```

### Azure Storage 
Azure storage comprises of azure blobs, queues and tables. See the example/azure-storage for sample project.

* **Start Storage**
```
clocal storage-start
```
* **Stop Storage**
```
clocal storage-stop
```
* **Clear all files created**
```
clocal storage-clear
```

### Azure CosmosDB 

* **Start CosmosDB**
```
clocal cosmosdb-start
```
* **Stop CosmosDB**
```
clocal cosmosdb-stop
```

### Azure API App Service 

Azure API working directory is located in example/azure-api-service.
You can create a folder inside the location and give the folder location.
Then attach the init file where the service starting file.

Example: ```clocal api-start api-sample api.json```

```
clocal api-start <folder> <init-file>
```

## Examples Documents

* **[Azure Functions](./docs/azure-functions.md)**
* **[Azure Storage](./docs/azure-storage.md)**

## Testing

```
yarn test
```



