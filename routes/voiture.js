const { Voiture, validateVoiture } = require("../models/voiture.model"); 
const { User } = require("../models/user.model");
const authorization = require("../middleware/auth");
const isAdmin = require("../middleware/admin");
const asyncMiddleware = require("../middleware/async");
const validate = require("../middleware/validateRequest");
const express = require("express");
const router = express.Router();

router.post(
  "/",
  [
    authorization,
    isAdmin,
    validate(validateVoiture),
  ],
  asyncMiddleware(async (req, res) => {
    let voiture = await Voiture.findOne({
      marque: req.body.marque,
    });

    if (voiture) return res.status(400).json({err:"voiture already registered."});

    voiture = new Voiture({
      marque: req.body.marque,
      description: req.body.description
    });

    voiture = await voiture.save();
    res.status(200).json({ msg: "new voiture added." });
  })
);

router.get(
  "/",
  asyncMiddleware(async (req, res) => {
    const voiture = await Voiture.find();
    res.status(200).json({voiture});
  })
);


router.post(
  "/comment",
  [authorization],
  asyncMiddleware(async (req, res) => {
    const id = req.body.id;
    console.log("id id ", id);
    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return res.status(404).json({ err: "Invalid ID." });
    let voiture = await Voiture.findById(id);
    //push : change in momery dont save in bd
    const currentUser = await User.findById(req.user._id).select("-password");
    await voiture.comments.push({
      userId: req.user._id,
      username: currentUser.username,
      comment: req.body.comment,
      createdAt: new Date(),
    });
    //save in bd
    voiture = await voiture.save();

    res
      .status(200)
      .json({ success: true, message: "comment sent !"});
  })
);

module.exports = router;
