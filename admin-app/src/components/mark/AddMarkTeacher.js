import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, {Toaster} from "react-hot-toast";
import Loader from "../loader/Loader";
import { NavLink, useSearchParams } from "react-router-dom";
import { fetchMarkSubjects, fetchMarkStudents, addedMarkAction } from "../../store/actions/MarkAction";
import { REMOVE_MARK_ERRORS, REMOVE_MARK_STUDENTS } from "../../store/types/MarkType";

const AddMarkTeacher = () =>{
    const dispatch = useDispatch();
    const marKArr = [];
    const [searchParams, setSearchParams] = useSearchParams();
    const {teacher} = useSelector((state)=>state.TeacherReducer);
    const { loading, markSubjects, markErrors, markStudents} = useSelector((state)=>state.MarkReducer);
    const [subject, setSubject] = useState("");
    const [examinarType, setExaminarType] = useState("");
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
        const markdetails = {state, marKArr, examinarType}
        dispatch(addedMarkAction(markdetails));
    }
    const handleSelect = (e)=>{
        setSubject(e.target.value); 
    }
    const handleType = (e) =>{
        setExaminarType(e.target.value);
    }
    const handleSearch = (e) =>{
        e.preventDefault();
        dispatch({type: REMOVE_MARK_STUDENTS});
        if(subject && examinarType){
            setSearchParams({subject_id: subject, examinar_type: examinarType});
            dispatch(fetchMarkStudents(teacher.exam.session, subject, teacher._id, examinarType));
        }
    }
    useEffect(()=>{
        if(markErrors && markErrors.length > 0){
            markErrors.map((error)=>{
                toast.error(error.msg);
            });
            dispatch({type: REMOVE_MARK_ERRORS});
        }
    },[markErrors]);
    useEffect(()=>{
        setSubject(searchParams.get("subject_id"));
        setExaminarType(searchParams.get("examinar_type"));
        dispatch(fetchMarkSubjects(teacher.exam._id));
        if(searchParams.get("subject_id")&& teacher._id){
            dispatch(fetchMarkStudents(teacher.exam.session, searchParams.get("subject_id"), teacher._id, searchParams.get("examinar_type")));
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
                    <h4 className="float-left">Add students subject marks</h4>
                    <h3><NavLink exact to="/chairman/add-student"><button type="button" class="btn btn-primary float-right text-bold">Add Student</button></NavLink></h3>
                </div>
                
                <div class="card-body">
                    <form role="form" onSubmit={handleSearch}>
                        <div class="form-group row">
                            <div className="col-sm-3">
                            <select value={subject} class="form-control" name="subject" onChange={handleSelect}>
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
                    markStudents.length > 0 ?
                    markStudents.map((student, index)=>(
                        <tr key={student._id}>
                            <td>{ index+1}</td>
                            <td>{ student.name }</td>
                            <td>{ student.roll }</td>
                            <td>{ student.session }</td>
                            <td>{ teacher.exam.semister+"th" }</td>
                            <td><input type="number" min={30} max={100} onChange={(e)=>handleInputs(e,index,student._id,subject)}/></td>
                        </tr>
                        ))
                        :'No Students found'
                    :(<Loader/>)
                    }
                    </tbody>
                    </table><br/>
                    <h3><button onClick={handleSave} type="submit" class="btn btn-primary float-right text-bold">Add Mark</button></h3>
                </div>
                </div>
            </div>
        </div>
        </div>
        </section>
    )
}
export default AddMarkTeacher;