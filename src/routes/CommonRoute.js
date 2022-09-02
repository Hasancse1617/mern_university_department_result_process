const app = require("express");
const router = app.Router();
const { fetchDept } = require("../controllers/CommonController");


router.get("/all-dept", fetchDept);
// router.post("/chairman/verify-account/:token", verifyChairman);
// router.post("/chairman/login", loginChairman);
// router.post("/chairman/forgot-password", forgotPassword);
// router.post("/chairman/reset-password/:token", resetPassword);

module.exports = router;