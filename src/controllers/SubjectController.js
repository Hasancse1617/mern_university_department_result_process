const formidable = require('formidable');
const Subject = require('../models/Subject');
const Teacher = require("../models/Teacher");

module.exports.allTeacher = async(req, res) =>{
    const dept_id = req.params.dept_id;
    try {
        const response = await Teacher.find({dept_id, status: true}).select({ "name": 1, "_id": 1}).sort({createdAt:'descending'});
        return res.status(200).json({ response });
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.allSubjects = async(req, res) =>{
    const exam_id = req.params.exam_id;
    try {
        const response = await Subject.find({exam_id}).populate('first_examinar','name').populate('second_examinar','name').populate('third_examinar','name').sort({subject_code:'ascending'});
        return res.status(200).json({ response });
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.recentlySubjects = async(req, res) =>{
    const exam_id = req.params.exam_id;
    try {
        const response = await Subject.find({exam_id}).populate('first_examinar','name').populate('second_examinar','name').populate('third_examinar','name').sort({createdAt:'descending'});
        return res.status(200).json({ response });
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.createSubject = async(req, res) =>{ 
    const form = formidable();
    form.parse(req, async(err, fields, files) =>{
        const {exam_id, subject_code, subject_mark, subject_credit, examinar_number, first_examinar, second_examinar, third_examinar} = fields;
        const errors = [];
        if(subject_code === ''){
            errors.push({msg: 'Subject Code is required'});
        }else{
            let isValid = /^([A-Z])+\-([0-9])+$/.test(subject_code);
            if(!isValid){
                errors.push({msg: 'Valid Subject Code is required'});
            }
        }
        if(subject_mark === ''){
            errors.push({msg: 'Subject mark is required'});
        }else{
            let isnum = /^\d.+$/.test(subject_mark);
            if(!isnum){
                errors.push({msg: 'Valid mark is required'});
            }
        }
        if(subject_credit === ''){
            errors.push({msg: 'Subject credit is required'});
        }else{
            let isnum = /^\d.+$/.test(subject_credit);
            if(!isnum){
                errors.push({msg: 'Valid credit is required'});
            }
        }
        if(first_examinar === ''){
            errors.push({msg: 'First examinar is required'});
        }
        if(examinar_number === "three"){
            if(second_examinar === ''){
                errors.push({msg: 'Second examinar is required'});
            }
            if(third_examinar === ''){
                errors.push({msg: 'Third examinar is required'});
            }
        }

        const checkSubject = await Subject.findOne({exam_id, subject_code});
        if(checkSubject){
            errors.push({msg:'Subject is already exists'});
        }

        if(errors.length !== 0){
            return res.status(400).json({errors});
        }
        else{
            try {
                const response = await Subject.create({
                    exam_id,
                    subject_code,
                    subject_mark,
                    subject_credit,
                    first_examinar,
                    second_examinar,
                    third_examinar,
                });
                return res.status(200).json({msg: 'Subject created successfully', response});
            } catch (error) {
                return res.status(500).json({errors: [{msg: error.message}]});
            }
        }
    })
}

module.exports.editSubject = async(req, res) =>{
    const id = req.params.id;
    try {
        const response = await Subject.findOne({_id:id});
        return res.status(200).json({response});
        
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.updateSubject = async(req, res) =>{
    const id = req.params.id;
    const form = formidable({ multiples: true });
    const subject = await Subject.findOne({_id:id});
    form.parse(req, async(err, fields, files) =>{
        const { subject_mark, subject_credit, first_examinar, second_examinar, third_examinar} = fields;
        const errors = [];
        if(subject_mark === ''){
            errors.push({msg: 'Subject mark is required'});
        }else{
            let isnum = /^\d.+$/.test(subject_mark);
            if(!isnum){
                errors.push({msg: 'Valid mark is required'});
            }
        }
        if(subject_credit === ''){
            errors.push({msg: 'Subject credit is required'});
        }else{
            let isnum = /^\d.+$/.test(subject_credit);
            if(!isnum){
                errors.push({msg: 'Valid credit is required'});
            }
        }
        if(first_examinar === ''){
            errors.push({msg: 'First examinar is required'});
        }
        if(subject && subject.second_examinar){
            if(second_examinar === ''){
                errors.push({msg: 'Second examinar is required'});
            }
            if(third_examinar === ''){
                errors.push({msg: 'Third examinar is required'});
            }
        }
        
        if(errors.length !== 0){
            return res.status(400).json({errors});
        }
        else{
            try {
                const response = await Subject.findByIdAndUpdate(id,{
                    subject_mark,
                    subject_credit,
                    first_examinar,
                    second_examinar,
                    third_examinar
                });
                return res.status(200).json({msg: 'Subject updated successfully', response});
            } catch (error) {
                return res.status(500).json({errors: [{msg: error.message}]});
            }
        }
    })
}

module.exports.deleteSubject = async (req,res)=>{
    const id = req.params.id;
    try{
        const subject = await Subject.findByIdAndDelete(id);
        return res.status(200).json({msg: 'Subject deleted successfully'});
    }catch(error){
        return res.status(500).json({errors:error});
    } 
}
