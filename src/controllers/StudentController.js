const formidable = require('formidable');
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");


module.exports.singleSessionStudent = async(req, res) =>{
    const session = req.query.session;
    try {
        const response = await Student.find({session}).sort({roll:"ascending"});
        return res.status(200).json({ response });
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.allTeacher = async(req, res) =>{
    try {
        const response = await Teacher.find().sort({createdAt:'descending'});
        return res.status(200).json({ response });
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.recentlyAdded = async(req, res) =>{
    try {
        const response = await Student.find().limit(10).sort({createdAt:'descending'});
        return res.status(200).json({ response });
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.createStudent = async(req, res) =>{ 
    const form = formidable();
    form.parse(req, async(err, fields, files) =>{
        const {name, roll, reg, session} = fields;
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

module.exports.editStudent = async(req, res) =>{
    const id = req.params.id;
    try {
        const response = await Student.findOne({_id:id});
        return res.status(200).json({response});
        
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.updateStudent = async(req, res) =>{
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

module.exports.deleteStudent = async (req,res)=>{
    const id = req.params.id;
    try{
        const student = await Student.findByIdAndDelete(id);
        return res.status(200).json({msg: 'Student deleted successfully'});
    }catch(error){
        return res.status(500).json({errors:error});
    } 
}

module.exports.statusTeacher = async(req, res) =>{
    const form = formidable({ multiples: true });
    form.parse(req, async(err, fields, files) =>{
        const { status, teacher_id } = fields;
        let teacher_status ;
        if(status === 'true'){
            teacher_status = false;
        }else{
            teacher_status = true;
        }
        try {
            const response = await Teacher.findOneAndUpdate({_id: teacher_id},{
                status: teacher_status
            },{new: true});
            return res.status(200).json({ status: teacher_status, teacher_id});
        } catch (error) {
            return res.status(500).json({errors: [{msg: error.message}]});
        }
    });
}