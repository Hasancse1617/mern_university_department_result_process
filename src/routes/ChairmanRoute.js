const app = require("express");
const router = app.Router();
const { createChairman, verifyChairman, loginChairman, forgotPassword, resetPassword } = require("../controllers/ChairmanController");


router.post("/chairman/register", createChairman);
router.post("/chairman/verify-account/:token", verifyChairman);
router.post("/chairman/login", loginChairman);
router.post("/chairman/forgot-password", forgotPassword);
router.post("/chairman/reset-password/:token", resetPassword);

module.exports = router;