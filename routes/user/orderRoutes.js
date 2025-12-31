const router = require("express").Router();
const { userProtect } = require("../../middlewares/userAuth");

const {
  placeOrderCOD,
  verifyRazorpayPayment,
  getMyOrders
} = require("../../controllers/user/orderController");

const {
  createRazorpayOrder
} = require("../../controllers/user/paymentController");

router.use(userProtect);

router.post("/place", placeOrderCOD);
router.post("/razorpay/create", createRazorpayOrder);
router.post("/razorpay/verify", verifyRazorpayPayment);
router.get("/my", getMyOrders);
router.get("/my-orders", userProtect, getMyOrders);


module.exports = router;
