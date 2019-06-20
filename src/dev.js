require("./loadEnvConfig");
const start = require("./start");

start()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
