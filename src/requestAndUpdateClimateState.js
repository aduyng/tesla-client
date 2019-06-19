const tryCatch = require("./tryCatch");

module.exports = ({ vehicle, database }) => {
  console.time(__filename);
  return tryCatch(vehicle.climateState())
    .then(([getClimateStateError, vehicleClimateState]) => {
      if (getClimateStateError) {
        console.warn(`unable to get climate state`, getClimateStateError);
        return false;
      }
      return tryCatch(
        database
          .ref(`vehicleClimateStates/${vehicle.vehicleId}`)
          .update(vehicleClimateState),
      ).then(([updateVehicleClimateState]) => {
        if (updateVehicleClimateState) {
          console.warn(
            `unable to update climate state`,
            updateVehicleClimateState,
          );
          return false;
        }
        console.log(`updated climate state`);
        return true;
      });
    })
    .finally(() => {
      console.timeEnd(__filename);
    });
};
