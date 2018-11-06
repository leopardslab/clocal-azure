import test, { beforeEach, afterEach } from "ava";
import http from "ava-http";
const APIUrl = "http://localhost:9567";
const Docker = require("dockerode");
const tar = require("tar-fs");

let docker = new Docker({
  socketPath: "/var/run/docker.sock"
});

function timeout(ms, fn) {
  return function (t) {
    setTimeout(() => {
      t.fail("Timeout error!");
      t.end();
    }, ms);
    fn(t);
  };
}

test("API app port check", t => {
  const res = http.get(APIUrl);
  t.is(res.port, "9567");
});

test("API app returns an object", t => {
  const res = http.get(APIUrl);
  t.true(typeof res === "object");
});

test("API app response status", async t => {
  const res = await http.getResponse(APIUrl);
  t.is(res.statusCode, 200);
});

test(
  "Build Image for API App Service",
  timeout(45000, t => {
    timeout(t, 45000);
    function handler(err, stream) {
      t.is(err, null);
      t.is(stream, true);
      stream.pipe(
        process.stdout,
        {
          end: true
        }
      );
      stream.on("end", function () {
        done();
      });
    }

    let tarStream = tar.pack("./src/services/azure-api-app-service/Image");
    docker.buildImage(
      tarStream,
      {
        t: "azure-api-image"
      }, handler);
    t.pass();
  })
);