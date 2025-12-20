// const Order = require("../models/Order");
// const User = require("../models/User");
// const razorpay = require("../config/razorpay");
// const crypto = require("crypto");


// exports.placeOrder = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id)
//       .populate("cart.product");

//     if (!user || !user.cart.length) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     const items = user.cart.map(item => {
//       if (!item.product) {
//         throw new Error("Product not found in cart");
//       }

//       return {
//         product: item.product._id,
//         quantity: item.quantity,
//         price: item.product.price
//       };
//     });

//     const totalAmount = items.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );

//     const order = await Order.create({
//       user: user._id,
//       items,
//       totalAmount,
//       paymentMethod: "COD",
//     });

//     user.cart = [];
//     await user.save();

//     res.json({ success: true, order });

//   } catch (err) {
//     console.error("ORDER ERROR:", err.message);
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.verifyRazorpayPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature
//     } = req.body;

//     const sign = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSign = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(sign)
//       .digest("hex");

//     if (expectedSign !== razorpay_signature) {
//       return res.status(400).json({ message: "Payment verification failed" });
//     }

//     const user = await User.findById(req.user._id).populate("cart.product");

//     const items = user.cart.map(item => ({
//       product: item.product._id,
//       quantity: item.quantity,
//       price: item.product.price
//     }));

//     const totalAmount = items.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );

//     const order = await Order.create({
//       user: user._id,
//       items,
//       totalAmount,
//       paymentMethod: "RAZORPAY",
//       paymentStatus: "PAID"
//     });

//     user.cart = [];
//     await user.save();

//     res.json({ success: true, order });

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// exports.getMyOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.user._id })
//       .populate("items.product")
//       .sort({ createdAt: -1 });

//     res.json({ success: true, orders });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const Order = require("../../models/Order");
const User = require("../../models/User");
const crypto = require("crypto");

exports.placeOrderCOD = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("cart.product");

    if (!user.cart.length)
      return res.status(400).json({ message: "Cart is empty" });

    const items = user.cart.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price
    }));

    const totalAmount = items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    const order = await Order.create({
      user: user._id,
      items,
      totalAmount,
      paymentMethod: "COD"
    });

    user.cart = [];
    await user.save();

    res.status(201).json({ success: true, order });
  } catch (err) {
    next(err);
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

    if (expected !== razorpay_signature)
      return res.status(400).json({ message: "Payment verification failed" });

    const user = await User.findById(req.user._id)
      .populate("cart.product");

    const items = user.cart.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price
    }));

    const totalAmount = items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    const order = await Order.create({
      user: user._id,
      items,
      totalAmount,
      paymentMethod: "RAZORPAY",
      paymentStatus: "PAID"
    });

    user.cart = [];
    await user.save();

    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product", "name price")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    next(err);
  }
};

