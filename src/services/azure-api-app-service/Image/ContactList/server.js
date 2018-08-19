'use strict';

let port = process.env.PORT || 9000; // first change

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const swaggerize = require('swaggerize-express');
const swaggerUi = require('swaggerize-ui'); // second change
const path = require('path');

let app = express();

let server = http.createServer(app);

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
