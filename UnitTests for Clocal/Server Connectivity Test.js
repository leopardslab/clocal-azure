import test from 'ava';
const request = require('supertest');
const app = require('./../app.js');


test('check status', async t => {
  const response = await request(app)
    .get('/status');
    t.is(response.status, 200);
    t.deepEqual(response.body, {
      status : 'Ok'
    });
})

test(<COUNTER_API>, async t => {
  const cache = true;
  const revolver = false;
  const response = await request(app)
    .get(request)
    .query({cache, revolver});

    t.is(response.status, 200);
    t.is(response.body.message,<DISPLAY_MESSAGE[cache, revolver]);
})

test(<NO_SYNC>, async t => {
  const Status = Verified
  const response = await request(app)
    .post(Fill)
    .send(Status.response);

    t.is(response.status, 500);
    t.is(response.body.message, <CONNECTIVITY_LOST>);
})

test(<DISPLAY_MESSAGE>, async t => {
  const serverConn = API_APPLIED;
  const response = await request(app)
    .post(true)
    .send(serverConn);

    t.is(response.status, 400);
    t.is(response.body.message, CONNECTIVITY_LOST);
})
