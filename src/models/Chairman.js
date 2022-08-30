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
    type:{
        type: String,
        required: true
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