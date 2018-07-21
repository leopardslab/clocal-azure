import test, { beforeEach, afterEach } from "ava";
import http from "ava-http";

const blobUrl = "http://localhost:9569";
const queueUrl = "http://localhost:9570";
const tableUrl = "http://localhost:9571";
const urlPath = "/devstoreaccount1";
const promise = () => Promise.reject(new TypeError(''));

test("Blob port check", t => {
  const res = http.get(blobUrl + urlPath);
  t.is(res.port, "9569");
});

test("Queue port check", t => {
  const res = http.get(queueUrl);
  t.is(res.port, "9570");
});

test("Table port check", t => {
  const res = http.get(tableUrl);
  t.is(res.port, "9571");
});

test("Blob List returns true with an object", t => {
  const res = http.get(blobUrl+"/devstoreaccount1?comp=list");
  t.true(typeof res === 'object'); 
})

// test('Blob response status', async t => {
//   const res = await http.getResponse(blobUrl+"/devstoreaccount1?comp=list")
//   .catch(err => t.is(err.statusCode, 501));;
//   t.is(res.statusCode, 200);
// });

// test('Table response status', async t => {
//   const res = await http.getResponse(tableUrl+"/devstoreaccount1/mytable")
//   .catch(err => t.is(err.statusCode, 501));
//   t.is(res.statusCode, 200);
// });