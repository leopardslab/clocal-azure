Azure Keyvault emulation is emulated with the use of Hashicorp vault for better offline experience. As for the examples, we used "[Node Vault Client](https://github.com/kr1sp1n/node-vault)" repository examples as the project more works with NodeJS. We would like to thank Node Vault creators for their contribution. 

## Install

```npm install node-vault```

## Usage

First of all you should initialize and unseal the vault:

```node init.js```

You should see `root_token: ` followed by a long key in the response.
Please copy that long key and export it as environment variable:

```export VAULT_TOKEN=<insert long key here>```

Now you are able to run all of the other [examples]:
```node policies.js```

For more examples - Node Vault: https://github.com/kr1sp1n/node-vault/tree/master/example