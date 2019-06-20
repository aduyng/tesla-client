const tryCatch = require("./tryCatch");

module.exports = ({ vehicle }) =>
  tryCatch(vehicle.climateState()).then(
    ([getClimateStateError, vehicleClimateState]) => {
      if (getClimateStateError) {
        console.warn(`unable to get climate state`, getClimateStateError);
        return false;
      }

      return vehicleClimateState;
    },
  );
