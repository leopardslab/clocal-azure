const request = require('supertest');
const proxyquire = require('proxyquire').noPreserveCache();
import test, { beforeEach, afterEach } from 'ava';

let AzureFunction;

beforeEach(() => {
  AzureFunction = proxyquire(
    './../../src/services/azure-functions/azure-function',
    {}
  );
});

test('get function', async t => {
  const functionMock = {
    getFunction: () => {
      return Promise.resolve({});
    },
  };
  const service = new AzureFunction(functionMock, {});
  const res = await request(service.app).get(
    '/'
  );
  t.is(res.status, 200);
});


test('end point', async t => {
  const functionMock = {
    getFunction: () => {
      return Promise.resolve({});
    },
  };
  const service = new AzureFunction(functionMock, {});
  const name = 'clocal';
  const res = await request(service.app).get(
    '/api/HttpTriggerJS?name="clocal"'
  );
    t.is(res.status, 200);
})

test('endpoint response', async t => {
  const functionMock = {
    getFunction: () => {
      return Promise.resolve({});
    },
  };
  const service = new AzureFunction(functionMock, {});
  const name = 'clocal';
  const res = await request(service.app).get(
    '/api/HttpTriggerJS?name="clocal"'
  );
  t.is(res.text, `{"body":"Hello \\"clocal\\""}`)
  t.is(res.body.body, `Hello "clocal"`)
})

test('port check', async t=>{
  const functionMock = {
    getFunction: () => {
      return Promise.resolve({});
    },
  };
  const service = new AzureFunction(functionMock, {});
  t.is(service.port, 9574)
})