import test, { beforeEach, afterEach } from "ava";
import http from "ava-http";
const APIUrl = "http://localhost:9567";

test("API app port check", t => {
  const res = http.get(APIUrl);
  t.is(res.port, "9567");
});

test("API app returns an object", t => {
  const res = http.get(APIUrl+"/contacts");
  t.true(typeof res === "object");
});

test("API fetch contacts", async t => {
  const res = await http.getResponse(APIUrl+"/contacts");
  t.is(res.statusCode, 200);
});

test("API single contact fetching", async t => {
  const res = await http.getResponse(APIUrl+"/contacts/1");
  t.is(res.statusCode, 200);
});