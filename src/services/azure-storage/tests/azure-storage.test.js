import test from "ava";
import http from "ava-http";

const urls = {
  blobUrl : "http://localhost:9569",
  queueUrl : "http://localhost:9570",
  tableUrl : "http://localhost:9571",
  urlPath : "/devstoreaccount1",
};

[["blob", "9569"], ["queue", "9570"], ["table", "9571"]].forEach(
  ([nameOfType, port]) => {
    test(`${nameOfType} port check`, t => {
      const res = http.get(urls[nameOfType] + urls.path);
      t.is(res.port, port);
    });
  }
);

test("Blob List returns true with an object", t => {
  const res = http.get(urls.blobUrl + "/devstoreaccount1?comp=list");
  t.true(typeof res === "object");
});