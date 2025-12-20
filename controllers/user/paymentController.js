const User = require("../../models/User");
const razorpay = require("../../config/razorpay");

exports.createRazorpayOrder = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("cart.product");

    if (!user || !user.cart.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = user.cart.reduce((sum, item) => {
      if (!item.product) return sum;
      return sum + item.product.price * item.quantity;
    }, 0);

    if (totalAmount <= 0) {
      return res.status(400).json({ message: "Invalid cart total" });
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100, // INR → paise
      currency: "INR",
      receipt: `order_${Date.now()}`,
    });

    res.json({
      success: true,
      razorpayOrder,
    });
  } catch (err) {
    next(err);
  }
};
