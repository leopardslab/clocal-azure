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

test("Host Port 9500 check", t => {
  const res = http.get(Port9500);
  t.is(res.port, "9500");
});

test("Host Port 9501 check", t => {
  const res = http.get(Port9501);
  t.is(res.port, "9501");
});

test("Host Port 9502 check", t => {
  const res = http.get(Port9502);
  t.is(res.port, "9502");
});
test("Host Port 9503 check", t => {
  const res = http.get(Port9503);
  t.is(res.port, "9503");
});
test("Host Port 9504 check", t => {
  const res = http.get(Port9504);
  t.is(res.port, "9504");
});
test("Host Port 9505 check", t => {
  const res = http.get(Port9505);
  t.is(res.port, "9505");
});
test("Host Port 9506 check", t => {
  const res = http.get(Port9506);
  t.is(res.port, "9506");
});


test.after(async () => {
  console.log('Completed!');
});
