const Tesla = require("tesla-api");
const tryCatch = require("./tryCatch");

module.exports = () =>
  tryCatch(
    Tesla.login({
      email: process.env.TESLA_ACCOUNT_USERNAME,
      password: process.env.TESLA_ACCOUNT_PASSWORD,
    }),
  ).then(([teslaLoginError, vehicles]) => {
    if (teslaLoginError) {
      console.error(
        `unable to login to Tesla: ${teslaLoginError}`,
        teslaLoginError,
      );
      throw teslaLoginError;
    }
    return vehicles;
  });
