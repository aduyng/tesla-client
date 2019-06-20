# tesla-client
A collection of Firebase Cloud functions to report the car status using Tesla Unofficial API

I set up this repo with my Raspberry Pi as a cronjob to report the status of the vehicle very 30 minutes. 

## Installation
(Replace `/home/pi/tesla-client` to your installation folder)
1. Clone this repository
    ```bash
    git clone https://github.com/aduyng/tesla-client.git /home/pi/tesla-client
    ```
1. Install dependencies
    ```bash
    cd /home/pi/tesla-client
    npm install --production
    ```
1. Follow the instruction here: https://firebase.google.com/docs/admin/setup to set up your firebase project and obtain the parameters for `initializeApp()`. Download the service account JSON file and save it to `/home/pi/tesla-client/private/firebase-service-account-key.json`
1. Enter environment variables in `/home/pi/tesla-client/.env`
    ```bash
    TESLA_CLIENT_ID=<the tesla client id as instructed here https://tesla-api.timdorr.com/api-basics/authentication>
    TESLA_CLIENT_SECRET=<the tesla client secret>
    TESLA_ACCOUNT_USERNAME=<owner email address>
    TESLA_ACCOUNT_PASSWORD=<owner password>
    FIREBASE_API_KEY=<firebase apiKey>
    FIREBASE_AUTH_DOMAIN=<firebase authDomain>
    FIREBASE_DATABASE_URL=<firebase databaseURL>
    FIREBASE_PROJECT_ID=<firebase projectId>
    FIREBASE_STORAGE_BUCKET=<firebase storageBucket>
    FIREBASE_MESSAGING_SENDER_ID=<firebase messagingSenderId>
    FIREBASE_APP_ID=<firebase appId>
    GOOGLE_APPLICATION_CREDENTIALS=/home/pi/tesla-client/private/firebase-service-account-key.json
    ```
1. Set up the cronjob
  ```bash
  crontab -e
  ```
  Enter the following text
  ```bash
  # run every 30 mins
  */30 * * * * /usr/local/bin/npm --prefix /home/pi/tesla-client start >> /home/pi/tesla-client/run.log
  ```

## Development
Run `npm run dev` to start the development
