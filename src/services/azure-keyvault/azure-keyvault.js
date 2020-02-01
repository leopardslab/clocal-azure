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
  "clocal keyvault-stop": removeContainer
};

class AzureStorage extends CloudLocal {
  /**
   * Get env list from running container
   * @param container
   */

  start() {
    let currentPath = process.cwd();
    docker.createContainer(
      {
        Image: "vault",
        Tty: true,
        ExposedPorts: { "8200/tcp": {}, "8201/tcp": {} },

        HostConfig: {
          Binds: [
            "/" +
              currentPath +
              "/src/services/azure-keyvault/example:/tmp/example/",
            "/" + currentPath + "/src/services/azure-keyvault/logs:/tmp/logs/"
          ],
          PortBindings: {
            "8200/tcp": [{ HostPort: "8200" }],
            "8201/tcp": [{ HostPort: "8201" }]
          }
        },
        Cmd: ["sh"]
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
    Cmd: ["vault", "server", "-config", `/tmp/example/config.hcl`],
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
      if (process.argv[2] == "keyvault-start") {
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
      if (inputService === "clocal keyvault-stop") {
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
        logger.info("Key Vault container stopped");
        return process.exit(0);
      }, 5000);
    });
  });
}

module.exports = AzureStorage;
