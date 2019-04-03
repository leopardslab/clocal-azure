"use strict";

const CloudLocal = require("./../azure/cloud-local");
const Docker = require("dockerode");


// let docker = new Docker({
//   socketPath: "/var/run/docker.sock"
// });
let docker;
if(process.platform != 'win32'){
  docker = new Docker({
    socketPath: "/var/run/docker.sock"
  });
} else {
  docker = new Docker({
    socketPath: "//./pipe/docker_engine"
  })
} 

// let commandHandlers = {"storage": {"clear": clearFiles, "stop": removeContainer }}
let commandHandlers = {
  "clocal storage-clear": clearFiles,
  "clocal storage-stop": removeContainer
};

class AzureStorage extends CloudLocal {
  /**
   * Get env list from running container
   * @param container
   */

  start() {
    docker.createContainer(
      {
        Image: "arafato/azurite",
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
      if (process.argv[2] == "storage-start") {
        container.modem.demuxStream(stream, process.stdout, process.stderr);
        customTerminal(container);
      }
    });
  });
}

function customTerminal(container) {
  setTimeout(function() {
    console.log("$ Clocal >");
    let stdin = process.openStdin();
    stdin.addListener("data", function(d) {
      let inputService = d.toString().trim();
      if (
        inputService == "clocal storage-stop" ||
        inputService == "clocal storage-clear"
      ) {
        commandHandlers[inputService](container);
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
      setTimeout(function() {
        console.log("Storage container stopped");
        return process.exit(0);
      }, 5000);
    });
  });
}

function clearFiles(container) {
  let options = {
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
      console.log("Storage successfully cleared.");
    });
  });
}

module.exports = AzureStorage;
