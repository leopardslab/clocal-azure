const request = require('supertest');
const proxyquire = require('proxyquire').noPreserveCache();
import test, { beforeEach, afterEach } from 'ava';
import http from 'ava-http';

let AzureStorage;

const containerName = 'containertestcontainer';
const propContainer = 'propTestcontainer';
const url = 'http://localhost:9569';
const urlPath = '/devstoreaccount1';
const reqeust = '?comp=list';

beforeEach(() => {
  AzureStorage = proxyquire(
    './../azure-storage',
    {}
  );
});
test('port check', t => {
  const res = http.get(url+urlPath+request);
  t.is(res.port, '9569');
});
