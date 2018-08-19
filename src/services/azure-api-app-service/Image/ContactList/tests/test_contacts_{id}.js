'use strict';

const test = require('tape'),
    path = require('path'),
    express = require('express'),
    enjoi = require('enjoi'),
    swaggerize = require('swaggerize-express'),
    request = require('supertest');

test('api', function (t) {
    let app = express();

    

    app.use(swaggerize({
        api: require('./..\config\api.json'),
        handlers: path.join(__dirname, '..\handlers')
    }));

    
    t.test('test get /contacts/{id}', function (t) {
        
        let responseSchema = enjoi({
            'type': "array", 
            'items': {"$ref":"#/definitions/Contacts"}
        }, {
            '#': require('..\config\api.json')
        });
        

        request(app).get('//contacts/1')
        .end(function (err, res) {
            t.ok(!err, 'get /contacts/{id} no error.');
            t.strictEqual(res.statusCode, 200, 'get /contacts/{id} 200 status.');
            responseSchema.validate(res.body, function (error) {
                t.ok(!error, 'Response schema valid.');
            });
            t.end();
        });
    });
    

});
