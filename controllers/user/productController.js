// const Product = require("../../models/Product");

// // exports.createProduct = async (req, res, next) => {
// //   try {
// //     console.log("controller reached")
// //     console.log("BODY:", req.body);
// //     console.log("FILE:", req.file);

// //     const product = await Product.create({
// //       ...req.body,
// //       image: req.file ? `/uploads/products/${req.file.filename}` : null
// //     });

// //     res.json({ success: true, product });
// //   } catch (err) {
// //     next(err);
// //   }
// // };

// exports.createProduct = async (req, res, next) => {

//   console.log("BODY 👉", req.body);
//   console.log("FILE 👉", req.file);

//   try {
//     const product = await Product.create({
//       name: req.body.name,
//       description: req.body.description,
//       price: req.body.price,
//       category: req.body.category,
//       stock: req.body.stock,
//       image: req.file ? `/uploads/products/${req.file.filename}` : null
//     });

//     res.status(201).json({ success: true, product });
//   } catch (err) {
//     next(err);
//   }
// };



// exports.getProducts = async (req, res, next) => {
//   try {
//     const { category } = req.query;

//     let filter = {};
//     if (category) {
//       filter.category = category;
//     }

//     const products = await Product.find(filter);
//     res.json({ success: true, products });
//   } catch (err) {
//     next(err);
//   }
// };


// exports.getProduct = async (req, res, next) => {
//   try {
//     const p = await Product.findById(req.params.id);
//     if (!p) { const e = new Error("Not found"); e.status=404; throw e; }
//     res.json({ success:true, product: p });
//   } catch (err) { next(err); }
// };

// exports.updateProduct = async (req, res, next) => {
//   try {
//     const updateData = { ...req.body };

//     if (req.file) {
//       updateData.image = `/uploads/products/${req.file.filename}`;
//     }

//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true }
//     );

//     res.json({ success: true, product });
//   } catch (err) {
//     next(err);
//   }
// };


// exports.deleteProduct = async (req, res, next) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ success:true, message: "Deleted" });
//   } catch (err) { next(err); }
// };

const Product = require("../../models/Product");

exports.getProducts = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.json({ success: true, products });
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json({ success: true, product });
  } catch (err) {
    next(err);
  }
};
