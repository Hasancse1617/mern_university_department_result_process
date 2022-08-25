module.exports.createChairman = async (req,res)=>{
    const form = formidable({ multiples: true });
    form.parse(req, async(err, fields, files) =>{
        const {name, email, user_type, password, c_password} = fields;
        const errors = [];
        // console.log(files);
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
        if(user_type === ''){
            errors.push({msg: 'User Type is required'});
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
        if(Object.keys(files).length === 0){
            errors.push({msg:'Image is required'});
        }else{
            const { type } = files.image;
            const split = type.split('/');
            const extension = split[1].toLowerCase();
            if(extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png'){
                errors.push({msg: `${extension} is not a valid extension`});
            }else{
                files.image.name = uuidv4() + '.' +extension;
            }
        }
        const checkUser = await User.findOne({email});
        if(checkUser){
            errors.push({msg:'Email is already exists'});
        }
        if(errors.length !== 0){
            return res.status(400).json({errors});
        }
        else{
            // console.log(email)
            const newPath = `public/images/user_images/${files.image.name}`;
            fs.copyFile(files.image.path, newPath, async(error)=>{
                if(!error){
                    // Hash Paaword
                    const salt = await bcrypt.genSalt(10);
                    const hash = await bcrypt.hash(password, salt);
                    // console.log(hash)
                    try {
                        const response = await User.create({
                            name,
                            email,
                            user_type: user_type,
                            image: files.image.name,
                            password: hash,
                        });

                        return res.status(200).json({msg: 'User created successfully', response});
                    } catch (error) {
                        return res.status(500).json({errors: [{msg: error.message}]});
                    }
                }
            })
        }
    });
}