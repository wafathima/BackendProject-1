const User = require("../models/User");

exports.addToCart = async (req, res, next) => {
  try {
    const user = req.user;
    const { productId } = req.params;

    const existingItem = user.cart.find(
      (i) => i.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({ product: productId, quantity: 1 });
    }

    await user.save();

    res.json({
      success: true,
      message: "Added to cart",
      cart: user.cart
    });
  } catch (err) {
    next(err);
  }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const user = req.user;
    const { productId } = req.params;

    user.cart = user.cart.filter(
      (i) => i.product.toString() !== productId
    );

    await user.save();

    res.json({
      success: true,
      message: "Removed from cart",
      cart: user.cart
    });
  } catch (err) {
    next(err);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const userWithCart = await User.findById(req.user._id).populate(
      "cart.product"
    );

    res.json({
      success: true,
      cart: userWithCart.cart
    });
  } catch (err) {
    next(err);
  }
};
