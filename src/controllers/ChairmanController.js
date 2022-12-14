const formidable = require("formidable");
const Chairman = require("../models/Chairman");
const Dept = require("../models/Dept");
const Exam = require("../models/Exam");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwt_decode = require('jwt-decode');
const { send_Account_Verify_Email, Send_Reset_Password_Email } = require("../utils/email");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");

const createToken = (chairman, expiresToken)=>{
    return jwt.sign({chairman}, process.env.SECRET, {
        expiresIn: expiresToken
    });
}
module.exports.createChairman = async (req,res)=>{
    const form = formidable({ multiples: true });
    form.parse(req, async(err, fields, files) =>{
        // await Dept.create({dept_name: "Biomedical Engineering", short_name: "BME"});
        const {dept_id, name, email, password, c_password} = fields;
        const errors = [];

        if(dept_id === ''){
            errors.push({msg: 'Dept name is required'});
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
        const checkEmail = await Chairman.findOne({ email });
        if(checkEmail){
            errors.push({msg:'Email already exists!!!'});
        }else{
            if(dept_id){
                const checkDept = await Chairman.findOne({ dept_id, status: true });
                if(checkDept){
                    errors.push({msg:'Departmental Chairman is already active. You can register after the chairman resign!!!'});
                }
            }
        }
        if(errors.length !== 0){
            return res.status(400).json({errors});
        }
        else{
            // Hash Paaword
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            try {
                send_Account_Verify_Email(email, "chairman");//Send Email
                const response = await Chairman.create({
                    dept_id,
                    name,
                    email,
                    password: hash,
                    email_verified: false,
                });
                
                return res.status(200).json({msg: 'Created successfully. Please cheek your Email to verify your account!', response});
            } catch (error) {
                return res.status(500).json({errors: [{msg: error.message}]});
            }
        }
    });
}

module.exports.verifyChairman = async(req,res) =>{
    const token = req.params.token;
    const {email} = jwt_decode(token);
    const errors = [];
    try {
        const decodeToken = jwt_decode(token);
        const expiresIn = new Date(decodeToken.exp * 1000);
        if (new Date() > expiresIn) {
            errors.push({msg: 'Your token is expired'});
        }
    } catch (error) {
        errors.push({msg: 'Your token is not valid'});
    }
    const checkChairman = await Chairman.findOne({email});
    if(!checkChairman){
        errors.push({msg:'Email not found'});
    }
    if(errors.length !== 0){
        return res.status(400).json({errors});
    }else{
        try {
            const response = await Chairman.findOneAndUpdate({email},{email_verified: true, status: true});
            return res.status(200).json({msg: 'Email verified successfully. Please Login'});
        } catch (error) {
            return res.status(500).json({errors: [{msg: error.message}]});
        }
    }
}

module.exports.loginChairman = async(req,res) =>{
    const form = formidable();
    form.parse(req, async(err,fields,files)=>{
        const { dept_id, email, password, remember_me } = fields;
        const errors = [];
        if(dept_id === ''){
            errors.push({msg: 'Dept name is required'});
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
        let expiresToken = '1d';
        if(remember_me){
            expiresToken = '7d';
        }
        try{
            const chairman = await Chairman.findOne({dept_id, email}).populate('dept_id','short_name');
            if(chairman){
                if(!chairman.email_verified){
                    send_Account_Verify_Email(email, "chairman");
                    return res.status(500).json({errors: [{msg: 'Account not verified. Check Email & verify account'}]});
                }
                else if(!chairman.status){
                    return res.status(500).json({errors: [{msg: 'You are not present Chairman'}]});
                }

                const matched = await bcrypt.compare(password, chairman.password);
                if(matched){
                    try {
                        const token = createToken(chairman,expiresToken);
                        return res.status(200).json({'msg':'You have successfully login',token});
                    } catch (error) {
                        return res.status(500).json({errors: [{msg: error.message}]});
                    }
                }else{
                    return res.status(401).json({errors:[{msg:'Password does not matched'}]});
                }
            }
            else{
                return res.status(404).json({errors:[{msg:'Dept or Email not found'}]});
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
        const chairman = await Chairman.findOne({email});
        const errors = [];
        if(email === ''){
            errors.push({msg: 'Email is required'});
        }else{
            const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //Email validation
            if(!filter.test(email)){
                errors.push({msg: 'Valid email is required'});
            }else{
                if(!chairman){
                    errors.push({msg: 'Email not fount'});
                }
            }
        }
        if(errors.length !== 0){
            return res.status(400).json({errors});
        }else{
            try {
                const response = Send_Reset_Password_Email(email, "chairman");
                return res.status(200).json({msg: 'Check your email & change your password',response});
            } catch (error) {
                return res.status(500).json({errors: [{msg: error.message}]});
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
                const response = await Chairman.findOneAndUpdate({email},{password: hash}, {new: true});
                return res.status(200).json({msg: 'Your Password updated successfully', response });
            } catch (error) {
                return res.status(500).json({errors: [{msg: error.message}]});
            }
        } 
    });
}

module.exports.fetchDashInfo = async(req,res) =>{
    const dept_id = req.params.dept_id;
    try {
        const total_teacher = await Teacher.find({dept_id}).countDocuments();
        const total_exam = await Exam.find({dept_id}).countDocuments();
        const total_student = await Student.find({dept_id}).countDocuments();
        const response = {
            total_teacher,
            total_exam,
            total_student
        }
        return res.status(200).json({ response });
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.resignChairman = async (req,res)=>{
    const id = req.params.id;
    try{
        const chairman = await Chairman.findByIdAndUpdate({_id: id}, { status: false });
        return res.status(200).json({msg: 'Chairman resigned successfully! Now new Charman Can Register'});
    }catch(error){
        return res.status(500).json({errors:error});
    } 
}