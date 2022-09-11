const Subject = require('../models/Subject');
const Student = require('../models/Student');
const Mark = require('../models/Mark');
const formidable = require('formidable');

// Teacher Section 
module.exports.markStudents = async(req, res) =>{
    const session = req.params.session;
    const subject_id = req.params.subject_id;
    const teacher_id = req.params.teacher_id;
    const examinar_type = req.params.examinar_type;
    const exam_id = req.params.exam_id;
    // try {
        // const check_entry = await Mark.aggregate([ 
        //     {$project: {
        //         marks: {
        //            $filter: {
        //               input: "$marks",
        //               as: "mark",
        //               cond: { $eq: [ "$$mark.subject_id", ObjectId(subject_id) ] }
        //            }
        //         }
        //      }}
        // ]);
        const check_entry = await Mark.aggregate([ 
            {$match:{session: "2016-17"}}
        ]);
        console.log(check_entry,exam_id);
    // } catch (error) {
        
    // }
    


    // if(session !="" && subject_id !="" && teacher_id !=""){
    //     const errors = [];  
    //     if(examinar_type === "first_examinar"){
    //         const first_examinar = await Subject.findOne({ _id: subject_id, first_examinar:teacher_id });
    //         if(!first_examinar){
    //             errors.push({msg: 'You are not First examinar for this subject'});
    //         }else if(check_entry && check_entry[0]?.marks[0]?.first_mark){
    //             errors.push({msg: "Your entry already exists. You will can only update!"})
    //         }
    //     }
    //     if(examinar_type === "second_examinar"){
    //         const second_examinar = await Subject.findOne({ _id: subject_id, second_examinar:teacher_id });
    //         if(!second_examinar){
    //             errors.push({msg: 'You are not Second examinar for this subject'});
    //         }else if(check_entry.length > 0 && check_entry[0].marks[0].second_mark){
    //             errors.push({msg: "Your entry already exists. You will can only update!"})
    //         }
    //         else if(check_entry.length == 0 && !check_entry[0]?.marks[0]?.first_mark){
    //             errors.push({msg: "You will can mark entry after first examinar!"})
    //         }
    //     }
    //     if(examinar_type === "third_examinar"){
    //         const third_examinar = await Subject.findOne({ _id: subject_id, third_examinar:teacher_id });
    //         if(!third_examinar){
    //             errors.push({msg: 'You are not Third examinar for this subject'});
    //         }else if(check_entry && check_entry[0]?.marks[0]?.third_mark){
    //             errors.push({msg: "Your entry already exists. You will can only update!"})
    //         }else if(check_entry && !check_entry[0]?.marks[0]?.second_mark){
    //             errors.push({msg: "You will can mark entry after Second examinar If needed!"})
    //         }
    //     }
            
    //     if(errors.length !== 0){
    //         return res.status(400).json({errors});
    //     }else{
    //         try {
    //             const response = await Student.find({session}).sort({roll:'ascending'});
    //             return res.status(200).json({ response });
    //         } catch (error) {
    //             return res.status(500).json({errors: [{msg: error.message}]});
    //         }
    //     }
    // }
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
                try {
                    for (let i = 0; i < marKArr.length; i++) {
                       await Mark.updateOne({exam_id},
                        {$set:{'marks.$[elem].second_mark':marKArr[i].mark}},
                        {arrayFilters: [{'elem.subject_id':marKArr[i].subject_id,'elem.student_id':marKArr[i].student_id}]})
                    }

                    return res.status(200).json({msg: 'Mard added successfully'});
                } catch (error) {
                    return res.status(500).json({errors: [{msg: error.message}]});
                }
            }
        }
    })
}