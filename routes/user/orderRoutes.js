// const express = require("express");
// const router = express.Router();
// const { protect, userOnly } = require("../middlewares/authMiddleware");

// const {
//   placeOrder,
//   getMyOrders,
//   verifyRazorpayPayment
// } = require("../controllers/orderController");

// const {
//   createRazorpayOrder
// } = require("../../controllers/paymentController");


// router.post("/place", protect, userOnly, placeOrder);

// router.post("/razorpay/create", protect, userOnly, createRazorpayOrder);
// router.post("/razorpay/verify", protect, userOnly, verifyRazorpayPayment);

// router.get("/my", protect, userOnly, getMyOrders);

// module.exports = router;

const router = require("express").Router();
const { protect } = require("../../middlewares/auth.middleware");
const { userOnly } = require("../../middlewares/role.middleware");

const {
  placeOrderCOD,
  verifyRazorpayPayment,
  getMyOrders
} = require("../../controllers/user/orderController");

const {
  createRazorpayOrder
} = require("../../controllers/user/paymentController");

router.use(protect, userOnly);

router.post("/place", placeOrderCOD);
router.post("/razorpay/create", createRazorpayOrder);
router.post("/razorpay/verify", verifyRazorpayPayment);
router.get("/my", getMyOrders);

module.exports = router;
