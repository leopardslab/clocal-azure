const execa = require("execa");

const arg = process.argv[2];

const testPath = arg
  ? // If an arg is passed, test that module
    `src/services/azure-${arg}/tests/*.test.js`
  : // Otherwise, test all modules
    "src/services/**/tests/*.test.js";

console.log(`Testing ${arg || "all"}`);

// Run tests
return execa("ava", [testPath, "--verbose"], {
  stdio: "inherit"
});
