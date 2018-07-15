"use strict";

const CloudLocal = require("./../azure/cloud-local");
const http = require("http");
const Docker = require("dockerode");

let docker = new Docker({
  socketPath: "/var/run/docker.sock"
});

class AzureStorage extends CloudLocal {
  /**
   * Get env list from running container
   * @param container
   */

  init() {
    docker.createContainer(
      {
        Image: "arafato/azurite",
        // name: 'clocal-azure-storage',
        Tty: true,
        Cmd: ["/bin/sh"],
        ExposedPorts: { "10000/tcp": {}, "10001/tcp": {}, "10002/tcp": {} },
        PortBindings: {
          "10000/tcp": [{ HostPort: "9569" }],
          "10001/tcp": [{ HostPort: "9570" }],
          "10002/tcp": [{ HostPort: "9571" }]
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
    Cmd: ["sh", "-c", "node bin/${executable} -l /opt/azurite/folder"],
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

      if (process.argv[2] == "storage") {
        container.modem.demuxStream(stream, process.stdout, process.stderr);
        customTerminal(container);
      }

      // exec.inspect(function(err, data) {
      //   if (err) {
      //     console.log(err);
      //     return;
      //   }
      //   console.log(data);
      // });
    });
  });
}

function customTerminal(container) {
  setTimeout(function() {
    console.log("$ Clocal >");
    let stdin = process.openStdin();
    stdin.addListener("data", function(d) {
      if (d.toString().trim() == "clocal storage stop") {
        removeContainer();
        setTimeout(function() {
          return process.exit(0);
        }, 5000);
      } else if (d.toString().trim() == "clocal storage clear") {
        // deleteBlob();
        clearFiles(container);
      } else {
        console.log("Invalid Command");
      }
    });
  }, 4000);
}

function removeContainer() {
  docker.listContainers(function(err, containers) {
    containers.forEach(function(containerInfo) {
      docker.getContainer(containerInfo.Id).kill(containerInfo.Id);
      if (process.argv[2] == "storage") {
        console.log("Storage container stopped");
      }
    });
  });
}

function clearFiles(container) {
      let options = {
        // Cmd: ["rm -rf folder"],
        // Cmd: ["/bin/sh","folder", "rm -rf /"],
        // Cmd: ["rm", "/opt/azurite/folder/__blobstorage__"],
        Cmd: ["sh", "-c", "rm -rf /opt/azurite/folder/*"],
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
          container.modem.demuxStream(stream, process.stdout, process.stderr);
          console.log("Storage successfully deleted.")
        });
      });
}

module.exports = AzureStorage;
