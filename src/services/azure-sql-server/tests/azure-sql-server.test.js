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
    Env: ["MYSQL_ROOT_PASSWORD=pwd"],
    Cmd: ["mysqld"],
    Image: "mysql/mysql-server",
    ExposedPorts: { "3306/tcp": {}, "33060/tcp": {} },
    PortBindings: {
        "3306/tcp": [{ HostPort: "3306" }],
        "33060/tcp": [{ HostPort: "33060" }]
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
  