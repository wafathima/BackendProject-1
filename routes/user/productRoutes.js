// const express = require("express");
// const router = express.Router();

// const {
//   createProduct,
//   getProducts,
//   getProduct,
//   updateProduct,
//   deleteProduct,
// } = require("../../controllers/user/productController");

// const { protect, adminOnly } = require("../../middlewares/auth.middleware");
// const upload = require("../../middlewares/upload.middleware");

// /* CREATE PRODUCT */
// router.post(
//   "/",
//   protect,
//   adminOnly,
//   upload.single("image"), // 👈 THIS IS KEY
//   createProduct
// );

// /* UPDATE PRODUCT */
// router.put(
//   "/:id",
//   protect,
//   adminOnly,
//   upload.single("image"),
//   updateProduct
// );

// /* DELETE PRODUCT */
// router.delete("/:id", protect, adminOnly, deleteProduct);

// /* GET ALL */
// router.get("/", getProducts);

// /* GET ONE */
// router.get("/:id", getProduct);

// module.exports = router;


const router = require("express").Router();
const {
  getProducts,
  getProduct
} = require("../../controllers/user/productController");

router.get("/", getProducts);
router.get("/:id", getProduct);

module.exports = router;
