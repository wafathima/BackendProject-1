const express = require("express");
const router = express.Router();

const { protect, userOnly } = require("../middlewares/authMiddleware");
const {
  addToCart,
  removeFromCart,
  getCart
} = require("../controllers/cartController");

router.post("/add/:productId", protect, userOnly, addToCart);
router.delete("/remove/:productId", protect, userOnly, removeFromCart);
router.get("/", protect, userOnly, getCart);

module.exports = router;



