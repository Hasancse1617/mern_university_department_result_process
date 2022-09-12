const app = require("express");
const router = app.Router();
const { markStudents, markSubjects, markAdd, markEditStudents } = require("../controllers/MarkController");

router.get("/mark-students/all/:dept_id/:session/:subject_id/:teacher_id/:examinar_type/:exam_id", markStudents);
router.get("/mark-edit-students/all/:dept_id/:session/:subject_id/:teacher_id/:examinar_type/:exam_id", markEditStudents);
router.get("/mark-subjects/all/:exam_id", markSubjects);
router.post("/mark/add/", markAdd);

module.exports = router;