const User = require("../../models/User");
const razorpay = require("../../config/razorpay");

exports.createRazorpayOrder = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("cart.product");

    if (!user || !user.cart.length) {
      return res.status(400).json({ 
        success: false, 
        message: "Cart is empty" 
      });
    }

    const totalAmount = user.cart.reduce((sum, item) => {
      if (!item.product) return sum;
      return sum + item.product.price * item.quantity;
    }, 0);

    if (totalAmount <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid cart total" 
      });
    }

    const shippingFee = totalAmount > 0 ? 5 : 0;
    const finalTotal = (totalAmount + shippingFee) * 100; 

    const razorpayOrder = await razorpay.orders.create({
      amount: finalTotal,
      currency: "INR",
      receipt: `order_${Date.now()}_${req.user._id}`,
      notes: {
        userId: req.user._id.toString()
      }
    });

    res.json({
      success: true,
      order: razorpayOrder,
      amount: finalTotal / 100 
    });
  } catch (err) {
    console.error("Razorpay order creation error:", err);
    next(err);
  }
};