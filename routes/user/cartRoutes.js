// const express = require("express");
// const router = express.Router();

// const { protect, userOnly } = require("../middlewares/authMiddleware");
// const {
//   addToCart,
//   removeFromCart,
//   getCart
// } = require("../controllers/cartController");

// router.post("/add/:productId", protect, userOnly, addToCart);
// router.delete("/remove/:productId", protect, userOnly, removeFromCart);
// router.get("/", protect, userOnly, getCart);

// module.exports = router;


const router = require("express").Router();
const { protect } = require("../../middlewares/auth.middleware");
const { userOnly } = require("../../middlewares/role.middleware");

const {
  addToCart,
  removeFromCart,
  getCart
} = require("../../controllers/user/cartController");

router.use(protect, userOnly);

router.get("/", getCart);
router.post("/add/:productId", addToCart);
router.delete("/remove/:productId", removeFromCart);

module.exports = router;

