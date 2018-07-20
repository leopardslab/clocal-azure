"use strict";

const CloudLocal = require("./../azure/cloud-local");
const Docker = require("dockerode");

let docker = new Docker({
  socketPath: "/var/run/docker.sock"
});

class AzureCosmosDB extends CloudLocal {
  /**
   * Get env list from running container
   * @param container
   */

  start() {
    docker.createContainer(
      {
        Image: "microsoft/azure-cosmosdb-emulator",
        // name: 'clocal-azure-cosmosDb',
        Tty: true,
        Cmd: ["cmd"],
        ExposedPorts: {
          "8081/tcp": {},
          "10250/tcp": {},
          "10251/tcp": {},
          "10252/tcp": {},
          "10253/tcp": {},
          "10254/tcp": {}
        },
        PortBindings: {
          "8081/tcp": [{ HostPort: "9581" }]
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
          runExec(container);
        });
      }
    );
  }
}

function runExec(container) {
  let options = {
    Cmd: ["c:\\CosmosDBEmulator\\startemu.cmd"],
    AttachStdout: true,
    AttachStderr: true
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

      if (process.argv[2] == "cosmosdb") {
        container.modem.demuxStream(stream, process.stdout, process.stderr);
      }
    });
  });
}

module.exports = AzureCosmosDB;
