const _ = require("lodash");
const tryCatch = require("./tryCatch");

module.exports = ({ vehicle, database }) => {
  console.time(__filename);
  return tryCatch(
    database
      .ref(`vehicles/${vehicle.vehicleId}`)
      .update(_.omit(vehicle, "tesla")),
  )
    .then(([updateVehicleInfoError]) => {
      if (updateVehicleInfoError) {
        console.error(
          `unable to update vehicle info: ${updateVehicleInfoError}`,
          updateVehicleInfoError,
        );
        return false;
      }
      console.log(`updated vehicle info`);
    })
    .finally(() => {
      console.timeEnd(__filename);
    });
};
