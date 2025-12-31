const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    name: String,
    image: String,
    quantity: Number,
    price: Number
  }
],

  totalAmount: { type: Number, required: true },

  paymentMethod: {
    type: String,
    enum: ["COD", "RAZORPAY"],
    required: true
  },

  paymentStatus: {
    type: String,
    enum: ["PENDING", "PAID"],
    default: "PENDING"
  },

  orderStatus: {
    type: String,
    enum: ["PLACED", "PROCESSING", "SHIPPED", "DELIVERED"],
    default: "PROCESSING"
  }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
