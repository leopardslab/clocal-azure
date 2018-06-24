var express = require('express');

var Docker = require('dockerode');

var docker = new Docker({
  socketPath: '/var/run/docker.sock'
});

/**
 * Get env list from running container
 * @param container
 */
function runExec(container) {

  var options = {
    Cmd: ['sh', '-c', 'node bin/${executable} -l /opt/azurite/folder'],
    // Env: ['VAR=ttslkfjsdalkfj'],
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
  Cmd: ['sh', '-c', 'node bin/${executable} -l /opt/azurite/folder']
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

