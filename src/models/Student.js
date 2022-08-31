const { model, Schema } = require("mongoose");

const studentSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    roll:{
        type: String,
        required: true
    },
    reg:{
        type: String,
        required: true
    },
    session:{
        type: String,
        required: true
    }
}, {timestamps: true}); 

module.exports = model("student", studentSchema);