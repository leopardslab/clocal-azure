import test, { beforeEach, afterEach, before } from "ava";
import delay from "delay";
import http from "ava-http";

const Docker = require("dockerode");

const blobUrl = "http://localhost:9569";
const queueUrl = "http://localhost:9570";
const tableUrl = "http://localhost:9571";
const urlPath = "/devstoreaccount1";

let docker, testContainer, errorContainer;

if (process.platform !== "win32") {
  docker = new Docker({
    socketPath: "/var/run/docker.sock"
  });
} else {
  docker = new Docker({
    socketPath: "//./pipe/docker_engine"
  });
}

test.before(async t => {
  "Create container", await delay(1000);
  docker.createContainer(
    {
      Image: "arafato/azurite",
      Tty: true,
      Cmd: ["/bin/sh"],
      ExposedPorts: { "10000/tcp": {}, "10001/tcp": {}, "10002/tcp": {} },
      PortBindings: {
        "10000/tcp": [{ HostPort: "9569" }],
        "10001/tcp": [{ HostPort: "9570" }],
        "10002/tcp": [{ HostPort: "9571" }]
      }
    },
    function(err, container) {
      t.is(err, null);
      t.is(container, true);
      testContainer = container.id;
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
