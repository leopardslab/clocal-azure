"use strict";

const CloudLocal = require("./../azure/cloud-local");
const Docker = require("dockerode");
const stream = require("stream");
const chalk = require("chalk");
const tar = require("tar-fs");

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

let workingDir = "./example/azure-functions/";
let folder;

if (process.argv[2] == "function-init") {
  folder = process.argv[3];
}

let commandHandlers = {
  "clocal function-start": startContainer,
  "clocal function-stop": removeContainer
};

class AzureFunction extends CloudLocal {
  start() {
    let tarStream = tar.pack(workingDir + folder);
    docker.buildImage(
      tarStream,
      {
        t: "azure-functions-image"
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
        inputService == "clocal function-start" ||
        inputService == "clocal function-stop"
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
      Image: "azure-functions-image",
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
    Cmd: ["sh"],
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
      container.modem.demuxStream(stream, process.stdout, process.stderr);
    });
  });
}
import sleeps from "./sleeps.js";
 
...
 
    if (sleeps.has_required_params(req)) {
        const target = moment({year: req.query.year,
            month: (parseInt(req.query.month) - 1), // JS Dates are zero indexed!!!
            day: req.query.day });
 
...


function removeContainer() {
  docker.listContainers(function(err, containers) {
    containers.forEach(function(containerInfo) {
      docker.getContainer(containerInfo.Id).kill(containerInfo.Id);
      setTimeout(function() {
        console.log("Functions container stopped");
        return process.exit(0);
      }, 5000);
    });
  });
}
import sleeps from "./sleeps.js";
 
test("Request has required parameters", 
    function (t) {
        const req = { "query" : {}};
        t.false(sleeps.has_required_params(req));
    });


module.exports = AzureFunction;
