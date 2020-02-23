"use strict";

const CloudLocal = require("./../azure/cloud-local");
const Docker = require("dockerode");
const tar = require("tar-fs");
const logger = require("../../bin/logger");

let docker = new Docker({
  socketPath: "//./pipe/docker_engine"
});

let commandHandlers = {
  "clocal cosmosdb-start": startContainer,
  "clocal cosmosdb-stop": removeContainer
};

class AzureCosmosDB extends CloudLocal {
  /**
   * Get env list from running container
   * @param container
   */
  start() {
    let tarStream = tar.pack("./src/services/azure-cosmosdb/cosmosdb-image");
    docker.buildImage(
      tarStream,
      {
        t: "azure-cosmosdb-image"
      },
      function(err, stream) {
        stream.pipe(
          process.stdout,
          {
            end: true
          }
        );
        stream.on("end", function() {
          customTerminal();
        });
      }
    );
  }
}

function customTerminal(container) {
  setTimeout(function() {
    console.log("$ Clocal >");
    let stdin = process.openStdin();
    stdin.addListener("data", function(d) {
      let inputService = d.toString().trim();
      if (
        inputService == "clocal cosmosdb-start" ||
        inputService == "clocal cosmosdb-stop"
      ) {
        commandHandlers[inputService](container);
      } else {
        console.log("Invalid Command");
      }
    });
  }, 4000);
}

function startContainer() {
  docker.createContainer(
    {
      Image: "azure-cosmosdb-image",
      Tty: true,
      AttachStderr: true,
      AttachStdout: true,
      AttachStdin: true,
      OpenStdin: true,
      StdinOnce: true,
      HostConfig: {
        Memory: 2048
      },
      Cmd: ["cmd"],
      ExposedPorts: {
        "8081/tcp": {},
        "10250/tcp": {},
        "10250/tcp": {},
        "10251/tcp": {},
        "10252/tcp": {},
        "10253/tcp": {},
        "10254/tcp": {}
      },
      HostConfig: {
        PortBindings: {
          "8081/tcp": [{ HostPort: "9500" }],
          "10250/tcp": [{ HostPort: "9502" }],
          "10251/tcp": [{ HostPort: "9503" }],
          "10252/tcp": [{ HostPort: "9504" }],
          "10253/tcp": [{ HostPort: "9505" }],
          "10254/tcp": [{ HostPort: "9506" }]
        }
      }
    },
    function(err, container) {
      if (err) {
        logger.error(err);
        return;
      }
      container.start({}, function(err, data) {
        if (err) {
          logger.error(err);
          return;
        }
        runExec(container);
      });
    }
  );
}

function runExec(container) {
  let options = {
    Cmd: ["c:\\CosmosDBEmulator\\startemu.cmd"],
    AttachStderr: true,
    AttachStdout: true,
    AttachStdin: true,
    Tty: true
  };
  container.exec(options, function(err, exec) {
    if (err) {
      logger.error(err);
      return;
    }
    exec.start(function(err, stream) {
      if (err) {
        logger.error(err);
        return;
      }
      container.modem.demuxStream(stream, process.stdout, process.stderr);
    });
  });
}

function removeContainer() {
  docker.listContainers(function(err, containers) {
    containers.forEach(function(containerInfo) {
      docker.getContainer(containerInfo.Id).kill(containerInfo.Id);
      setTimeout(function() {
        logger.info("Cosmos DB container stopped");
        return process.exit(0);
      }, 5000);
    });
  });
}

module.exports = AzureCosmosDB;
