const app = require("express");
const router = app.Router();
const { createExam, loginExam, forgotPassword, resetPassword } = require("../controllers/ExamController");


router.post("/exam/register", createExam);
// router.post("/exam/login", loginExam);
// router.post("/exam/forgot-password", forgotPassword);
// router.post("/exam/reset-password/:token", resetPassword);

module.exports = router;