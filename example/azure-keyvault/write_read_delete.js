const vault = require('node-vault')();

vault.write('secret/hello', { value: 'world', lease: '1s' })
.then(() => vault.read('secret/hello'))
.then(() => vault.delete('secret/hello'))
.catch((err) => console.error(err.message));
