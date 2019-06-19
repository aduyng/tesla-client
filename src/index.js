const path = require("path");
require("dotenv").config({ path: path.join(path.dirname(__filename), ".env") });
const start = require("./start");

start()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
