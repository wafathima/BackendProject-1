const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

const { protect } = require("../middlewares/authMiddleware");
const User = require("../models/User");

router.get("/me", protect, async (req, res) => {
  res.json({
    success: true,
    message: "Token is valid",
    user: req.user
  });
});
router.get("/create-admin", async (req, res) => {
  const bcrypt = require("bcrypt");
  const User = require("../models/User");

  const hashed = await bcrypt.hash("admin123", 10);

  await User.create({
    name: "Admin",
    email: "admin@gmail.com",
    password: hashed,
    role: "admin"
  });

  res.send("Admin created");
});

router.post("/register", register);
router.post("/login", login);

module.exports = router;
