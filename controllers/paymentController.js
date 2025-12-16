// // const razorpay = require("../config/razorpay");

// // exports.createPayment = async (req, res) => {
// //   const { amount } = req.body;

// //   const order = await razorpay.orders.create({
// //     amount: amount * 100,
// //     currency: "INR"
// //   });

// //   res.json(order);
// // };

const User = require("../models/User");
const razorpay = require("../config/razorpay");

exports.createRazorpayOrder = async (req, res) => {
  const user = await User.findById(req.user._id).populate("cart.product");

  if (!user.cart.length) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const totalAmount = user.cart.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  const razorpayOrder = await razorpay.orders.create({
    amount: totalAmount * 100, // ₹ → paise
    currency: "INR",
    receipt: "order_" + Date.now()
  });

  res.json({ razorpayOrder });
};
