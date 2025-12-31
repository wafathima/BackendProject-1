const router = require("express").Router();
const { updateProfile } = require("../../controllers/user/userController");
const { userProtect } = require("../../middlewares/userAuth");

router.put("/profile", userProtect, updateProfile);

module.exports = router;
