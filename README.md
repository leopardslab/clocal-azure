# Clocal Azure

[![Join the chat at https://gitter.im/cloudlibz/clocal-azure](https://badges.gitter.im/cloudlibz/clocal-azure.svg)](https://gitter.im/cloudlibz/clocal-azure?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Emulation engine for Azure 

_Clocal-azure_ provides an easy-to-use test/mocking framework for developing Cloud applications.

Currently features are under development.

# Overview

_clocal-azure_ spins up the following core Cloud APIs on your local machine:

* **Azure Functions** at http://localhost:9574
* **Azure Storage** at http://localhost:9569, http://localhost:9570, http://localhost:9571
* **Azure CosmosDB** at http://localhost:9581
* **Azure API App Service** at http://localhost:9567

## Implemented

### Azure Storage Endpoints

* **Azure Blob Service** at http://localhost:9569
* **Azure Queue Service** at http://localhost:9570
* **Azure Table Service** at http://localhost:9571


## Developing

Requirements \*

* NodeJS (^8.9.4)
* yarn (^1.6.0)
* Docker

```
1.  git clone https://github.com/cloudlibz/clocal-azure.git
```

```
2.  cd clocal-azure
```

```
3.  yarn
```

```
4.  yarn dev <command>
```

## Commands

* **Azure Functions** : ```clocal function-start, clocal function-stop ```
* **Azure Storage** : ```clocal storage-start, clocal storage-stop, clocal storage-clear```
* **Azure CosmosDB** : ```clocal cosmosdb-start, clocal cosmosdb-stop```
* **Azure API App Service** : ```clocal api-start <folder>/ <init-file>```
