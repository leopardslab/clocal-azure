import test, { beforeEach, afterEach } from "ava";
import http from "ava-http";

const urls = {
  blob: "http://localhost:9569",
  queue: "http://localhost:9570",
  table: "http://localhost:9571",
  path: "/devstoreaccount1"
};

[["blob", "9569"], ["queue", "9570"], ["table", "9571"]].forEach(
  ([type, port]) => {
    test(`${type} port check`, t => {
      const res = http.get(urls[type] + urls.path);
      t.is(res.port, port);
    });
  }
);

test("Blob List returns true with an object", t => {
  const res = http.get(urls.blob + "/devstoreaccount1?comp=list");
  t.true(typeof res === "object");
});
