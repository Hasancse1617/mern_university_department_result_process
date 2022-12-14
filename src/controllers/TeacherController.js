const formidable = require("formidable");
const Teacher = require("../models/Teacher");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Exam = require("../models/Exam");
require('dotenv').config();
const jwt_decode = require('jwt-decode');
const { send_Account_Verify_Email, Send_Reset_Password_Email } = require("../utils/email");

const createToken = (teacher, expiresToken)=>{
    return jwt.sign({teacher}, process.env.SECRET, {
        expiresIn: expiresToken
    });
}
module.exports.createTeacher = async (req,res)=>{
    const form = formidable({ multiples: true });
    form.parse(req, async(err, fields, files) =>{

        const {dept_id,name, email, password, c_password} = fields;
        const errors = [];

        if(dept_id === ''){
            errors.push({msg: 'Dept Name is required'});
        }
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
        const checkTeacher = await Teacher.findOne({email});
        if(checkTeacher){
            errors.push({msg:'Email is already exists'});
        }
        if(errors.length !== 0){
            return res.status(400).json({errors});
        }
        else{
            // Hash Paaword
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            try {
                send_Account_Verify_Email(email, "teacher");//Send Email
                const response = await Teacher.create({
                    dept_id,
                    name,
                    email,
                    password: hash,
                    email_verified: false
                });
                
                return res.status(200).json({msg: 'Created successfully. Please cheek your Email to verify your account!', response});
            } catch (error) {
                return res.status(500).json({errors: [{msg: error.message}]});
            }
        }
    });
}

module.exports.verifyTeacher = async(req,res) =>{
    const token = req.params.token;
    const {email} = jwt_decode(token);
    const errors = [];
    try {
        const decodeToken = jwt_decode(token);
        const expiresIn = new Date(decodeToken.exp * 1000);
        if (new Date() > expiresIn) {
            errors.push({msg: 'Your token is expired. Try again!'});
        }
    } catch (error) {
        errors.push({msg: 'Your token is not valid'});
    }
    const checkTeacher = await Teacher.findOne({email});
    if(!checkTeacher){
        errors.push({msg:'Email not found'});
    }
    if(errors.length !== 0){
        return res.status(400).json({errors});
    }else{
        try {
            const response = await Teacher.findOneAndUpdate({email},{email_verified: true});
            return res.status(200).json({msg: 'Email verified successfully. Please Login'});
        } catch (error) {
            return res.status(500).json({errors: [{msg: error.message}]});
        }
    }
}

module.exports.loginTeacher = async(req,res) =>{
    const form = formidable();
    form.parse(req, async(err,fields,files)=>{
        const { exam_id, email, password } = fields;
        const check_exam = await Exam.findOne({exam_id, status: true}).select({_id:1,semister:1,session:1,exam_id:1});     
        const errors = [];
        if(!check_exam){
            errors.push({msg: 'Exam ID is not found'});
        }
        if(email === ''){
            errors.push({msg: 'Email is required'});
        }
        if(password === ''){
            errors.push({msg: 'Password is required'});
        }
        if(errors.length !== 0){
            return res.status(400).json({errors});
        }
        try{
            const teacherDetail = await Teacher.findOne({email}).populate('dept_id','short_name');
            // add exam id in teacher object
            if(teacherDetail){
                if(!teacherDetail.email_verified){
                    send_Account_Verify_Email(email);
                    return res.status(500).json({errors: [{msg: 'Account not verified. Check Email & verify account'}]});
                }
                if(!teacherDetail.status){
                    return res.status(500).json({errors: [{msg: 'Account not verified from Dept Chairman!'}]});
                }
                const matched = await bcrypt.compare(password, teacherDetail.password);
                if(matched){
                    const teacher = {
                        ...teacherDetail._doc,
                        exam:check_exam
                    }
                    const token = createToken(teacher,"1h");
                    return res.status(200).json({'msg':'You have successfully login',token});
                }else{
                    return res.status(401).json({errors:[{msg:'Username or Password does not matched'}]});
                }
            }
            else{
                return res.status(404).json({errors:[{msg:'Email not found'}]});
            }
        }catch(error){
            return res.status(500).json({errors: [{msg: error.message}]});
        }
    });
}

module.exports.forgotPassword = async(req, res) =>{
    const form = formidable();
    form.parse(req, async(err,fields,files)=>{
        const { email } = fields;
        const teacher = await Teacher.findOne({email});
        const errors = [];
        if(email === ''){
            errors.push({msg: 'Email is required'});
        }else{
            const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //Email validation
            if(!filter.test(email)){
                errors.push({msg: 'Valid email is required'});
            }else{
                if(!teacher){
                    errors.push({msg: 'Email not fount'});
                }
            }
        }
        if(errors.length !== 0){
            return res.status(400).json({errors});
        }else{
            try {
                
                const response = Send_Reset_Password_Email(email, "teacher");
                console.log("Hasan")
                return res.status(200).json({msg: 'Check your email & change your password',response});
            } catch (error) {
                return res.status(500).json({errors: error, msg: error.message});
            }
        }
    });
}

module.exports.resetPassword = async(req, res) =>{
    const form = formidable();
    form.parse(req, async(err,fields,files)=>{
        const token = req.params.token;
        const { password, c_password } = fields;
        const errors = [];
        if(password === ''){
            errors.push({msg: 'Password is required'});
        }else{
            if(password.length < 5){
                errors.push({msg: 'Password must be 6 characters long'});
            }
            else if(password !== c_password){
                errors.push({msg: 'Password & Confirm Password does not  match'});
            }
        }
        if(c_password === ''){
            errors.push({msg: 'Confirm Password is required'});
        }
        try {
            const decodeToken = jwt_decode(token);
            const expiresIn = new Date(decodeToken.exp * 1000);
            if (new Date() > expiresIn) {
                errors.push({msg: 'Your token is expired. Try again!'});
            }
        } catch (error) {
            errors.push({msg: 'Your token is not valid'});
        }
    
        if(errors.length !== 0){
            return res.status(400).json({errors});
        }else{
            const {email} = jwt_decode(token);
            try {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt);
                const response = await Teacher.findOneAndUpdate({email},{password: hash}, {new: true});
                return res.status(200).json({msg: 'Your Password updated successfully', response });
            } catch (error) {
                return res.status(500).json({errors: error.message});
            }
        } 
    });
}