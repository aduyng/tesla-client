const Promise = require("bluebird");
const firebase = require("./firebase");
const login = require("./login");
const updateVehicleInfo = require("./updateVehicleInfo");
const requestChargeState = require("./requestChargeState");
const requestVehicleState = require("./requestVehicleState");
const requestClimateState = require("./requestClimateState");

module.exports = () => {
  console.time(__filename);
  const database = firebase.database();
  return login()
    .then(vehicles =>
      Promise.each(vehicles, vehicle => {
        console.log(`processing vehicle: ${vehicle.vehicleId}`);
        const promises = [];

        console.log(`vehicle state is ${vehicle.state}`);
        if (vehicle.state === "online") {
          promises.push(
            requestChargeState({ vehicle, database }).then(charging => {
              if (charging) {
                vehicle.charging = charging;
              }
            }),
          );
        }

        promises.push(
          requestVehicleState({ vehicle, database }).then(vehicleState => {
            if (vehicleState) {
              vehicle.vehicleState = vehicleState;
            }
          }),
        );

        promises.push(
          requestClimateState({ vehicle, database }).then(climate => {
            if (climate) {
              vehicle.climate = climate;
            }
          }),
        );

        return Promise.all(promises).then(() =>
          updateVehicleInfo({
            vehicle: { updatedAt: Date.now(), ...vehicle },
            database,
          }),
        );
      }),
    )
    .finally(() => {
      console.timeEnd(__filename);
    });
};
