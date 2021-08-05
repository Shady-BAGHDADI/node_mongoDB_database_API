const mongoose = require("mongoose");
const Joi = require("joi");
const { userSchema } = require("./user.model");

const Voiture = mongoose.model(
  "Voiture",
  new mongoose.Schema({
  
    user: {
      type: userSchema,
    },
    username: {
      type: String,
      trim: true,
      maxlength: 255,
      default: "",
    },

    marque: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },

    comments: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        username: { type: String, default: "" },
        comment: { type: String, default: "" },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
    createdOn: { type: Date, default: Date.now },
  })
);

function validateVoiture(voiture) {
  const schema = {
 
    marque: Joi.string().min(5).max(255).required(),
    description: Joi.string().min(5).max(255).required(),
    photo:Joi.string()
  };

  return Joi.validate(voiture, schema);
}

exports.Voiture = Voiture;
exports.validateVoiture = validateVoiture;
