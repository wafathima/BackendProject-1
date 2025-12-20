// const express = require("express");
// const router = express.Router();
// const { protect, userOnly } = require("../middlewares/authMiddleware");
// const {
//   addToWishlist,
//   removeFromWishlist,
//   getWishlist
// } = require("../controllers/wishlistController");

// router.post("/add/:productId", protect, userOnly, addToWishlist);
// router.delete("/remove/:productId", protect, userOnly, removeFromWishlist);
// router.get("/", protect, userOnly, getWishlist);

// module.exports = router;

const router = require("express").Router();
const { protect } = require("../../middlewares/auth.middleware");
const { userOnly } = require("../../middlewares/role.middleware");

const {
  addToWishlist,
  removeFromWishlist,
  getWishlist
} = require("../../controllers/user/wishlistController");

router.use(protect, userOnly);

router.get("/", getWishlist);
router.post("/add/:productId", addToWishlist);
router.delete("/remove/:productId", removeFromWishlist);

module.exports = router;
