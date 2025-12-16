const express = require("express");
const router = express.Router();
const { protect, userOnly } = require("../middlewares/authMiddleware");
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist
} = require("../controllers/wishlistController");

router.post("/add/:productId", protect, userOnly, addToWishlist);
router.delete("/remove/:productId", protect, userOnly, removeFromWishlist);
router.get("/", protect, userOnly, getWishlist);

module.exports = router;
