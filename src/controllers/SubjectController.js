const formidable = require('formidable');
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

module.exports.allTeacher = async(req, res) =>{
    const dept_id = req.params.dept_id;
    try {
        const response = await Teacher.find({dept_id}).sort({createdAt:'descending'});
        return res.status(200).json({ response });
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.recentlySubjects = async(req, res) =>{
    const dept_id = req.params.dept_id;
    try {
        const response = await Student.find({dept_id}).limit(10).sort({createdAt:'descending'});
        return res.status(200).json({ response });
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.createSubject = async(req, res) =>{ 
    const form = formidable();
    form.parse(req, async(err, fields, files) =>{
        const {dept_id, name, roll, reg, session} = fields;
        const errors = [];
        if(name === ''){
            errors.push({msg: 'Student name is required'});
        }
        if(roll === ''){
            errors.push({msg: 'Student roll is required'});
        }else{
            let isnum = /^\d+$/.test(roll);
            if(!isnum){
                errors.push({msg: 'Valid roll is required'});
            }
        }
        if(reg === ''){
            errors.push({msg: 'Student reg is required'});
        }else{
            let isnum = /^\d+$/.test(roll);
            if(!isnum){
                errors.push({msg: 'Valid reg is required'});
            }
        }
        if(session === ''){
            errors.push({msg: 'Student session is required'});
        }

        const checkStudent = await Student.findOne({session, roll});
        if(checkStudent){
            errors.push({msg:'Student is already exists'});
        }

        if(errors.length !== 0){
            return res.status(400).json({errors});
        }
        else{
            try {
                const response = await Student.create({
                    dept_id,
                    name,
                    roll,
                    reg,
                    session,
                });
                return res.status(200).json({msg: 'Student created successfully', response});
            } catch (error) {
                console.log("hhhhh")
                return res.status(500).json({errors: [{msg: error.message}]});
            }
        }
    })
}

module.exports.editSubject = async(req, res) =>{
    const id = req.params.id;
    try {
        const response = await Student.findOne({_id:id});
        return res.status(200).json({response});
        
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.updateSubject = async(req, res) =>{
    const id = req.params.id;
    const form = formidable({ multiples: true });

    form.parse(req, async(err, fields, files) =>{
        const {name, session} = fields;
        const errors = [];
        if(name === ''){
            errors.push({msg: 'Student name is required'});
        }
        if(session === ''){
            errors.push({msg: 'Student session is required'});
        }
        
        if(errors.length !== 0){
            return res.status(400).json({errors});
        }
        else{
            try {
                const response = await Student.findByIdAndUpdate(id,{
                    name,
                    session
                });
                return res.status(200).json({msg: 'Student updated successfully', response});
            } catch (error) {
                return res.status(500).json({errors: [{msg: error.message}]});
            }
        }
    })
}

module.exports.deleteSubject = async (req,res)=>{
    const id = req.params.id;
    try{
        const student = await Student.findByIdAndDelete(id);
        return res.status(200).json({msg: 'Student deleted successfully'});
    }catch(error){
        return res.status(500).json({errors:error});
    } 
}
