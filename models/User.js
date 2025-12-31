// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },

//     role: { type: String, enum: ["user", "admin"], default: "user" },

    
//     email: {
//       type: String,
//       required: true,
//       unique: true
//     },

//     password: {
//       type: String,
//       required: true
//     },

//     phone: {
//       type: String,
//       default: ""
//     },

//     address: {
//       type: String,
//       default: ""
//     },

//     bio: {
//       type: String,
//       default: ""
//     },

//     avatar: {
//       type: String, 
//       default: ""
//     },

//     wishlist: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Product"
//       }
//     ],

//     cart: [
//       {
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product"
//         },
//         quantity: {
//           type: Number,
//           default: 1
//         }
//       }
//     ]
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);

// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    
    role: { type: String, enum: ["user", "admin"], default: "user" },
    
    isBlocked: { type: Boolean, default: false },
    blockedAt: { type: Date },
    blockedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    lastLogin: { type: Date },
    loginCount: { type: Number, default: 0 },
    
    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      default: ""
    },

    address: {
      type: String,
      default: ""
    },

    bio: {
      type: String,
      default: ""
    },

    avatar: {
      type: String, 
      default: ""
    },

    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    ],

    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },
        quantity: {
          type: Number,
          default: 1
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);