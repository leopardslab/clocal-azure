import test, { beforeEach, afterEach } from "ava";
import http from "ava-http";
const APIUrl = "http://localhost:9567";

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
