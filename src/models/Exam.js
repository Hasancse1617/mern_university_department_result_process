const { model, Schema } = require("mongoose");

const examSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    type:{
        type: String,
        required: true
    },
    session:{
        type: String,
        required: true
    },
    semister:{
        type: String,
        required: true
    },
    exam_id:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    status:{
        type: Boolean,
        default: false
    }
}, {timestamps: true}); 

module.exports = model("exam", examSchema);