const app = require("express");
const router = app.Router();
const { createExam, loginExam, forgotPassword, resetPassword, allExam, deleteExam, statusExam } = require("../controllers/ExamController");


router.post("/exam/register", createExam);
router.post("/exam/login", loginExam);
router.post("/exam/forgot-password", forgotPassword);
router.post("/exam/reset-password/:token", resetPassword);
router.get("/exam/all-exam/:dept_id", allExam);
router.post("/delete-exam/:id", deleteExam);
router.post("/status-exam", statusExam);

module.exports = router;