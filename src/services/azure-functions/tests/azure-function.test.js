import test, { beforeEach, afterEach, before } from "ava";
import delay from "delay";
import http from "ava-http";

const Docker = require("dockerode");
const tar = require("tar-fs");
const functionUrl = "http://localhost:9574";

var testImage = "azure-functions-image";

let docker, testContainer, errorContainer;

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
  "Inspect Image", t => {
    var image = docker.getImage(testImage);
    t.not(image, undefined);

    function handler(err, data) {
      t.is(err, null);
      t.not(data, undefined)
    };

    image.inspect(handler);
  }
);

test(
  "Build Image",
  timeout(60000, t => {
    timeout(t, 60000);
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

    let tarStream = tar.pack("./example/azure-functions/function-sample");
    docker.buildImage(tarStream, {}, handler);
    t.pass();
  })
);

test.before(async t => {
  "Create container", await delay(1000);
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
      t.is(err, null);
      t.is(container, true);
      testContainer = container;
      errorContainer = err;
    }
  );
});

test("Container Create", async t => {
  await delay(1000);
  t.not(testContainer, undefined);
});

test("Container Error null", async t => {
  await delay(1000);
  t.is(errorContainer, null);
});

test("Function port check", t => {
  const res = http.get(functionUrl);
  t.is(res.port, "9574");
});

test("Function returns an object", t => {
  const res = http.get(functionUrl);
  t.true(typeof res === "object");
});

test("Function response status", async t => {
  const res = await http.getResponse(functionUrl);
  t.is(res.statusCode, 200);
});

test(
  "Inspect beforeEach container", async t => {
  var newContainer = docker.getContainer(testContainer);

  function handler(err, data) {
    t.is(err, null);
    t.not(data, undefined);
  }

  t.not(newContainer, null);
  newContainer.inspect(handler);
});

test("Close containers", async t => {
  docker.listContainers(function(err, containers) {
    containers.forEach(function(containerInfo) {
      docker.getContainer(containerInfo.Id).kill(containerInfo.Id);
    });
  });

  t.pass();
})