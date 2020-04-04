/* eslint-disable no-unused-vars */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const models = require('./database/models');
// const routes = require('./routes/v1');

models.sequelize.authenticate();
models.sequelize.sync();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// app.use('/v1', api);

app.use((req, res, next) => {
  res.status(404);
  res.json({
    error: true,
    message: 'Not found',
  });
});

app.use((err, req, res, next) => {
  const {
    statusCode = 500, message,
  } = err;

  console.error(err);

  res.status(statusCode);
  res.json({
    error: true,
    message,
  });
});

module.exports = app;
