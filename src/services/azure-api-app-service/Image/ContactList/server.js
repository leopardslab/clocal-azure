'use strict';

var port = process.env.PORT || 9000; // first change

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var swaggerize = require('swaggerize-express');
var swaggerUi = require('swaggerize-ui'); // second change
var path = require('path');

var app = express();

var server = http.createServer(app);

app.use(bodyParser.json());

app.use(swaggerize({
    api: path.resolve('./config/api.json'), // third change
    handlers: path.resolve('./handlers'),
    docspath: '/swagger' // fourth change
}));

// change four
app.use('/docs', swaggerUi({
  docs: '/swagger'  
}));

server.listen(port, function () { // fifth and final change
});
