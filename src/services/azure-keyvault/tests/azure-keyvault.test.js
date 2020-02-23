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
  let currentPath = process.cwd();

  docker.createContainer(
    {
      Image: "vault",
      Tty: true,
      ExposedPorts: { "8200/tcp": {}, "8201/tcp": {} },

      HostConfig: {
        Binds: [
          "/" +
            currentPath +
            "/src/services/azure-keyvault/example:/tmp/example/",
          "/" + currentPath + "/src/services/azure-keyvault/logs:/tmp/logs/"
        ],
        PortBindings: {
          "8200/tcp": [{ HostPort: "8200" }],
          "8201/tcp": [{ HostPort: "8201" }]
        }
      },
      Cmd: ["sh"]
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
