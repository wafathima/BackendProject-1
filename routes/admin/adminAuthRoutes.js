const router = require("express").Router();
const { adminLogin } = require("../../controllers/admin/adminAuthController");

router.post("/login", adminLogin);

module.exports = router;
