const router = require("express").Router();
const { protect } = require("../../middlewares/auth.middleware");
const { adminOnly } = require("../../middlewares/role.middleware");

const {
  getAllOrders,
  updateOrderStatus
} = require("../../controllers/admin/adminOrderController");

router.use(protect, adminOnly);

router.get("/", getAllOrders);
router.put("/:id/status", updateOrderStatus);

module.exports = router;
