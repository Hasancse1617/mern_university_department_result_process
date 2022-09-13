const { model, Schema } = require("mongoose");

const subjectSchema = new Schema({
    exam_id:{
        type: Schema.Types.ObjectId,
        ref: 'exam'
    },
    subject_code:{
        type: String,
        required: true
    },
    subject_mark:{
        type: String,
        required: true
    },
    subject_credit:{
        type: String,
        required: true
    },
    subject_type:{
        type: String,
        required: true
    },
    first_examinar:{
        type: Schema.Types.ObjectId,
        ref: 'teacher'
    },
    second_examinar:{
        type: Schema.Types.ObjectId,
        ref: 'teacher'
    },
    third_examinar:{
        type: Schema.Types.ObjectId,
        ref: 'teacher'
    }
}, {timestamps: true}); 

module.exports = model("subject", subjectSchema);