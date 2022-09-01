const Exam = require("../models/Exam");
const formidable = require("formidable");
const bcrypt = require('bcrypt');

module.exports.createExam = async (req,res)=>{
    const form = formidable({ multiples: true });
    form.parse(req, async(err, fields, files) =>{
        const {name, email, session, semister, exam_id, password, c_password} = fields;
        const errors = [];
        if(name === ''){
            errors.push({msg: 'Name is required'});
        }
        if(email === ''){
            errors.push({msg: 'Email is required'});
        }else{
            const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //Email validation
            if(!filter.test(email)){
                errors.push({msg: 'Valid email is required'});
            }
        }
        if(session === ''){
            errors.push({msg: 'Session is required'});
        }
        if(semister === ''){
            errors.push({msg: 'Semister is required'});
        }
        if(exam_id === ''){
            errors.push({msg: 'Exam ID is required'});
        }else{
            const filter = /^([A-Z0-9])+$/;
            if(!filter.test(exam_id)){
                errors.push({msg: 'Only used UpperCase letters & Numbers for Exam ID'});
            }
            else if(exam_id.length < 8){
                errors.push({msg: 'Exam ID must be 7 characters long!!!'});
            }
        }
        if(password === ''){
            errors.push({msg: 'Password is required'});
        }else{
            if(password.length < 6){
                errors.push({msg: 'Password must be 6 characters long!!!'});
            }
            else if(password !== c_password){
                errors.push({msg: 'Password & Confirm Password must be equal!!'});
            }
        }
        const checkExam = await Exam.findOne({exam_id});
        if(checkExam){
            errors.push({msg:'Exam is already exists'});
        }
        if(errors.length !== 0){
            return res.status(400).json({errors});
        }
        else{
            // Hash Paaword
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            try {
                const response = await Exam.create({
                    name,
                    email,
                    type: "exam_chairman",
                    session,
                    semister,
                    exam_id,
                    password: hash,
                });
                
                return res.status(200).json({msg: 'Exam Created successfully. You can login after accept from Dept Chairman!', response});
            } catch (error) {
                return res.status(500).json({errors: [{msg: error.message}]});
            }
        }
    });
}