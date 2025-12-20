const router = require("express").Router();
const upload = require("../../middlewares/upload.middleware");
const { protect } = require("../../middlewares/auth.middleware");
const { adminOnly } = require("../../middlewares/role.middleware");

const {
  createProduct,
  updateProduct,
  deleteProduct
} = require("../../controllers/admin/adminProductController");

router.use(protect, adminOnly);

router.post("/", upload.single("image"), createProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
