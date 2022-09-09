const app = require("express");
const router = app.Router();
const { subjectStudents, markStudents } = require("../controllers/MarkController");

router.get("/subject-student/all/:subject_id", subjectStudents);
router.get("/mark-subjects/all/:exam_id", markStudents);

module.exports = router;