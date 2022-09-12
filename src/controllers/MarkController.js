const Subject = require('../models/Subject');
const Student = require('../models/Student');
const Mark = require('../models/Mark');
const formidable = require('formidable');
const mongoose = require("mongoose");

// Teacher Section 
module.exports.markStudents = async(req, res) =>{
    const dept_id = req.params.dept_id;
    const session = req.params.session;
    const subject_id = req.params.subject_id;
    const teacher_id = req.params.teacher_id;
    const examinar_type = req.params.examinar_type;
    const exam_id = req.params.exam_id;
  
    const check_entry = await Mark.aggregate([ 
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
        }},
        
    ]);
// console.log(check_entry[0])
    if(session !="" && subject_id !="" && teacher_id !=""){
        const errors = [];  
        if(examinar_type === "first_examinar"){
            const first_examinar = await Subject.findOne({ _id: subject_id, first_examinar:teacher_id });
            if(!first_examinar){
                errors.push({msg: 'You are not First examinar for this subject'});
            }else if(check_entry && check_entry[0]?.marks[0]?.first_mark){
                errors.push({msg: "Your entry already exists. You will can only update!"})
            }
        }
        if(examinar_type === "second_examinar"){
            const second_examinar = await Subject.findOne({ _id: subject_id, second_examinar:teacher_id });
            if(!second_examinar){
                errors.push({msg: 'You are not Second examinar for this subject'});
            }else if(check_entry[0]?.marks?.length > 0 && check_entry[0]?.marks[0]?.second_mark){
                errors.push({msg: "Your entry already exists. You will can only update!"})
            }
            else if(!check_entry[0]?.marks[0]?.first_mark){
                errors.push({msg: "You will can mark entry after first examinar!"})
            }
        }
        if(examinar_type === "third_examinar"){
            const third_examinar = await Subject.findOne({ _id: subject_id, third_examinar:teacher_id });
            if(!third_examinar){
                errors.push({msg: 'You are not Third examinar for this subject'});
            }else if(check_entry[0]?.marks[0]?.third_mark_entry){
                errors.push({msg: "Your entry already exists. You will can only update!"})
            }else if(!check_entry[0]?.marks[0]?.second_mark){
                errors.push({msg: "You will can mark entry after Second examinar If needed!"})
            }
        }
            
        if(errors.length !== 0){
            return res.status(400).json({errors});
        }else{
            try {
                if(examinar_type === "third_examinar"){
                    return res.status(200).json({ response:[], check_entry:check_entry[0] });  
                }
                const response = await Student.find({dept_id, session}).sort({roll:'ascending'});
                return res.status(200).json({ response, check_entry:{} });
            } catch (error) {
                return res.status(500).json({errors: [{msg: error.message}]});
            }
        }
    }
}
module.exports.markEditStudents = async(req,res)=>{
    const dept_id = req.params.dept_id;
    const session = req.params.session;
    const subject_id = req.params.subject_id;
    const teacher_id = req.params.teacher_id;
    const examinar_type = req.params.examinar_type;
    const exam_id = req.params.exam_id;
}
//Teacher Section
module.exports.markSubjects = async(req, res) =>{
    const exam_model_id = req.params.exam_id;
    if(exam_model_id != ""){
        try {
            const response = await Subject.find({exam_id: exam_model_id}).select({_id:1,subject_code:1}).sort({subject_code:'ascending'});
            return res.status(200).json({ response });
        } catch (error) {
            return res.status(500).json({errors: [{msg: error.message}]});
        }
    }
}

