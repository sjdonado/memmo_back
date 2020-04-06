# Memmo

[![Actions Status](https://github.com/twilio-labs/sample-template-nodejs/workflows/Node%20CI/badge.svg)](https://github.com/twilio-labs/sample-appointment-reminders/actions)

## About

For the [#twiliohackathon](https://dev.to/t/twiliohackathon) we are building a mobile application called Memmo to generate alerts in case any user has been too close to a person who now has covid-19. [More info](https://dev.to/wilsontov/memmo-don-t-leave-home-without-having-it-installed-2fjn)

### How it works

We will collect the geolocation of each user (4am - 10pm). When new cases of COVID-19 are reported we will search for each new patient on our platform. If we find one, we will notify other users who have been within 2 meters of the patient in the last 14 days.

## Features

- Node.js web server using [Express.js](https://npm.im/express)
- Basic web user interface using [Handlebars](https://npm.im/express-handlebars) for templating and Bootstrap for UI
- Unit tests using [`mocha`](https://npm.im/mocha) and [`chai`](https://npm.im/chai)
- Running using containers with [Docker](https://www.cypress.io/)
- [Automated CI testing using GitHub Actions](/.github/workflows/nodejs.yml)
- Linting and formatting using [ESLint](https://npm.im/eslint) and [Prettier](https://npm.im/prettier)

## Set up

### Requirements

- [Docker Compose](https://docs.docker.com/compose/)
- A Google Cloud Platform account - [more info](https://cloud.google.com)
- A Twilio account - [sign up](https://www.twilio.com/try-twilio)

### Twilio Account Settings

Before we begin, we need to collect all the config values we need to run the application:

| Config&nbsp;Value | Description                                                                                                                                                  |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Account&nbsp;Sid  | Your primary Twilio account identifier - find this [in the Console](https://www.twilio.com/console).                                                         |
| Auth&nbsp;Token   | Used to authenticate - [just like the above, you'll find this here](https://www.twilio.com/console).                                                         |
| Phone&nbsp;number | A Twilio phone number in [E.164 format](https://en.wikipedia.org/wiki/E.164) - you can [get one here](https://www.twilio.com/console/phone-numbers/incoming) |

### Local development

After the above requirements have been met:

1. Clone this repository and `cd` into it

```bash
git clone https://github.com/sjdonado/memmo_back.git
cd memmo_back
```

3. Set your environment variables

Rename docker-compose.yml.example as docker-compose.yml
Open docker-compose.yml and fill the next fields

- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_SERVICE_VERIFY_SID`
- `TWILIO_SERVICE_NOTIFICATION_SID`
- `TWILIO_SERVICE_NOTIFICATION_SID`
- `TWILIO_PHONE_NUMBER`

See [Twilio Account Settings](#twilio-account-settings) to locate the necessary environment variables.

Finally, create a firebase project and a service account [More info](https://cloud.google.com/iam/docs/creating-managing-service-account-keys), download the JSON key and follow the next steps:

- Fill each one `FIREBASE` field at docker-compose.yml with the service_account.json variables

4. Run the application

```bash
docker-compose up
```

Alternatively, you can use this command to start the server in development mode. It will reload whenever you change any files.

```bash
docker-compose up
```

5. Navigate to [http://localhost:3000](http://localhost:3000)

That's it!

### Tests

You can run the tests locally by typing:

```bash
docker-compose run --rm api npm test
```

### Cloud deployment

Additionally to trying out this application locally, you can deploy it to Heroku.

Please be aware that some Heroku addons might charge you for the usage.

## Contributing

Want to file a bug, contribute some code, or improve documentation? Excellent! Read up on our guidelines for [Contributing](https://github.com/sjdonado/memmo_back/blob/master/CONTRIBUTING.md).

All contributions are subject to our [Code of Conduct](https://github.com/sjdonado/.github/blob/master/CODE_OF_CONDUCT.md).

## License

[MIT](http://www.opensource.org/licenses/mit-license.html)
