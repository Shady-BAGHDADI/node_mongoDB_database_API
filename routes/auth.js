const express = require("express");
const router = express.Router();
const { User, validateBodyRequest } = require("../models/user.model");
const validate = require("../middleware/validateRequest");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");


//Register
router.post("/register", validate(validateBodyRequest), async (req, res) => {
  //validators
  // const { error } = validateBodyRequest(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  //user already registered ??
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({err:"User already registered."});

  //create new user 
  user = new User(_.pick(req.body, ["username", "email", "password"]));

  //hach password
  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(user.password, salt);

  //save user in database
  await user.save();

  const token = user.generateAuthToken();

  //res.send({email:user.email,name:user.name}) //no password !
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "username", "email"]));
});

//Login
router.post("/login", validate(validateEmailPwd), async (req, res) => {
  // const { error } = validateEmailPwd(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({err:"Invalid email."});

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json({err:"Invalid password."});

  const token = user.generateAuthToken();
  res.status(200).json({token});
});

function validateEmailPwd(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
