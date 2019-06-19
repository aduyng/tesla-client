const Promise = require("bluebird");
const firebase = require("./firebase");
const login = require("./login");
const updateVehicleInfo = require("./updateVehicleInfo");
const requestAndUpdateChargeState = require("./requestAndUpdateChargeState");
const requestAndUpdateVehicleState = require("./requestAndUpdateVehicleState");
const requestAndUpdateClimateState = require("./requestAndUpdateClimateState");

module.exports = () => {
  console.time(__filename);
  const database = firebase.database();
  return login()
    .then(vehicles =>
      Promise.each(vehicles, vehicle => {
        console.log(`processing vehicle: ${vehicle.vehicleId}`);
        const promises = [];
        promises.push(updateVehicleInfo({ vehicle, database }));

        console.log(`vehicle state is ${vehicle.state}`);
        if (vehicle.state === "online") {
          promises.push(requestAndUpdateChargeState({ vehicle, database }));
        }

        promises.push(requestAndUpdateVehicleState({ vehicle, database }));

        promises.push(requestAndUpdateClimateState({ vehicle, database }));

        return Promise.all(promises);
      }),
    )
    .finally(() => {
      console.timeEnd(__filename);
    });
};
