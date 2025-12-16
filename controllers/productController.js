const Product = require("../models/Product");

exports.createProduct = async (req, res, next) => {
  try {
    const p = await Product.create(req.body);
    res.json({ success:true, product: p });
  } catch (err) { next(err); }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json({ success:true, products });
  } catch (err) { next(err); }
};

exports.getProduct = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) { const e = new Error("Not found"); e.status=404; throw e; }
    res.json({ success:true, product: p });
  } catch (err) { next(err); }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success:true, product: p });
  } catch (err) { next(err); }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success:true, message: "Deleted" });
  } catch (err) { next(err); }
};
