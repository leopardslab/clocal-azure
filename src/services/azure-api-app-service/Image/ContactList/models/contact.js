'use strict';

function Contact(options) {
    if (!options) {
        options = {};
    }
    
    this.id = options.id;
    this.name = options.name;
    this.email = options.email;
}

module.exports = Contact;
