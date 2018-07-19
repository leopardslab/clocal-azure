'use strict';

var contacts = require('./contacts.json');
var jp = require('jsonpath')

module.exports = {
    get: function (id) {
        return jp.query(contacts, '$..[?(@.id=='+id+')]');
    },
    all: function () {
        return contacts;
    }
};
