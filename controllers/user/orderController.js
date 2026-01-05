const Order = require("../../models/Order");
const User = require("../../models/User");
const crypto = require("crypto");

exports.placeOrderCOD = async (req, res) => {
  try {
    const user = req.user;

    if (!user || !user.cart || user.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    await user.populate("cart.product");

    const validItems = user.cart.filter(
      item => item.product && item.product.isDeleted === false
    );

    if (validItems.length === 0) {
      return res.status(400).json({ message: "No valid products in cart" });
    }

    const orderItems = validItems.map(item => ({
      product: item.product._id,
      name: item.product.name,
      image: item.product.image,
      quantity: item.quantity,
      price: item.product.price
    }));

    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const shippingFee = totalAmount > 0 ? 5 : 0;
    const finalTotal = totalAmount + shippingFee;

    const order = await Order.create({
      user: user._id,
      items: orderItems,
      totalAmount: finalTotal,
      shippingFee,
      paymentMethod: "COD",
      paymentStatus: "PENDING",
      orderStatus: "PROCESSING"
    });

    user.cart = [];
    await user.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order
    });

  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).json({ message: "Order creation failed", error: err.message });
  }
};

exports.verifyRazorpayPayment = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ 
        success: false, 
        message: "Payment verification failed" 
      });
    }

    const user = await User.findById(req.user._id)
      .populate("cart.product");

    if (!user || !user.cart.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderItems = user.cart.map(item => ({
      product: item.product._id,
      name: item.product.name,
      image: item.product.image,
      quantity: item.quantity,
      price: item.product.price
    }));

    const totalAmount = orderItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    const shippingFee = totalAmount > 0 ? 5 : 0;
    const finalTotal = totalAmount + shippingFee;

    const order = await Order.create({
      user: user._id,
      items: orderItems,
      totalAmount: finalTotal,
      shippingFee,
      paymentMethod: "RAZORPAY",
      paymentStatus: "PAID",
      orderStatus: "PROCESSING",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id
    });

    user.cart = [];
    await user.save();

    res.json({ 
      success: true, 
      message: "Payment verified and order placed",
      order 
    });
  } catch (err) {
    console.error("Razorpay verification error:", err);
    next(err);
  }
};

exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product", "name price image")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    next(err);
  }
};