module.exports.markAdd = async(req,res) =>{
    const form = formidable();
    form.parse(req, async(err, fields, files) =>{
        const {state: {exam_id,session,semister}, marKArr, examinarType} = fields;
        const errors = [];

        if(errors.length !== 0){
            return res.status(400).json({errors});
        }else{
            if(examinarType == "first_examinar"){
                try {
                    const check_exam_id = await Mark.findOne({exam_id});
                    if(check_exam_id){
                        for (let i = 0; i < marKArr.length; i++) {
                            await Mark.updateOne({exam_id},{
                                $push:{marks:{
                                    student_id: marKArr[i].student_id,
                                    subject_id: marKArr[i].subject_id,
                                    first_mark: marKArr[i].mark
                                }}
                            })
                        }
                    }else{
                        const response = new Mark();
                        response.exam_id = exam_id;
                        response.session = session;
                        response.semister = semister;
                        for (let i = 0; i < marKArr.length; i++) {
                            response.marks[i] = {
                                student_id: marKArr[i].student_id,
                                subject_id: marKArr[i].subject_id,
                                first_mark: marKArr[i].mark
                            }
                        }
                        await response.save();
                    }
                    
                    return res.status(200).json({msg: 'Mard added successfully'});
                } catch (error) {
                    return res.status(500).json({errors: [{msg: error.message}]});
                }
            }
            else if(examinarType == "second_examinar"){
                const check_first_entry = await Mark.aggregate([ 
                    {$match:{exam_id: new mongoose.Types.ObjectId(exam_id)}},
                    {$project: {
                        "exam_id":1,
                        marks: {
                            $filter: {
                                input: "$marks",
                                as: "mark",
                                cond: { $eq: [ "$$mark.subject_id", new mongoose.Types.ObjectId(marKArr[0].subject_id) ] }
                            }
                        }
                    }}
                ]);
                // console.log(check_first_entry[0].marks);
                try {
                    for (let i = 0; i < marKArr.length; i++) {
                       
                        if(check_first_entry[0].marks[i].student_id == marKArr[i].student_id){
                            let third_mark_status = false;
                            let final_mark = 0;
                            const percent_f = (check_first_entry[0].marks[i].first_mark * 100)/100;
                            const percent_s = (marKArr[i].mark * 100)/100;
                            if(percent_f - percent_s > 20 || percent_s - percent_f > 20){
                                third_mark_status = true;
                                final_mark = 0;
                            }else{
                                final_mark = Math.round((percent_f+percent_s)/2);
                                third_mark_status = false;
                            }
                            await Mark.updateOne({exam_id},
                                {$set:{'marks.$[elem].second_mark':marKArr[i].mark, 'marks.$[elem].third_mark_status':third_mark_status, 'marks.$[elem].final_mark':final_mark}},
                                {arrayFilters: [{'elem.subject_id':marKArr[i].subject_id,'elem.student_id':marKArr[i].student_id}]})
                           
                                // console.log("Matching",percent_f ,percent_s,final_mark,third_mark_status)
                        }
                     }

                    return res.status(200).json({msg: 'Mard added successfully'});
                } catch (error) {
                    return res.status(500).json({errors: [{msg: error.message}]});
                }
            }
            else if(examinarType === "third_examinar"){
                const check_entry = await Mark.aggregate([ 
                    {$match:{exam_id: new mongoose.Types.ObjectId(exam_id)}},
                    {$project: {
                        "exam_id":1,
                        marks: {
                            $filter: {
                                input: "$marks",
                                as: "mark",
                                cond: { $eq: [ "$$mark.subject_id", new mongoose.Types.ObjectId(marKArr[0].subject_id) ] }
                            }
                        }
                    }}
                ]);
            //    console.log("Hasan",check_entry[0].marks)
               try {
                    for (let i = 0; i < marKArr.length; i++) {
                    
                        if(check_entry[0].marks[i].student_id == marKArr[i].student_id){
                            let third_mark_status = false;
                            let final_mark = 0;
                            const dif_f = Math.abs(check_entry[0].marks[i].first_mark - marKArr[i].mark);
                            const dif_s = Math.abs(check_entry[0].marks[i].second_mark - marKArr[i].mark);
                            
                            if(dif_f > dif_s){
                                final_mark = Math.round((parseInt(check_entry[0].marks[i].second_mark) + parseInt(marKArr[i].mark)) / 2);
                            }
                            else if(dif_f < dif_s){
                                final_mark = Math.round((parseInt(check_entry[0].marks[i].first_mark) + parseInt(marKArr[i].mark)) / 2);
                            }
                            else if(dif_f == dif_s && check_entry[0].marks[i].first_mark >= check_entry[0].marks[i].second_mark){
                                final_mark = Math.round((parseInt(check_entry[0].marks[i].first_mark) + parseInt(marKArr[i].mark)) / 2);
                            }else{
                                final_mark = Math.round((parseInt(check_entry[0].marks[i].second_mark) +parseInt(marKArr[i].mark)) / 2);
                            }
                            // console.log(check_entry[0].marks[i].first_mark,check_entry[0].marks[i].second_mark,marKArr[i].mark, dif_f, dif_s, final_mark)
                            await Mark.updateOne({exam_id},
                                {$set:{'marks.$[elem].third_mark':marKArr[i].mark, 'marks.$[elem].final_mark':final_mark}},
                                {arrayFilters: [{'elem.subject_id':marKArr[i].subject_id,'elem.student_id':marKArr[i].student_id}]})
                        
                            //  console.log("Matching",dif_f ,dif_s,final_mark,third_mark_status)
                        }
                    }
                    await Mark.updateMany({exam_id},
                        {$set:{'marks.$[elem].third_mark_entry': true}},
                        {arrayFilters: [{'elem.subject_id':marKArr[0].subject_id }]})

                    return res.status(200).json({msg: 'Mard added successfully'});
                } catch (error) {
                    return res.status(500).json({errors: [{msg: error.message}]});
                }
            }
        }
    })
}