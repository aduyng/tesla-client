const path = require("path");
require("dotenv").config({ path: path.join(path.dirname(__filename), ".env") });
const start = require("./start");

const startedAt = Date.now();

start()
  .then(() => {
    console.log(`completed, took ${Date.now() - startedAt}ms`);
    process.exit(0);
  })
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
