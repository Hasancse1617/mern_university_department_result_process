const app = require("express");
const router = app.Router();
const { createChairman } = require("../controllers/ChairmanController");


router.post("/chairman/register", createChairman);

module.exports = router;