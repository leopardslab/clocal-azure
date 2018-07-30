"use strict";

const CloudLocal = require("./../azure/cloud-local");
const Docker = require("dockerode");

let docker = new Docker({
  // socketPath: "//./pipe/docker_engine"
  socketPath: "/var/run/docker.sock"

});

class AzureCosmosDB extends CloudLocal {
  /**
   * Get env list from running container
   * @param container
   */
  start() {
    docker.buildImage(
      "./src/services/azure-cosmosdb/azure-cosmosdb-image.tar",
      {
        t: "azure-cosmosdb"
      },
      function(err, stream) {
        console.log(err);
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
      if (d.toString().trim() == "clocal cosmosdb-start") {
        startContainer();
      } else if (d.toString().trim() == "clocal cosmosdb-stop") {
        removeContainer();
        setTimeout(function() {
          console.log("CosmosDB container stopped");
          return process.exit(0);
        }, 5000);
      } else {
        console.log("Invalid Command");
      }
    });
  }, 4000);
}

function startContainer(){
  docker.createContainer(
    {
      // Image: "microsoft/azure-cosmosdb-emulator",
      Image: "azure-cosmosdb",
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
      HostConfig: {
        PortBindings: {
          "8081/tcp": [{HostPort: "9500"}],
          "10250/tcp": [{HostPort: "9502"}],
          "10251/tcp": [{HostPort: "9503"}],
          "10252/tcp": [{HostPort: "9504"}],
          "10253/tcp": [{HostPort: "9505"}],
          "10254/tcp": [{HostPort: "9506"}]
        }
      }
    },
    function(err, container) {
      if (err) {
        console.log(err);
        return;
      }
      container.start({}, function(err, data) {
        if (err) {
          console.log(err);
          return;
        }
        container.inspect(function(err, data) {
          console.log(data);
        });
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
    OpenStdin: true,
    StdinOnce: true,
    Tty: true
  };

  container.exec(options, function(err, exec) {
    if (err) {
      console.log(err);
      return;
    }
    exec.start(function(err, stream) {
      if (err) {
        console.log(err);
        return;
      }
      if (process.argv[2] == "cosmosdb-start") {
        container.modem.demuxStream(stream, process.stdout, process.stderr);
      }
    });
  });
}

function removeContainer() {
  docker.listContainers(function(err, containers) {
    containers.forEach(function(containerInfo) {
      docker.getContainer(containerInfo.Id).kill(containerInfo.Id);
    });
  });
}

module.exports = AzureCosmosDB;
