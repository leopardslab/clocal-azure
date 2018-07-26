"use strict";

const CloudLocal = require("./../azure/cloud-local");
const Docker = require("dockerode");
const stream = require("stream");
const chalk = require("chalk");

let docker = new Docker({
  socketPath: "/var/run/docker.sock"
});
let workingDir = "./example/azure-functions/";
let initFile;
let folder;

if (process.argv[2] == "function-init") {
  folder = process.argv[3];
  initFile = process.argv[4];
}

class AzureFunction extends CloudLocal {
  start() {
    docker.buildImage(
      workingDir+folder+'/'+initFile,
      {
        t: "azurefunctiondemo"
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
      if (d.toString().trim() == "clocal function-start") {
        startContainer();
      } else if (d.toString().trim() == "clocal function-stop") {
        removeContainer();
        setTimeout(function() {
          console.log("Functions container stopped");
          return process.exit(0);
        }, 5000);
      } else {
        console.log("Invalid Command");
      }
    });
  }, 4000);
}

function startContainer() {
  docker.createContainer(
    {
      Image: "azurefunctiondemo",
      Tty: true,
      Cmd: ["/bin/sh"],
      ExposedPorts: { "80/tcp": {} },
      PortBindings: {
        "80/tcp": [{ HostPort: "9574" }]
      }
    },
    function(err, container) {
      if (err) {
        console.log(err);
        return;
      }
      container.start({}, function(err, data) {
        if (err) {
          containerLogs(container);

          console.log(err);
          return;
        }
        console.log("Starting azure function container");
        console.log(
          chalk.blueBright(
            `
                      %%%%%%
                     %%%%%%
                @   %%%%%%    @
              @@   %%%%%%      @@
           @@@    %%%%%%%%%%%    @@@
         @@      %%%%%%%%%%        @@
           @@         %%%%       @@
             @@      %%%       @@
               @@    %%      @@
                    %%
                    %
    
        \nNow listening on: http://localhost:9574` +
              ` Clocal function-stop to shut down.\nNote: Currently HTTP Trigger functions working.`
          )
        );
        runExec(container);
      });
    }
  );
}

function runExec(container) {
  let options = {
    Cmd: ["sh", "-c", "cp /grpc/libs/opt/libgrpc_csharp_ext.so.1.12.1 /output"],
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
      if (process.argv[2] == "function-start") {
        container.modem.demuxStream(stream, process.stdout, process.stderr);
        customTerminal(container);
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

function containerLogs(container) {
  // create a single stream for stdin and stdout
  var logStream = new stream.PassThrough();
  logStream.on("data", function(chunk) {
    console.log(chunk.toString("utf8"));
  });

  container.logs(
    {
      follow: true,
      stdout: true,
      stderr: true
    },
    function(err, stream) {
      if (err) {
        return logger.error(err.message);
      }
      container.modem.demuxStream(stream, logStream, logStream);
      stream.on("end", function() {
        logStream.end("!stop!");
      });

      setTimeout(function() {
        stream.destroy();
      }, 2000);
    }
  );
}

module.exports = AzureFunction;
