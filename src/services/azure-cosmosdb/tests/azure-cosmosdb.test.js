import test, { beforeEach, afterEach } from "ava";
import http from "ava-http";
const Docker = require("dockerode");
const tar = require("tar-fs");

if (process.platform != "win32") {
  docker = new Docker({
    socketPath: "/var/run/docker.sock"
  });
} else {
  docker = new Docker({
    socketPath: "//./pipe/docker_engine"
  });
}

function timeout(ms, fn) {
  return function(t) {
    setTimeout(() => {
      t.fail("Timeout error!");
      t.end();
    }, ms);
    fn(t);
  };
}

test(
  "Build Image",
  timeout(60000, t => {
    function handler(err, stream) {
      t.is(err, null);
      t.is(stream, true);
      stream.pipe(
        process.stdout,
        {
          end: true
        }
      );
      stream.on("end", function() {
        done();
      });
    }
    let tarStream = tar.pack("./src/services/azure-cosmosdb/cosmosdb-image");
    docker.buildImage(
      tarStream,
      {
        t: "azure-cosmosdb-image"
      },
      handler
    );
    t.pass();
  })
);

test(
  "Create container",
  timeout(60000, t => {
    docker.createContainer(
      {
        Image: "azure-cosmosdb-image",
        AttachStdin: false,
        AttachStdout: true,
        AttachStderr: true,
        Tty: true,
        Cmd: ["cmd"],
        OpenStdin: false,
        StdinOnce: false
      },
      function(err, container) {
        t.is(err, null);
        t.is(container, true);
      }
    );
    t.pass();
  })
);
