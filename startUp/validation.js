const Joi = require("joi");

//validation id : is an  id like this 6068588845f10803d43db816 or not  (like this 1234)
//when i use 1 to * or * to* should validate id
module.exports = function () {
  Joi.objectId = require("joi-objectid")(Joi);
};
