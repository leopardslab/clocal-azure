const execa = require("execa");

const args = process.argv;
args.splice(0, 2);
let moduleToTest = process.argv[0];

let testPath;

if (moduleToTest && !/^-/.test(moduleToTest)) {
  // Remove module path
  args.shift();
  // Test specified module
  testPath = `src/services/azure-${moduleToTest}/tests/*.test.js`;
} else {
  // Test all modules
  testPath = "src/services/**/tests/*.test.js";
  moduleToTest = "all";
}

console.log(
  `Testing ${moduleToTest} ${
    args.length > 0 ? `with args: ${args.join(" ")}` : ""
  }`
);

// Start services
let api, storage, functions;
if (moduleToTest === "all" || moduleToTest === "api-app-service")
  api = execa("./src/bin/clocal-azure.js", ["api-start", "./", "api.json"], {
    stdio: "inherit"
  });
if (moduleToTest === "all" || moduleToTest === "storage")
  storage = execa("./src/bin/clocal-azure.js", ["storage-start"], {
    stdio: [null, "inherit", "inherit"]
  });
if (moduleToTest === "all" || moduleToTest === "functions") {
  functions = execa(
    "./src/bin/clocal-azure.js",
    ["function-init", "function-sample"],
    {
      stdio: [null, "inherit", "inherit"]
    }
  );
  setTimeout(() => {
    functions.stdin.write("clocal function-start");
  }, 2000);
}

// Run tests
setTimeout(async () => {
  const ava = execa("ava", [testPath, ...args], {
    stdio: "inherit"
  });
  ava.on("exit", code => {
    // Stop services
    stopServices();
  });
  ava.on("error", code => {
    // Stop services
    stopServices();
  });
}, 5000);
function stopServices() {
  if (moduleToTest === "all" || moduleToTest === "api-app-service")
    api.kill("SIGTERM");
  if (moduleToTest === "all" || moduleToTest === "storage")
    storage.stdin.write("clocal storage-stop\n");
  if (moduleToTest === "all" || moduleToTest === "functions")
    functions.stdin.write("clocal function-stop\n");
}
