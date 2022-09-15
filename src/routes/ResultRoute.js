const app = require("express");
const router = app.Router();
const { resultSubjects, resultSingleSubject, examResults } = require("../controllers/ResultController");

router.get("/exam/result-subjects/:exam_id", resultSubjects);
router.get("/exam/result-single-subject/:exam_id/:subject_id", resultSingleSubject);
router.get("/exam/exam-result/:exam_id", examResults);

module.exports = router;