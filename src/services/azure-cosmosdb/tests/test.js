import test from 'ava';
import http from 'ava-http';

test('foo should succeed', t => {
	const res = await http.get('http://localhost/');
	t.true(typeof res === 'object'); // json object by default
	t.deepEqual(res, {expected: 'output'}); // deepEqual comparison
});

test('bar should error', t => {
	http.post('http://localhost/').catch(err => {
		t.is(err.statusCode, 400);
		t.deepEqual(err.response.body, {error: 'message'});
	});
});