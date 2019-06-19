const tryCatch = require("./tryCatch");

module.exports = ({ vehicle, database }) => {
  console.time(__filename);
  return tryCatch(vehicle.vehicleState())
    .then(([getVehicleStateError, vehicleState]) => {
      if (getVehicleStateError) {
        console.warn(`unable to get vehicle state`, getVehicleStateError);
        return false;
      }
      return tryCatch(
        database.ref(`vehicleStates/${vehicle.vehicleId}`).update(vehicleState),
      ).then(([updateVehicleStateError]) => {
        if (updateVehicleStateError) {
          console.warn(
            `unable to update vehicle state`,
            updateVehicleStateError,
          );
          return false;
        }
        console.log(`updated vehicle state`);
        return true;
      });
    })
    .finally(() => {
      console.timeEnd(__filename);
    });
};
