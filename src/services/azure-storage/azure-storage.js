'use strict';

const CloudLocal = require ('./../azure/cloud-local');
let Docker = require('dockerode');

class AzureStorage extends CloudLocal {

}
let docker = new Docker({
  socketPath: '/var/run/docker.sock',
});

/**
 * Get env list from running container
 * @param container
 */
function runExec(container) {

  let options = {
    Cmd: ['sh', '-c', 'node bin/${executable} -l /opt/azurite/folder'],
    AttachStdout: true,
    AttachStderr: true
  };

  container.exec(options, function(err, exec) {
    if (err) {
      console.log(err);
      return;
    }
    exec.start(function(err, stream) {
      if (err){
        console.log(err);
        return;
      }
    
      container.modem.demuxStream(stream, process.stdout, process.stderr);

      exec.inspect(function(err, data) {
        if (err) {
          console.log(err);
          return;
        }
        console.log(data);
      });
    });
  });
}

var testContainer = 'clocal-azure-storage'

// docker.listContainers({all: true}, function(err, containers) {
//   console.log('ALL: ' + JSON.stringify(containers[0].Names));
//   console.log(containers)
//   docker.getContainer(containers[0].Id).remove(containers[0].Id);
// });

// docker.listContainers(function (err, containers) { 
//       // if (containers.length != 0){
//       containers.forEach(function (containerInfo) {
//         console.log(containerInfo);
//         docker.getContainer(containerInfo.Id).kill(containerInfo.Id)

//         });
//       }
      // else if (containers.length == 0 || containers.length == null){
      docker.createContainer({
        Image: 'arafato/azurite',
        // name: 'clocal-azure-storage',
        // Tty: true,
        // Cmd: ['/bin/sh'],
        ExposedPorts: {'10000/tcp': {}, '10001/tcp': {}, '10002/tcp': {} },
        PortBindings: {'10000/tcp': [{ 'HostPort': '9569' }],
        '10001/tcp':[{ 'HostPort': '9570'}],
        '10002/tcp':[{ 'HostPort': '9571'}]
        }, 
        
      }, function(err, container) {
        if (!container){
          console.log("Error ",err);
          // return;
        } else {
        container.start({}, function(err, data) {
          if (err){
            console.log(err);
            return;
          }
           runExec(container);
        });
      }
      });
    // }      
    

// });





// process.on('SIGINT', function() {
//   console.log("Caught interrupt signal");
//   docker.listContainers(function (err, containers) {
//     console.log(containers)
//     containers.forEach(function (containerInfo) {
//       console.log(containerInfo)
//       docker.getContainer(containerInfo.Id).kill(containerInfo.Id);
//     });
//   });
//     process.exit();
//   });

// });
// if (process.platform === "win32") {
//   var rl = require("readline").createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });

//   rl.on("SIGINT", function () {
//     process.emit("SIGINT");
//   });
// }

// process.on("SIGINT", function () {
//   docker.listContainers(function (err, containers) {
//     containers.forEach(function (containerInfo) {
//       docker.getContainer(containerInfo.Id).stop(cb);
//     });
//   });
//   //graceful shutdown
//   process.exit();
// });
 module.exports = AzureStorage