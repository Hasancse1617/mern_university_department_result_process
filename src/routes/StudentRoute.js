const app = require("express");
const router = app.Router();
const { singleSessionStudent, allTeacher, recentlyAdded, createStudent, editStudent, updateStudent, deleteStudent, statusTeacher } = require("../controllers/StudentController");

router.get("/student/session-student", singleSessionStudent);
router.get("/student/recently-added", recentlyAdded);
router.get("/chairman/all-teacher", allTeacher);
router.post("/student/add", createStudent);
router.get("/student/edit/:id", editStudent);
router.post("/student/update/:id", updateStudent);
router.post("/student/delete/:id", deleteStudent);
router.post("/status-teacher", statusTeacher);

module.exports = router;