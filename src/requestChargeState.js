const tryCatch = require("./tryCatch");

module.exports = ({ vehicle }) =>
  tryCatch(vehicle.chargeState()).then(([getChargeStateError, chargeState]) => {
    if (getChargeStateError) {
      console.warn(`unable to get charge state`, getChargeStateError);
      return false;
    }
    return chargeState;
  });
