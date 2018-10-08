const bodyParser = require('body-parser');
const express = require('express');
const router = require('./routes/router');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

module.exports = app;
