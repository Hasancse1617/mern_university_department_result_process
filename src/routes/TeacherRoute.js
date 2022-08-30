const app = require("express");
const router = app.Router();
const { createTeacher, verifyTeacher, loginTeacher, forgotPassword, resetPassword } = require("../controllers/TeacherController");


router.post("/teacher/register", createTeacher);
router.post("/teacher/verify-account/:token", verifyTeacher);
router.post("/teacher/login", loginTeacher);
router.post("/teacher/forgot-password", forgotPassword);
router.post("/teacher/reset-password/:token", resetPassword);

module.exports = router;