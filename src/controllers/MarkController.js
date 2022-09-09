const Subject = require('../models/Subject');

// Exam Section 
module.exports.subjectStudents = async(req, res) =>{
    const subject_id = req.params.subject_id;
    const subject = await Subject.findOne({_id: subject_id});
    console.log(subject);
    // try {
    //     const response = await Subject.find({exam_id}).populate('first_examinar','name').populate('second_examinar','name').populate('third_examinar','name').sort({subject_code:'ascending'});
    //     return res.status(200).json({ response });
    // } catch (error) {
    //     return res.status(500).json({errors: [{msg: error.message}]});
    // }
}
//Teacher Section
module.exports.markStudents = async(req, res) =>{
    const exam_model_id = req.params.exam_id;
    try {
        const response = await Subject.find({exam_id: exam_model_id}).select({_id:1,subject_code:1}).sort({subject_code:'ascending'});
        return res.status(200).json({ response });
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}