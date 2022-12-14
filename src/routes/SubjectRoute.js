const app = require("express");
const router = app.Router();
const { allSubjects, allTeacher, recentlySubjects, createSubject, editSubject, updateSubject, deleteSubject } = require("../controllers/SubjectController");

router.get("/subject/all/:exam_id", allSubjects);
router.get("/subject/recent-subjects/:exam_id", recentlySubjects);
router.get("/subject/teachers/:dept_id", allTeacher);
router.post("/subject/add", createSubject);
router.get("/subject/edit/:id", editSubject);
router.post("/subject/update/:id", updateSubject);
router.post("/subject/delete/:id", deleteSubject);

module.exports = router;