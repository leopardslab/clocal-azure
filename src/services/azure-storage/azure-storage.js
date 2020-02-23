"use strict";

const CloudLocal = require("./../azure/cloud-local");
const Docker = require("dockerode");
const logger = require("../../bin/logger");

let docker;

if (process.platform != "win32") {
  docker = new Docker({
    socketPath: "/var/run/docker.sock"
  });
} else {
  docker = new Docker({
    socketPath: "//./pipe/docker_engine"
  });
}

let commandHandlers = {
  "clocal storage-clear": clearFiles,
  "clocal storage-stop": removeContainer,
  "clocal storage-query": listFiles
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
}

function runExec(container) {
  let options = {
    Cmd: ["sh", "-c", "node bin/${executable} -l /opt/azurite/folder"],
    AttachStdout: true,
    AttachStderr: true
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
      } else if (inputService.includes("clocal storage-query")) {
        commandHandlers["clocal storage-query"](container, inputService);
      } else {
        logger.error("Invalid Command");
      }
    });
  }, 4000);
}

function removeContainer() {
  docker.listContainers(function(err, containers) {
    containers.forEach(function(containerInfo) {
      docker.getContainer(containerInfo.Id).kill(containerInfo.Id);
      setTimeout(function() {
        logger.info("Storage container stopped");
        return process.exit(0);
      }, 5000);
    });
  });
}

function listFiles(container, fileName) {
  fileName = fileName.split(" ")[2];
  let options;
  if (!fileName || fileName === "") {
    options = {
      Cmd: ["sh", "-c", `ls /opt/azurite/folder/*`],
      AttachStdout: true,
      AttachStderr: true
    };
  } else {
    options = {
      Cmd: ["sh", "-c", `ls "/opt/azurite/folder/${fileName}"`],
      AttachStdout: true,
      AttachStderr: true
    };
  }
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
      container.modem.demuxStream(stream, process.stdout, process.stdin);
      logger.info("All files listed.");
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
      logger.error(err);
      return;
    }
    exec.start(function(err, stream) {
      if (err) {
        logger.error(err);
        return;
      }
      container.modem.demuxStream(stream, process.stdout, process.stderr);
      logger.info("Storage successfully cleared.");
    });
  });
}

module.exports = AzureStorage;
