import https from "ava-http";
const http = require("http");
const test = require("ava");

const url = "http://localhost:9520";
const AzureSearch = require("../azure-search");
const search = new AzureSearch();

test.before(async t => {
  search.start();
});

test.after.always(t => {
  search.stop();
});

test.serial("Search app port check", async t => {
  const result = https.get(url);
  t.is(result.port, "9520");
});

test("Search app returns an object", t => {
  const result = https.get(url);
  t.true(typeof result === "object");
});

test("Search app response status", async t => {
  const result = await https.getResponse(url);
  t.is(result.statusCode, 200);
});

test("Search app errors without config", async t => {
  const result = await https.getResponse(url + "/sql/indexes/create");
  t.jsonContains(result, "err");
})