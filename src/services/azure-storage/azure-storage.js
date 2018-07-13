"use strict";

const CloudLocal = require("./../azure/cloud-local");
let Docker = require("dockerode");

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
          //  runExec(container);
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
                container.modem.demuxStream(
                  stream,
                  process.stdout,
                  process.stderr
                );
                customTerminal();
              }

              function customTerminal() {
                setTimeout(function() {
                  console.log("$ Clocal >");
                  var stdin = process.openStdin();
                  stdin.addListener("data", function(d) {
                    if (d.toString().trim() == "clocal storage stop") {
                      docker.listContainers(function(err, containers) {
                        containers.forEach(function(containerInfo) {
                          docker
                            .getContainer(containerInfo.Id)
                            .kill(containerInfo.Id);
                          if (process.argv[2] == "storage") {
                            console.log("Storage container stopped");
                          }
                        });
                      });

                      setTimeout(function() {
                        return process.exit(0);
                      }, 5000);
                    }
                  });
                }, 4000);
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
}

module.exports = AzureStorage;
