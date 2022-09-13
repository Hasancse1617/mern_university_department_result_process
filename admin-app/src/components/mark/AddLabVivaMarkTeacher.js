import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, {Toaster} from "react-hot-toast";
import Loader from "../loader/Loader";
import { NavLink, useSearchParams } from "react-router-dom";
import { fetchMarkSubjects, fetchLabVivaMarkStudents, addedMarkLabVivaAction } from "../../store/actions/MarkAction";
import { REMOVE_MARK_ERRORS, REMOVE_MARK_LAB_VIVA_STUDENTS, REMOVE_MARK_MESSAGE } from "../../store/types/MarkType";

const AddLabVivaMarkTeacher = () =>{
    const dispatch = useDispatch();
    const marKArr = [];
    const [searchParams, setSearchParams] = useSearchParams();
    const { teacher } = useSelector((state)=>state.TeacherReducer);
    const { loading, message, markSubjects, markErrors, markLabVivaStudents} = useSelector((state)=>state.MarkReducer);
    const [subject, setSubject] = useState("");
    const [subjectMark, setSubjectMark] = useState(0);
    const [state, setState] = useState({
        exam_id:teacher.exam._id,
        session: teacher.exam.session,
        semister: teacher.exam.semister,
    });
    const handleInputs = (e,index,student_id,subject_id) =>{
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
        const markdetails = {state, marKArr}
        if(validAll){
            dispatch(addedMarkLabVivaAction(markdetails));
        } 
    }
    const handleSubject = (e)=>{
        setSubjectMark(e.target.options[e.target.selectedIndex].getAttribute('subject_mark'));
        setSearchParams({subject_id: e.target.value, subject_mark: e.target.options[e.target.selectedIndex].getAttribute('subject_mark')});
        setSubject(e.target.value); 
        dispatch({type: REMOVE_MARK_LAB_VIVA_STUDENTS});
        dispatch(fetchLabVivaMarkStudents(teacher.dept_id._id, teacher.exam.session, e.target.value, teacher._id, teacher.exam._id));
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
            dispatch({type: REMOVE_MARK_LAB_VIVA_STUDENTS});
        }
    },[markErrors, message]);
    useEffect(()=>{
        dispatch(fetchMarkSubjects(teacher.exam._id, "lab_viva"));
        setSubject(searchParams.get("subject_id"));
        setSubjectMark(searchParams.get("subject_mark"));
        if(searchParams.get("subject_id")&& teacher._id){
            dispatch(fetchLabVivaMarkStudents(teacher.dept_id._id, teacher.exam.session, searchParams.get("subject_id"), teacher._id, teacher.exam._id));
        }
        //Clear students after clicking another page
        return () =>{
            dispatch({type: REMOVE_MARK_LAB_VIVA_STUDENTS});
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
                    <h4 className="float-left">Add Lab / Viva Marks</h4>
                    <h3><NavLink exact to="/teacher/edit-lab-viva-mark"><button type="button" class="btn btn-primary float-right text-bold">Edit Marks</button></NavLink></h3>
                </div>
                
                <div class="card-body">
                    <form role="form">
                        <div class="form-group row">
                            <div className="col-sm-3">
                            <select value={subject} class="form-control" name="subject" onChange={handleSubject}>
                                <option value="">Select Subject</option>
                                {markSubjects? markSubjects.map((subject)=>(
                                    <option value={subject._id} subject_mark={subject.subject_mark}>{subject.subject_code}</option>
                                )):""}
                            </select>
                            </div> 
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
                        <th>Add Mark</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                    !loading?
                    markLabVivaStudents && markLabVivaStudents.length > 0?
                    markLabVivaStudents.map((student, index)=>(
                        <tr key={student._id}>
                            <td>{ index+1}</td>
                            <td>{ student.name }</td>
                            <td>{ student.roll }</td>
                            <td>{ student.session }</td>
                            <td>{ teacher.exam.semister+"th" }</td>
                            <td><input className="checkValidity" type="number" min={30} max={subjectMark} onChange={(e)=>handleInputs(e,index,student._id,subject)} required/></td>
                        </tr>
                     ))
                     :'No Students found'
                     :<Loader/>}
                    </tbody>
                    </table><br/>
                    {markLabVivaStudents.length > 0? <h3><button type="submit" class="btn btn-primary float-right text-bold">Add Mark</button></h3>:""}
                </form>

                </div>
                </div>
            </div>
           </div>
        </div>
     </section>
    )
}
export default AddLabVivaMarkTeacher;