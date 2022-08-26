const formidable = require("formidable");
const Chairman = require("../models/Chairman");
const sharp = require('sharp');
const bcrypt = require('bcrypt');

module.exports.createChairman = async (req,res)=>{
    const form = formidable({ multiples: true });
    form.parse(req, async(err, fields, files) =>{

        const {name, email, password, c_password} = fields;
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
        if(Object.keys(files).length !== 0){
            const { type } = files.image;
            const split = type.split('/');
            const extension = split[1].toLowerCase();
            if(extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png'){
                errors.push({msg: `${extension} is not a valid extension`});
            }else{
                files.image.name = uuidv4() + '.' +extension;
            }
        }
        const checkUser = await Chairman.findOne({email});
        if(checkUser){
            errors.push({msg:'Email is already exists'});
        }
        if(errors.length !== 0){
            return res.status(400).json({errors});
        }
        else{

            // Hash Paaword
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            if(Object.keys(files).length !== 0){
                const imagePath = `public/images/chairman_images/${files.image.name}`;
                sharp(files.image.path).resize(298, 298).toFile(imagePath, async(error, sharp)=>{
                    if(!error){
                        try {
                            const response = await Chairman.create({
                                name,
                                email,
                                image: files.image.name,
                                password: hash,
                                status: false
                            });
    
                            return res.status(200).json({msg: 'Created successfully. Please active your email !', response});
                        } catch (error) {
                            return res.status(500).json({errors: [{msg: error.message}]});
                        }
                    }
                });
            }
            else{
                console.log("KKKKKK")
                try {
                    const response = await Chairman.create({
                        name,
                        email,
                        password: hash,
                        status: false
                    });

                    return res.status(200).json({msg: 'Chairman created successfully. Please active your email !', response});
                } catch (error) {
                    return res.status(500).json({errors: [{msg: error.message}]});
                }
            }
        }
    });
}