const app = require("express");
const router = app.Router();
const { createChairman, verifyChairman, fetchDashInfo, loginChairman, forgotPassword, resetPassword, resignChairman } = require("../controllers/ChairmanController");


router.post("/chairman/register", createChairman);
router.post("/chairman/verify-account/:token", verifyChairman);
router.post("/chairman/login", loginChairman);
router.post("/chairman/forgot-password", forgotPassword);
router.post("/chairman/reset-password/:token", resetPassword);
router.get("/chairman/dash-info/:dept_id", fetchDashInfo);
router.post("/chairman/resign/:id", resignChairman);

module.exports = router;