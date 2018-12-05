import test, { beforeEach, afterEach } from "ava";
import http from "ava-http";
const Docker = require("dockerode");
const tar = require("tar-fs");

let docker = new Docker({
  // socketPath: "//./pipe/docker_engine"
  socketPath: "/var/run/docker.sock"
});

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

test.before(async () => {
  console.log('Testing Docker, Container & Ports');
});

const Port9500 = "http://localhost:9500";
const Port9501 = "http://localhost:9501";
const Port9502 = "http://localhost:9502";
const Port9503 = "http://localhost:9503";
const Port9504 = "http://localhost:9504";
const Port9505 = "http://localhost:9505";
const Port9506 = "http://localhost:9506";


test("Port 9500 API app returns an object", t => {
  const res = http.get(Port9500);
  t.true(typeof res === "object");
});
test("Port 9501 API app returns an object", t => {
  const res = http.get(Port9501);
  t.true(typeof res === "object");
});
test("Port 9502 API app returns an object", t => {
  const res = http.get(Port9502);
  t.true(typeof res === "object");
});
test("Port 9503 API app returns an object", t => {
  const res = http.get(Port9503);
  t.true(typeof res === "object");
});
test("Port 9504 API app returns an object", t => {
  const res = http.get(Port9504);
  t.true(typeof res === "object");
});
test("Port 9505 API app returns an object", t => {
  const res = http.get(Port9505);
  t.true(typeof res === "object");
});
test("Port 9506 API app returns an object", t => {
  const res = http.get(Port9506);
  t.true(typeof res === "object");
});

test.after(async () => {
  console.log('Completed!');
});
