"use strict";

const CloudLocal = require("./../azure/cloud-local");
const Docker = require("dockerode");

let docker;
if (process.platform !== "win32") {
  docker = new Docker({
    socketPath: "/var/run/docker.sock"
  });
} else {
  docker = new Docker({
    socketPath: "//./pipe/docker_engine"
  });
}

class AzureCLI extends CloudLocal {
  start() {
    const optsc = {
      AttachStdin: true,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      OpenStdin: true,
      StdinOnce: false,
      Cmd: ["bash"],
      Image: "microsoft/azure-cli"
    };

    let previousKey,
      CTRL_P = "\u0010",
      CTRL_Q = "\u0011";

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

        container.start(function(err, data) {
          if (err) throw err;
          resize(container);
          process.stdout.on("resize", function() {
            resize(container);
          });

          container.wait(function(err, data) {
            exit(stream, isRaw);
          });
        });
      });
    }

    // Resize tty
    function resize(container) {
      let dimensions = {
        h: process.stdout.rows,
        w: process.stderr.columns
      };

      if (dimensions.h !== 0 && dimensions.w !== 0) {
        container.resize(dimensions, function() {});
      }
    }

    // Exit container
    function exit(stream, isRaw) {
      process.stdout.removeListener("resize", resize);
      process.stdin.removeAllListeners();
      process.stdin.setRawMode(isRaw);
      process.stdin.resume();
      stream.end();
      process.exit();
    }

    docker.createContainer(optsc, handler);
  }
}

module.exports = AzureCLI;
