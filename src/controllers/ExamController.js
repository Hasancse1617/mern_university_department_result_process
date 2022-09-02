const Exam = require("../models/Exam");
const formidable = require("formidable");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwt_decode = require('jwt-decode');
const { Send_Reset_Password_Email } = require("../utils/email");

const createToken = (exam, expiresToken)=>{
    return jwt.sign({exam}, process.env.SECRET, {
        expiresIn: expiresToken
    });
}

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

module.exports.loginExam = async(req,res) =>{
    const form = formidable();
    form.parse(req, async(err,fields,files)=>{
        const { exam_id, password, remember_me } = fields;
        const errors = [];
        if(exam_id === ''){
            errors.push({msg: 'Exam ID is required'});
        }
        if(password === ''){
            errors.push({msg: 'Password is required'});
        }
        if(errors.length !== 0){
            return res.status(400).json({errors});
        }
        let expiresToken = '1d';
        if(remember_me){
            expiresToken = '7d';
        }
        try{
            const exam = await Exam.findOne({exam_id});
            if(exam){
                if(!exam.status){
                    return res.status(500).json({errors: [{msg: 'Account not verified from Dept Chairman!'}]});
                }

                const matched = await bcrypt.compare(password, exam.password);
                if(matched){
                    const token = createToken(exam,expiresToken);
                    return res.status(200).json({'msg':'You have successfully login',token});
                }else{
                    return res.status(401).json({errors:[{msg:'Exam ID or Password does not matched'}]});
                }
            }
            else{
                return res.status(404).json({errors:[{msg:'Exam ID not found'}]});
            }
        }catch(error){
            return res.status(500).json({errors: [{msg: error.message}]});
        }
    });
}

module.exports.forgotPassword = async(req, res) =>{
    const form = formidable();
    form.parse(req, async(err,fields,files)=>{
        const { exam_id, email } = fields;
        const exam = await Exam.findOne({exam_id, email});
        const errors = [];
        if(exam_id === ''){
            errors.push({msg: 'Exam ID is required'});
        }
        else if(email === ''){
            errors.push({msg: 'Email is required'});
        }
        else if(!exam){
            errors.push({msg: 'Exam ID or Email not fount'});
        }
        if(errors.length !== 0){
            return res.status(400).json({errors});
        }else{
            try {
                const response = Send_Reset_Password_Email(email, "exam");
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
                errors.push({msg: 'Your token is expired'});
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
                const response = await Exam.findOneAndUpdate({email},{password: hash}, {new: true});
                return res.status(200).json({msg: 'Your Password updated successfully', response });
            } catch (error) {
                return res.status(500).json({errors: error.message});
            }
        } 
    });
}