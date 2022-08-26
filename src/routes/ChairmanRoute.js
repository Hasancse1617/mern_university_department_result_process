const app = require("express");
const router = app.Router();
const { createChairman, verifyChairman, loginChairman } = require("../controllers/ChairmanController");


router.post("/chairman/register", createChairman);
router.post("/chairman/verify-account/:token", verifyChairman);
router.post("/chairman/login", loginChairman);

module.exports = router;