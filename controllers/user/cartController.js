// const User = require("../models/User");

// exports.addToCart = async (req, res, next) => {
//   try {
//     const user = req.user;
//     const { productId } = req.params;

//     const existingItem = user.cart.find(
//       (i) => i.product.toString() === productId
//     );

//     if (existingItem) {
//       existingItem.quantity += 1;
//     } else {
//       user.cart.push({ product: productId, quantity: 1 });
//     }

//     await user.save();

//     res.json({
//       success: true,
//       message: "Added to cart",
//       cart: user.cart
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// exports.removeFromCart = async (req, res, next) => {
//   try {
//     const user = req.user;
//     const { productId } = req.params;

//     user.cart = user.cart.filter(
//       (i) => i.product.toString() !== productId
//     );

//     await user.save();

//     res.json({
//       success: true,
//       message: "Removed from cart",
//       cart: user.cart
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// exports.getCart = async (req, res, next) => {
//   try {
//     const userWithCart = await User.findById(req.user._id).populate(
//       "cart.product"
//     );

//     res.json({
//       success: true,
//       cart: userWithCart.cart
//     });
//   } catch (err) {
//     next(err);
//   }
// };

const User = require("../../models/User");
const Product = require("../../models/Product");

exports.addToCart = async (req, res, next) => {
  try {
    const user = req.user;
    const { productId } = req.params;

    const productExists = await Product.findById(productId);
    if (!productExists)
      return res.status(404).json({ message: "Product not found" });

    const item = user.cart.find(
      (i) => i.product.toString() === productId
    );

    if (item) {
      item.quantity += 1;
    } else {
      user.cart.push({ product: productId, quantity: 1 });
    }

    await user.save();

    res.json({
      success: true,
      message: "Product added to cart",
      cart: user.cart
    });
  } catch (err) {
    next(err);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;

    req.user.cart = req.user.cart.filter(
      (i) => i.product.toString() !== productId
    );

    await req.user.save();

    res.json({
      success: true,
      message: "Product removed from cart",
      cart: req.user.cart
    });
  } catch (err) {
    next(err);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("cart.product", "name price image");

    res.json({
      success: true,
      cart: user.cart
    });
  } catch (err) {
    next(err);
  }
};
