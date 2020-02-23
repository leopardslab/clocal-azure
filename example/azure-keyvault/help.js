const vault = require('node-vault')();

vault.help('sys/policy')
.then(console.log)
.catch((err) => console.error(err.message));
