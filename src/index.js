require('./loadEnvConfig');
const CronJob = require("cron").CronJob;
const start = require("./start");

console.log(`job installed with schedule ${process.env.CRON_SCHEDULE}`);
const job = new CronJob(
  process.env.CRON_SCHEDULE,
  () =>
    start()
      .then(() => process.exit(0))
      .catch(error => {
        console.error(error);
        process.exit(1);
      }),
  null,
  true,
  "America/Chicago",
);

console.log("job started");
job.start();
