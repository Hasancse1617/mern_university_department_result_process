const { model, Schema } = require("mongoose");

const chairmanSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: false,
        default:'profile.png'
    },
    password:{
        type: String,
        required: true
    },
    email_verified:{
        type: Boolean,
        default: false
    },
    status:{
        type: Boolean,
        default: false
    }
}, {timestamps: true}); 

module.exports = model("chairman", chairmanSchema);