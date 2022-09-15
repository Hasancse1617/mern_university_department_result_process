const Subject = require("../models/Subject");
const Mark = require("../models/Mark");
const mongoose = require("mongoose");

module.exports.resultSubjects = async(req,res)=>{
    const exam_id = req.params.exam_id;
    try {
        const response = await Subject.find({exam_id}).sort({subject_code:"ascending"});
        return res.status(200).json({ response });
    } catch (error) {
        return res.status(500).json({errors: [{msg: error.message}]});
    }
}

module.exports.resultSingleSubject = async(req, res) =>{
    const exam_id = req.params.exam_id;
    const subject_id = req.params.subject_id;
    const response = await Mark.aggregate([ 
        {$match:{exam_id: new mongoose.Types.ObjectId(exam_id)}},
        {
            $lookup: {
                from:"students",
                as:"student",
                let:{studentId:"$marks.student_id"},
                pipeline:[
                    {
                        $match:{
                            $expr:{$and: [
                                {$in: ["$_id", "$$studentId"]}
                            ]}
                        }
                    },
                    { $sort: { "roll": 1 } },
                    { $project : { _id:1, name:1, roll:1,session:1 } }
                ]
            }
        },
        {$project: {
            "exam_id":1,
            "student":1,
            marks: {
                $filter: {
                    input: "$marks",
                    as: "mark",
                    cond: { $eq: [ "$$mark.subject_id", new mongoose.Types.ObjectId(subject_id) ] }
                }
            }
        }}
    ]);
    const third_mark_need_check = await Mark.findOne({exam_id, marks:{$elemMatch: {subject_id, final_mark:"0"}}});
    
    const errors = [];
    if(!(response[0]?.marks[0]?.final_mark >= 0)){
        errors.push({msg: "First or Second Examinar Entry not Exists!!!"})
    }else if(third_mark_need_check){
        errors.push({msg: "Third Examinar Needed!!!"})
    }
    if(errors.length !== 0){
        return res.status(400).json({errors});
    }else{
        try {
            return res.status(200).json({ response: response[0] });
        } catch (error) {
            return res.status(500).json({errors: [{msg: error.message}]});
        }
    }
    
}
//very needed query
module.exports.examResults = async(req,res) =>{
    const exam_id = req.params.exam_id;
    const errors = [];
    const check_entry_zero_mark = await Mark.find({exam_id, marks:{$elemMatch: { final_mark:"0" }}});
    // console.log(check_entry_zero_mark)
    if(check_entry_zero_mark.length !== 0){
        errors.push({msg: "All Subject Entry not Exists!!!"})
    }
    if(errors.length !== 0){
        return res.status(400).json({errors});
    }else{
        try {
            const response = await Mark.aggregate([ 
                {$match:{exam_id: new mongoose.Types.ObjectId(exam_id)}},    
                {$unwind: "$marks"},
                { "$lookup": {
                    "from": "students",
                    "localField": "marks.student_id",
                    "foreignField": "_id",
                    "as": "student"
                 }},
                 { "$lookup": {
                    "from": "subjects",
                    "localField": "marks.subject_id",
                    "foreignField": "_id",
                    "as": "subject"
                 }},
                 { $sort: { "subject.subject_code": 1 } },
                 {$group: {
                    _id:"$marks.student_id", roll:{ $push:"$student.roll" }, records: { $push: "$$ROOT" }
                 }},
                 { $sort: { "roll": 1 } },
            ]);
            // console.log("Hasan",response)
            return res.status(200).json({ response });
        } catch (error) {
            return res.status(500).json({errors: [{msg: error.message}]});
        }
    }  
}