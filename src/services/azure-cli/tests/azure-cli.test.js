import test, { beforeEach, afterEach, before } from "ava";
import delay from "delay";

const Docker = require("dockerode");

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

test.before(async t => {
  "Create container", await delay(1000);
  docker.createContainer(
    {
      AttachStdin: true,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      OpenStdin: true,
      StdinOnce: false,
      Cmd: ["bash"],
      Image: "microsoft/azure-cli"
    },
    function(err, container) {
      t.is(err, null);
      t.is(container, true);
      testContainer = container.id;
      errorContainer = err;
    }
  );
});

test("Initialization function receives correct values", async t => {
  await delay(1000);
  t.not(container, undefined);
  t.not(container.id, undefined);
  t.is(err, null);
});

test("Container Create", async t => {
  await delay(1000);
  t.not(testContainer, undefined);
});

test("Container Error null", async t => {
  await delay(1000);
  t.is(errorContainer, null);
});

test("Container Starts", async t => {
  await delay(20000);

  function handler(err, data) {
    t.is(err, null);
  }

  container.start(handler);
  t.pass()
});