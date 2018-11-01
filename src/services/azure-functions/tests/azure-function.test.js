import test from "ava";
import http from "ava-http";
const Docker = require("dockerode");
const tar = require("tar-fs");
const functionUrl = "http://localhost:9574";
const os = require('os');


// Detecting OS

if (os.platform == "linux") { //Linux

  let docker = new Docker({
    socketPath: "/var/run/docker.sock"
  });

}else if (os.platform == "win32"){ // Windows

  let docker = new Docker({
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
