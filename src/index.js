'use strict';

let Docker = require('dockerode');

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

docker.createContainer({
  Image: 'arafato/azurite',
  Tty: true,
  Cmd: ['/bin/sh'],
  ExposedPorts: {'10000/tcp': {}, '10001/tcp': {}, '10002/tcp': {} },
  PortBindings: {'10000/tcp': [{ 'HostPort': '9569' }],
  '10001/tcp':[{ 'HostPort': '9570'}],
  '10002/tcp':[{ 'HostPort': '9571'}]
  }, 
  
}, function(err, container) {
  if (err){
    console.log(err);
    return;
  }
  container.start({}, function(err, data) {
    if (err){
      console.log(err);
      return;
    }
     runExec(container);
  });
});

