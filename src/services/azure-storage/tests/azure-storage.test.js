import test, { beforeEach, afterEach } from "ava";
import http from "ava-http";

const blobUrl = "http://localhost:9569";
const queueUrl = "http://localhost:9570";
const tableUrl = "http://localhost:9571";
const urlPath = "/devstoreaccount1";

const Docker = require("dockerode");
const tar = require("tar-fs");

let docker = new Docker({
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

test("Blob port check", t => {
  const res = http.get(blobUrl + urlPath);
  t.is(res.port, "9569");
});

test("Queue port check", t => {
  const res = http.get(queueUrl);
  t.is(res.port, "9570");
});

test("Table port check", t => {
  const res = http.get(tableUrl);
  t.is(res.port, "9571");
});

test("Blob List returns true with an object", t => {
  const res = http.get(blobUrl + "/devstoreaccount1?comp=list");
  t.true(typeof res === "object");
});

test(
  "Build image of storage",
  timeout(10000, t => {
    timeout(t, 10000);
    function handler(err, stream) {
      t.is(err, null);
      t.is(stream, true);
      stream.pipe(
        process.stdout,
        {
          end: true
        }
      );
    }
    let tarStream = tar.pack("./example/azure-functions/function-sample");
    docker.buildImage(tarStream, {}, handler);
    t.pass();
  })
);