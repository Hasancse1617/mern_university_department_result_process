import React, { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import Loader from "../loader/Loader";
import { getGradeSingleSubject } from "./QueryGPA";
import { fetchExamSubjects, fetchSingleSubjectResult } from "../../store/actions/ResultAction";
import { REMOVE_RESULT_ERRORS, REMOVE_RESULT_SINGLE } from "../../store/types/ResultType";

const ViewSingleMark = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { loading, resultErrors, resultSingle, resultSubjects } = useSelector((state)=> state.ResultReducer);
  const { exam } = useSelector((state)=>state.ExamReducer);
  const [subject, setSubject] = useState("");
  const [subjectCode, setSubjectCode] = useState("");

  const handleSubject = (e)=>{
    setSubjectCode(e.target.options[e.target.selectedIndex].getAttribute('subject_code'));
    setSearchParams({subject_id: e.target.value, subject_code: e.target.options[e.target.selectedIndex].getAttribute('subject_code')});
    setSubject(e.target.value); 
    dispatch({type: REMOVE_RESULT_SINGLE});
    dispatch(fetchSingleSubjectResult(exam._id, e.target.value));
 }
  
  useEffect(()=>{
    if(resultErrors && resultErrors.length > 0){
        resultErrors.map((error)=>{
            toast.error(error.msg);
        });
        dispatch({type: REMOVE_RESULT_ERRORS});
    }
},[resultErrors]);

useEffect(()=>{
    dispatch(fetchExamSubjects(exam._id));
    setSubject(searchParams.get("subject_id"));
    setSubjectCode(searchParams.get("subject_code"));
    if(searchParams.get("subject_id")&& exam._id){
        dispatch(fetchSingleSubjectResult(exam._id, searchParams.get("subject_id")));
    }
    return()=>{
        dispatch({type: REMOVE_RESULT_SINGLE});
    }  
  },[]);
  console.log(resultSingle)
    return (
        <>
        <Helmet>
            <title>Students | Result Processing</title>
            <meta name="description" content="Students | Result Processing" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={false}/>
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h4 className="float-left">Subject Code: <b>{subjectCode}</b></h4>
                  </div>
                  
                  <div class="card-body">
                  <form role="form">
                        <div class="form-group row">
                            <div className="col-sm-3">
                            <select value={subject} class="form-control" name="subject" onChange={handleSubject}>
                                <option value="" subject_code="">Select Subject</option>
                                {resultSubjects? resultSubjects.map((subject)=>(
                                    <option value={subject._id} subject_code={subject.subject_code}>{subject.subject_code}</option>
                                )):""}
                            </select>
                            </div> 
                        </div>
                    </form>
                    <table id="example2" class="table table-bordered table-hover">
                      <thead>
                      <tr>
                        <th>SL.</th>
                        <th>Student Name</th>
                        <th>Roll Number</th>
                        <th>First Mark</th>
                        <th>Second Mark</th>
                        <th>Third Mark</th>
                        <th>Final Mark</th>
                        <th>Grade</th>
                      </tr>
                      </thead>
                      <tbody>
                    {
                      !loading?
                      resultSingle && Object.keys(resultSingle).length > 0 ?
                      resultSingle.student.map((student, index)=>(
                        <tr key={student._id}>
                          <td>{ index+1}</td>
                          <td>{ student.name }</td>
                          <td>{ student.roll }</td>
                          <td>{ resultSingle.marks[index].first_mark } </td>
                          <td>{ resultSingle.marks[index].second_mark } </td>
                          <td>{ resultSingle.marks[index].third_mark } </td>
                          <td>{ resultSingle.marks[index].final_mark } </td>
                          <td>{ getGradeSingleSubject(resultSingle.marks[index].final_mark) }</td>
                        </tr>
                        ))
                        :'No Results found'
                      :(<Loader/>)
                    }
                      </tbody>
                    </table>
                    
                  </div>
                </div>
                </div>
              </div>
            </div>
        </section>
        </>
    );
}

export default ViewSingleMark;