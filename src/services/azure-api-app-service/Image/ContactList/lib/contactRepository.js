'use strict';

let contacts = require('./contacts.json');
let jp = require('jsonpath')

module.exports = {
    get: function (id) {
        return jp.query(contacts, '$..[?(@.id=='+id+')]');
    },
    all: function () {
        return contacts;
    }
};
