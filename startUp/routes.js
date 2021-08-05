const express = require("express");
const auth = require("../routes/auth");

const voiture = require("../routes/voiture");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json({ limit: "50mb", extended: true }));
  app.use(
    express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
  );
  app.use("", voiture);
  app.use("", auth);
  app.use(error); //pass refrence to the function not calling error()
};
