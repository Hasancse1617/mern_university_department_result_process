const app = require("express");
const router = app.Router();
const { markStudents, markUpdateLabViva, markAddLabViva, markLabVivaStudents, markSubjects, markAdd, markUpdate, markEditStudents, markLabVivaEditStudents } = require("../controllers/MarkController");

router.get("/mark-students/all/:dept_id/:session/:subject_id/:teacher_id/:examinar_type/:exam_id", markStudents);
router.get("/mark-lab-viva-students/all/:dept_id/:session/:subject_id/:teacher_id/:exam_id", markLabVivaStudents);
router.get("/mark-lab-viva-edit-students/all/:dept_id/:session/:subject_id/:teacher_id/:exam_id", markLabVivaEditStudents);
router.get("/mark-edit-students/all/:dept_id/:session/:subject_id/:teacher_id/:examinar_type/:exam_id", markEditStudents);
router.get("/mark-subjects/all/:exam_id/:subject_type", markSubjects);
router.post("/mark/add/", markAdd);
router.post("/mark-lab-viva/add/", markAddLabViva);
router.post("/mark/update/", markUpdate);
router.post("/mark-lab-viva/update/", markUpdateLabViva);

module.exports = router;