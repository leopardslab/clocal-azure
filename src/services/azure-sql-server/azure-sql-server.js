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

class AzureSQL extends CloudLocal {
  start() {
    const optsc = {
      AttachStdin: true,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      OpenStdin: true,
      StdinOnce: false,
      Env: ["MYSQL_ROOT_PASSWORD=pwd"],
      Cmd: ["mysqld"],
      Image: "mysql/mysql-server",
      ExposedPorts: { "3306/tcp": {}, "33060/tcp": {} },
      PortBindings: {
        "3306/tcp": [{ HostPort: "3306" }],
        "33060/tcp": [{ HostPort: "33060" }]
      }
    };
    function handler(err, container) {
      if (err) throw err;
      const attach_opts = {
        stream: true,
        stdin: true,
        stdout: true,
        stderr: true
      };

      container.attach(attach_opts, function handler(err, stream) {
        if (err) throw err;

        // Show outputs
        stream.pipe(process.stdout);

        container.start(function(err, data) {
          if (err) throw err;
          setTimeout(function() {
            runExec(container);
          }, 50000);
          process.stdout.on("resize", function() {
            setTimeout(function() {
              runExec(container);
            }, 50000);
          });
        });
      });
    }

    docker.createContainer(optsc, handler);
  }
}
let previousKey,
  CTRL_P = "\u0010",
  CTRL_Q = "\u0011";

function runExec(container) {
  let options = {
    AttachStdin: true,
    AttachStdout: true,
    AttachStderr: true,
    Tty: true,
    OpenStdin: true,
    StdinOnce: true,
    Cmd: ["mysql", "-ppwd"]
  };
  container.exec(options, function(err, exec) {
    if (err) {
      logger.error(err);
      return;
    }
    const attach_opts = {
      stream: true,
      stdin: true,
      stdout: true,
      stderr: true
    };

    exec.start(attach_opts, function(err, stream) {
      if (err) {
        logger.error(err);
        return;
      }
      if (process.argv[2] == "sql-start") {
        // Show outputs
        stream.pipe(process.stdout);

        // Connect stdin
        let isRaw = process.isRaw;
        process.stdin.resume();
        process.stdin.setEncoding("utf8");
        process.stdin.setRawMode(true);
        process.stdin.pipe(stream);

        process.stdin.on("data", function(key) {
          // Detects it is detaching a running container
          if (previousKey === CTRL_P && key === CTRL_Q) exit(stream, isRaw);
          previousKey = key;
        });

        docker.getEvents({}, function (err, evtSource) {
          evtSource.on("data", function (data) {
            let dockerEventState = JSON.parse(String.fromCharCode.apply(String, data)); // Prevents unexpected tokens from being checked, unexpected token in JSON
            if (dockerEventState.Actor.Attributes.execID === exec.id && dockerEventState.status === "exec_die") {

              // As we cannot gracefully exit, we will forcefully kill and remove the container causing the terminal to update
              console.log(data);
              container.remove({ force: true })
              .then(function() {
                console.log("Successfully removed container");
              });
            }
          });
        });

        container.wait(function(err, data) {
          exit(stream, isRaw);
        });
      }
    });
  });
}

// Exit container
function exit(stream, isRaw) {
  process.stdin.removeAllListeners();
  process.stdin.setRawMode(isRaw);
  process.stdin.resume();
  stream.end();
  process.exit(0);
}

module.exports = AzureSQL;
