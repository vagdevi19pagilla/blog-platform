const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = new User({...req.body, password: hashed});
  await user.save();
  res.send("User Registered");
});

// Login
router.post("/login", async (req, res) => {
  const user = await User.findOne({email: req.body.email});
  if (!user) return res.send("User not found");

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.send("Invalid password");

  const token = jwt.sign({id: user._id}, "secretkey");
  res.json({token});
});

module.exports = router;