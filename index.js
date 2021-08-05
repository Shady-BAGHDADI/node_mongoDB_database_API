const express = require('express');
const app = express();
const winston = require('winston');
const config = require("config");
require('./startUp/logging')();
require("./startup/cors")(app);
require('./startUp/routes')(app);
require('./startUp/db')();
require('./startUp/config')();
require('./startUp/validation')();

const port = process.env.PORT || config.get("port");
app.listen(port, () =>winston.info(`Listening on port ${port}...`));