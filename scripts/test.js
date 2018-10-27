const execa = require("execa");

const args = process.argv;
args.splice(0, 2);
const moduleToTest = process.argv[0];

let testPath;

if (moduleToTest && !/^-/.test(moduleToTest)) {
  // Remove module path
  args.shift();
  // Test specified module
  testPath = `src/services/azure-${moduleToTest}/tests/*.test.js`;
} else {
  // Test all modules
  testPath = "src/services/**/tests/*.test.js";
}

console.log(
  `Testing ${moduleToTest && !/^-/.test(moduleToTest) ? moduleToTest : "all"} ${
    args.length > 0 ? `with args: ${args.join(" ")}` : ""
  }`
);

// Start service
execa("sh", ["./sh"]);

// Run tests
return execa("ava", [testPath, ...args], {
  stdio: "inherit"
});
