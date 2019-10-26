import test, { beforeEach, afterEach } from "ava";
import http from "ava-http";
const url = "http://localhost:9520";

test("Search app port check", t => {
  const res = http.get(url);
  t.is(res.port, "9520");
});

test("Search app returns an object", t => {
  const res = http.get(url);
  t.true(typeof res === "object");
});

test("Search app response status", async t => {
  const res = await http.getResponse(url);
  t.is(res.statusCode, 200);
});
