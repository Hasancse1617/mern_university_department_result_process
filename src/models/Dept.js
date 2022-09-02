const { model, Schema } = require("mongoose");

const deptSchema = new Schema({
    dept_name:{
        type: String,
        required: true,
        unique: true
    },
    short_name:{
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true}); 

module.exports = model("dept", deptSchema);