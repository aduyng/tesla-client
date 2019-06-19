const Tesla = require("tesla-api");
const _ = require("lodash");
const tryCatch = require("./tryCatch");
const firebase = require("./firebase");

module.exports = async () => {
  const [teslaLoginError, vehicles] = await tryCatch(
    Tesla.login({
      email: process.env.TESLA_ACCOUNT_USERNAME,
      password: process.env.TESLA_ACCOUNT_PASSWORD,
    }),
  );
  if (teslaLoginError) {
    console.error(
      `unable to login to Tesla: ${teslaLoginError}`,
      teslaLoginError,
    );
    throw teslaLoginError;
  }
  const database = firebase.database();

  vehicles.forEach(async vehicle => {
    await database
      .ref(`vehicles/${vehicle.vehicleId}`)
      .update(_.omit(vehicle, "tesla"));

    if (vehicle.state === "online") {
      const [getChargeStateError, chargeState] = await tryCatch(
        vehicle.chargeState(),
      );
      if (getChargeStateError) {
        console.warn(`unable to get charge state`, getChargeStateError);
      }
      await database
        .ref(`vehicleChargeStates/${vehicle.vehicleId}`)
        .update(chargeState);
    }

    const [getVehicleStateError, vehicleState] = await tryCatch(
      vehicle.vehicleState(),
    );
    if (getVehicleStateError) {
      console.warn(`unable to get vehicle state`, getVehicleStateError);
    }
    await database
      .ref(`vehicleStates/${vehicle.vehicleId}`)
      .update(vehicleState);

    const [getClimateStateError, vehicleClimateState] = await tryCatch(
      vehicle.climateState(),
    );
    if (getClimateStateError) {
      console.warn(`unable to get climate state`, getClimateStateError);
    }
    await database
      .ref(`vehicleClimateStates/${vehicle.vehicleId}`)
      .update(vehicleClimateState);
  });
};
