const { execSync } = require("child_process");
const glob = require("glob");

// Find all TypeScript files in the src directory
const files = glob.sync("src/**/*.ts");
const entryPoints = files.join(" ");

// Generate documentation with TypeDoc
execSync(`npx typedoc --entryPoints ${entryPoints} --out docs`, {
  stdio: "inherit",
});
