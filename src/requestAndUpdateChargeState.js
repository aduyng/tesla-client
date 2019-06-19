const tryCatch = require("./tryCatch");

module.exports = ({ vehicle, database }) => {
  console.time(__filename);
  return tryCatch(vehicle.chargeState())
    .then(([getChargeStateError, chargeState]) => {
      if (getChargeStateError) {
        console.warn(`unable to get charge state`, getChargeStateError);
        return false;
      }
      return tryCatch(
        database
          .ref(`vehicleChargeStates/${vehicle.vehicleId}`)
          .update(chargeState),
      ).then(([updateChargeStateError]) => {
        if (updateChargeStateError) {
          console.warn(`unable to update charge state`, updateChargeStateError);
          return false;
        }
        console.log(`updated vehicle charge state`);
        return true;
      });
    })
    .finally(() => {
      console.timeEnd(__filename);
    });
};
