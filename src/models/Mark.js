const { model, Schema } = require("mongoose");

const markSchema = new Schema({
    exam_id:{
        type: Schema.Types.ObjectId,
        ref: 'exam'
    },
    session:{
        type: String,
        required: true
    },
    semister:{
        type: String,
        required: true
    },
    marks:[
        {
            student_id:{
                type: Schema.Types.ObjectId,
                ref: 'student'
            },
            subject_id:{
                type: Schema.Types.ObjectId,
                ref: 'subject'
            },
            first_mark:{
                type: String,
                required: true
            },
            second_mark:{
                type: String,
            },
            third_mark_status:{
                type: Boolean,
                default: false
            },
            third_mark_entry:{
                type: Boolean,
                default: false
            },
            third_mark:{
                type: String,
            },
            final_mark:{
                type: String
            }
        }
    ]
}, {timestamps: true}); 

module.exports = model("mark", markSchema);