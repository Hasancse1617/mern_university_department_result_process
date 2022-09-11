const app = require("express");
const router = app.Router();
const { markStudents, markSubjects, markAdd } = require("../controllers/MarkController");

router.get("/mark-students/all/:session/:subject_id/:teacher_id/:examinar_type/:exam_id", markStudents);
router.get("/mark-subjects/all/:exam_id", markSubjects);
router.post("/mark/add/", markAdd);

module.exports = router;