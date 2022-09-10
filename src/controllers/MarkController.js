const Subject = require('../models/Subject');
const Student = require('../models/Student');
const Mark = require('../models/Mark');
const formidable = require('formidable');

// Teacher Section 
module.exports.markStudents = async(req, res) =>{
    const session = req.params.session;
    const subject_id = req.params.subject_id;
    const teacher_id = req.params.teacher_id;
    const examinar_type = req.params.examinar_type;
    const check_entry = await Mark.findOne({marks:{subject_id}});

    if(session !="" && subject_id !="" && teacher_id !=""){
        const errors = [];  
        if(examinar_type === "first_examinar"){
            const first_examinar = await Subject.findOne({ _id: subject_id, first_examinar:teacher_id });
            if(!first_examinar){
                errors.push({msg: 'You are not First examinar for this subject'});
            }else if(check_entry && check_entry.marks.first_mark){
                errors.push({msg: "Your entry already exists. You will can only update!"})
            }
        }
        if(examinar_type === "second_examinar"){
            const second_examinar = await Subject.findOne({ _id: subject_id, second_examinar:teacher_id });
            if(!second_examinar){
                errors.push({msg: 'You are not Second examinar for this subject'});
            }else if(check_entry && check_entry.marks.second_mark){
                errors.push({msg: "Your entry already exists. You will can only update!"})
            }
            else if(check_entry && !check_entry.marks.first_mark){
                errors.push({msg: "You will can mark entry after first examinar!"})
            }
        }
        if(examinar_type === "third_examinar"){
            const third_examinar = await Subject.findOne({ _id: subject_id, third_examinar:teacher_id });
            if(!third_examinar){
                errors.push({msg: 'You are not Third examinar for this subject'});
            }else if(check_entry && check_entry.marks.third_mark){
                errors.push({msg: "Your entry already exists. You will can only update!"})
            }else if(check_entry && !check_entry.marks.second_mark){
                errors.push({msg: "You will can mark entry after Second examinar!"})
            }
        }
            
        if(errors.length !== 0){
            return res.status(400).json({errors});
        }else{
            try {
                const response = await Student.find({session}).sort({subject_code:'ascending'});
                return res.status(200).json({ response, examinar_type });
            } catch (error) {
                return res.status(500).json({errors: [{msg: error.message}]});
            }
        }
    }
}
//Teacher Section
module.exports.markSubjects = async(req, res) =>{
    const exam_model_id = req.params.exam_id;
    if(exam_model_id != ""){
        try {
            const response = await Subject.find({exam_id: exam_model_id}).select({_id:1,subject_code:1}).sort({subject_code:'ascending'});
            return res.status(200).json({ response });
        } catch (error) {
            return res.status(500).json({errors: [{msg: error.message}]});
        }
    }
}

module.exports.markAdd = async(req,res) =>{
    const form = formidable();
    form.parse(req, async(err, fields, files) =>{
        const {state: {exam_id,session,semister}, marKArr, examinarType} = fields;
        console.log(examinarType);
    })
}