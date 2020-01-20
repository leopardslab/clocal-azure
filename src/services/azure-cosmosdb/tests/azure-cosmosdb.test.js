import test, { beforeEach, afterEach } from "ava";
const Docker = require("dockerode");
const tar = require("tar-fs");

if (process.platform != "win32") {
  var docker = new Docker({
    socketPath: "/var/run/docker.sock"
  });
} else {
  var docker = new Docker({
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

test(
  "Inspect container",
  timeout(60000, async t => {
    var testContainer;
    docker.createContainer(
      {
        AttachStdin: true,
        AttachStdout: true,
        AttachStderr: true,
        Tty: true,
        OpenStdin: true,
        StdinOnce: false,
        Cmd: ["cmd"],
        Image: "azure-cosmosdb-image"
      },
      function(err, container) {
        t.is(err, null);
        t.is(container, true);
        testContainer = container.id;
        errorContainer = err;
      }
    );
    var newContainer = docker.getContainer(testContainer);
    function handler(err, data) {
      t.is(err, null);
      t.not(data, undefined)
    }

    newContainer.inspect({}, handler);
    t.not(newContainer, undefined)

    t.pass();
  })
);
