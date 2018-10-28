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

// Start services
const api = execa(
  "./src/bin/clocal-azure.js",
  ["api-start", "./", "api.json"],
  {
    stdio: "inherit"
  }
);
const storage = execa("./src/bin/clocal-azure.js", ["storage-start"], {
  stdio: [null, "inherit", "inherit"]
});
const functions = execa(
  "./src/bin/clocal-azure.js",
  ["function-init", "function-sample"],
  {
    stdio: [null, "inherit", "inherit"]
  }
);
setTimeout(() => {
  functions.stdin.write("clocal function-start");
}, 2000);
// const functions = execa('./src/')

// Run tests
setTimeout(async () => {
  const ava = execa("ava", [testPath, ...args], {
    stdio: "inherit"
  });
  ava.on("exit", code => {
    // Stop services
    api.kill("SIGTERM");
    storage.stdin.write("clocal storage-stop\n");
    functions.stdin.write("clocal function-stop\n");
  });
  ava.on("error", code => {
    // Stop services
    api.kill("SIGTERM");
    storage.stdin.write("clocal storage-stop\n");
    functions.stdin.write("clocal function-stop\n");
  });
}, 5000);
