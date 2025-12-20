const Product = require("../../models/Product");

exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock } = req.body;

    if (!name || !price || !category)
      return res.status(400).json({ message: "Required fields missing" });

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      stock: Number(stock) || 0,
      image: req.file
        ? `/uploads/products/${req.file.filename}`
        : null,
    });

    res.status(201).json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const update = { ...req.body };

    if (req.file)
      update.image = `/uploads/products/${req.file.filename}`;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    next(err);
  }
};
