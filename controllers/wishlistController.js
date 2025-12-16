const User = require("../models/User");

exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user._id);

    if (user.wishlist.map(String).includes(productId)) {
      return res.json({ success: false, message: "Already in wishlist" });
    }

    user.wishlist.push(productId);
    await user.save();

    res.json({ success: true, message: "Added to wishlist", wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user._id);

    user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    await user.save();

    res.json({ success: true, message: "Removed from wishlist", wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");
    res.json({ success: true, wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
