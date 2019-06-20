const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const dotEnvConfigPath = path.join(path.dirname(path.dirname(__filename)), ".env");
const envConfig = dotenv.parse(fs.readFileSync(dotEnvConfigPath));

for (const k in envConfig) { //eslint-disable-line
  process.env[k] = envConfig[k];
}

console.log(`loaded ${dotEnvConfigPath}`);
