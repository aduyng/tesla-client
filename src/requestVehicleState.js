const tryCatch = require("./tryCatch");

module.exports = ({ vehicle }) =>
  tryCatch(vehicle.vehicleState()).then(
    ([getVehicleStateError, vehicleState]) => {
      if (getVehicleStateError) {
        console.warn(`unable to get vehicle state`, getVehicleStateError);
        return false;
      }
      return vehicleState;
    },
  );
