const app = require("express");
const router = app.Router();
const { singleSessionStudent, allTeacher, recentlyAdded, createStudent, editStudent, updateStudent, deleteStudent, deleteTeacher, statusTeacher } = require("../controllers/StudentController");

router.get("/student/session-student/:dept_id", singleSessionStudent);
router.get("/student/recently-added/:dept_id", recentlyAdded);
router.get("/chairman/all-teacher/:dept_id", allTeacher);
router.post("/student/add", createStudent);
router.get("/student/edit/:id", editStudent);
router.post("/student/update/:id", updateStudent);
router.post("/student/delete/:id", deleteStudent);
router.post("/teacher-delete/:id", deleteTeacher);
router.post("/status-teacher", statusTeacher);

module.exports = router;