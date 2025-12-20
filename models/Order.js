// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  
//   items: [
//     {
//       product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
//       quantity: { type: Number, required: true },
//       price: { type: Number, required: true }
//     }
//   ],

//   totalAmount: { type: Number, required: true },

//   paymentMethod: { type: String, enum: ["COD", "RAZORPAY"] },

//   orderStatus: { type: String, enum: ["PLACED", "PROCESSING", "SHIPPED", "DELIVERED"], default: "PLACED" }
// }, { timestamps: true });

// module.exports = mongoose.model("Order", orderSchema);

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
        ref: "Product",
        required: true
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
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
    default: "PLACED"
  }

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
