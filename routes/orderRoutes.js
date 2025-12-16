const express = require("express");
const router = express.Router();
const { protect, userOnly } = require("../middlewares/authMiddleware");

const {
  placeOrder,
  getMyOrders,
  verifyRazorpayPayment
} = require("../controllers/orderController");

const {
  createRazorpayOrder
} = require("../controllers/paymentController");


router.post("/place", protect, userOnly, placeOrder);

router.post("/razorpay/create", protect, userOnly, createRazorpayOrder);
router.post("/razorpay/verify", protect, userOnly, verifyRazorpayPayment);

router.get("/my", protect, userOnly, getMyOrders);

module.exports = router;
