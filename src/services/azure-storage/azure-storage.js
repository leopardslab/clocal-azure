"use strict";

const CloudLocal = require("./../azure/cloud-local");
let Docker = require("dockerode");
const prompt = require('inquirer');


let docker = new Docker({
  socketPath: "/var/run/docker.sock"
});

class AzureStorage extends CloudLocal {
  /**
   * Get env list from running container
   * @param container
   */

  init() {
    docker.listContainers(function(err, containers) {
      if (containers.length != 0) {
        containers.forEach(function(containerInfo) {
          docker.getContainer(containerInfo.Id).kill(containerInfo.Id);
          if (process.argv[2] == "storage") {
            console.log("Previous storage container stopped");
          }
        });
      } else if (containers.length == 0 || containers.length == null) {
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
              //  runExec(container);
              let options = {
                Cmd: [
                  "sh",
                  "-c",
                  "node bin/${executable} -l /opt/azurite/folder"
                ],
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
                    container.modem.demuxStream(
                      stream,
                      process.stdout,
                      process.stderr
                    );
                    customTerminal();
                  }

                  function customTerminal() {
                    setTimeout(function() {
                      console.log("Enter your command")
                      var stdin = process.openStdin();
                        stdin.addListener("data", function(d) {
                            console.log("you entered: [" + 
                                d.toString().trim() + "]");
                          });
                    }, 2000);
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
            });
          }
        );
      }
    });
  }

  // runExec(container) {

  // }
}

module.exports = AzureStorage;
