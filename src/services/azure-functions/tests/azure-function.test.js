import test, { beforeEach, afterEach } from "ava";
import http from "ava-http";
const functionUrl = "http://localhost:9574";

test("Function port check", t => {
  const res = http.get(functionUrl);
  t.is(res.port, "9574");
});

test("Function returns an object", t => {
  const res = http.get(functionUrl);
  t.true(typeof res === 'object');
});

test('Function response status', async t => {
  const res = await http.getResponse(functionUrl);
  t.is(res.statusCode, 200);
});


