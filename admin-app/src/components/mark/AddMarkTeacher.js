import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, {Toaster} from "react-hot-toast";
import Loader from "../loader/Loader";
import { NavLink, useSearchParams } from "react-router-dom";
import { fetchMarkSubjects, fetchMarkStudents, addedMarkAction } from "../../store/actions/MarkAction";
import { REMOVE_MARK_ERRORS, REMOVE_MARK_MESSAGE, REMOVE_MARK_STUDENTS } from "../../store/types/MarkType";

const AddMarkTeacher = () =>{
    const dispatch = useDispatch();
    const marKArr = [];
    let i = -1;
    const [searchParams, setSearchParams] = useSearchParams();
    const {teacher} = useSelector((state)=>state.TeacherReducer);
    const { loading, message, markSubjects, markErrors, markStudents, markF_S_Students} = useSelector((state)=>state.MarkReducer);
    const [subject, setSubject] = useState("");
    const [examinarType, setExaminarType] = useState("");
    const [state, setState] = useState({
        exam_id:teacher.exam._id,
        session: teacher.exam.session,
        semister: teacher.exam.semister,
    });
    const handleInputs = (e,index,student_id,subject_id) =>{
        if(examinarType=="third_examinar"){index = e.target.getAttribute("index")}
       
        marKArr[index] = {
            student_id,
            subject_id,
            mark: e.target.value
        }
    }
    const handleSave = (e) =>{
        e.preventDefault();
        //Start Validate
        const collection = document.getElementsByClassName("checkValidity");
        let validAll = false;
        for (let i = 0; i < collection.length; i++) {
            validAll = true;
            if (!collection[i].value && !collection[i].value >= 1 && !collection[i].value <= 100) {
                alert("Every Field is required.");
                return false;
            }
        } //End Validate
        const markdetails = {state, marKArr, examinarType}
        if(validAll){
            dispatch(addedMarkAction(markdetails));
        } 
    }
    const handleSubject = (e)=>{
        setSubject(e.target.value); 
        dispatch({type: REMOVE_MARK_STUDENTS});
    }
    const handleType = (e) =>{
        setExaminarType(e.target.value);
        dispatch({type: REMOVE_MARK_STUDENTS});
    }
    const handleSearch = (e) =>{
        e.preventDefault();
        dispatch({type: REMOVE_MARK_STUDENTS});
        if(subject && examinarType){
            setSearchParams({subject_id: subject, examinar_type: examinarType});
            dispatch(fetchMarkStudents(teacher.dept_id._id, teacher.exam.session, subject, teacher._id, examinarType, teacher.exam._id));
        }
    }
    useEffect(()=>{
        if(markErrors && markErrors.length > 0){
            markErrors.map((error)=>{
                toast.error(error.msg);
            });
            dispatch({type: REMOVE_MARK_ERRORS});
        }
        if(message){
            toast.success(message);
            dispatch({type: REMOVE_MARK_MESSAGE});
            dispatch({type: REMOVE_MARK_STUDENTS});
        }
    },[markErrors, message]);
    useEffect(()=>{
        dispatch(fetchMarkSubjects(teacher.exam._id,"theory"));
        setSubject(searchParams.get("subject_id"));
        setExaminarType(searchParams.get("examinar_type"));
        if(searchParams.get("subject_id")&& teacher._id){
            dispatch(fetchMarkStudents(teacher.dept_id._id, teacher.exam.session, searchParams.get("subject_id"), teacher._id, searchParams.get("examinar_type"), teacher.exam._id));
        }
        //Clear students after clicking another page
        return () =>{
            dispatch({type: REMOVE_MARK_STUDENTS});
        }
    },[]);

    return(
        <section class="content">
           <div class="container-fluid">
            <div class="row">
                <Toaster position="top-right" reverseOrder={true}/>
            <div class="col-12">
                <div class="card">
                <div class="card-header">
                    <h4 className="float-left">Add Marks</h4>
                    <h3><NavLink exact to="/teacher/edit-mark"><button type="button" class="btn btn-primary float-right text-bold">Edit Marks</button></NavLink></h3>
                </div>
                
                <div class="card-body">
                    <form role="form" onSubmit={handleSearch}>
                        <div class="form-group row">
                            <div className="col-sm-3">
                            <select value={subject} class="form-control" name="subject" onChange={handleSubject}>
                                <option value="">Select Subject</option>
                                {markSubjects? markSubjects.map((subject)=>(
                                    <option value={subject._id}>{subject.subject_code}</option>
                                )):""}
                            </select>
                            </div>
                            <div className="col-sm-3">
                            <select value={examinarType} class="form-control" name="examinarType" onChange={handleType}>
                                <option value="">Select Examinar Type</option>
                                <option value="first_examinar">First Examinar</option>
                                <option value="second_examinar">Second Examinar</option>
                                <option value="third_examinar">Third Examinar</option>
                            </select>
                            </div>
                            <h3><button type="submit" class="btn btn-primary float-right text-bold">Search</button></h3>  
                        </div>
                    </form>
                    <form onSubmit={handleSave} >
                    <table id="example2" class="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th>SL.</th>
                        <th>Student Name</th>
                        <th>Roll Number</th>
                        <th>Session</th>
                        <th>Semister</th>
                        {Object.keys(markF_S_Students).length != 0?<th>Is 3rd Examinar needed?</th>:""}
                        <th>Add Mark</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                    !loading?
                    markStudents && markStudents.length > 0?
                    markStudents.map((student, index)=>(
                        <tr key={student._id}>
                            <td>{ index+1}</td>
                            <td>{ student.name }</td>
                            <td>{ student.roll }</td>
                            <td>{ student.session }</td>
                            <td>{ teacher.exam.semister+"th" }</td>
                            <td><input className="checkValidity" type="number" min={30} max={100} onChange={(e)=>handleInputs(e,index,student._id,subject)} required/></td>
                        </tr>
                     )):
                     markF_S_Students && Object.keys(markF_S_Students).length != 0?
                     
                     markF_S_Students.student.map((student, index )=>{
                       if(markF_S_Students.marks[index].third_mark_status== true){
                          i = i+1 
                       }
                        return(
                        <tr key={student._id}>
                            <td>{ index+1}</td>
                            <td>{ student.name }</td>
                            <td>{ student.roll }</td>
                            <td>{ student.session }</td>
                            <td>{ teacher.exam.semister+"th" }</td>
                            <td>{ markF_S_Students.marks[index].third_mark_status== true?"Yes":"No" }</td>
                            <td>
                                {markF_S_Students.marks[index].third_mark_status== true?
                                   <input className="checkValidity" type="number" min={30} max={100} index={i} onChange={(e)=>handleInputs(e, i ,student._id,subject)} required/>
                                :"No Need"}
                               </td>
                                
                        </tr>
                     )})
                     :'No Students found'
                     :<Loader/>}
                    </tbody>
                    </table><br/>
                    {markStudents.length > 0? <h3><button type="submit" class="btn btn-primary float-right text-bold">Add Mark</button></h3>:""}
                    {Object.keys(markF_S_Students).length != 0? <h3><button type="submit" class="btn btn-primary float-right text-bold">Add Mark</button></h3>:""}
                </form>

                </div>
                </div>
            </div>
           </div>
        </div>
     </section>
    )
}
export default AddMarkTeacher;