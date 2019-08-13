const vault = require('node-vault')();

vault.status()
.then(console.log)
.catch((err) => console.error(err.message));