import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loader from "../loader/Loader";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { createAction, recentAddedSubjects, deptTeachers } from "../../store/actions/SubjectAction";
import { REMOVE_SUBJECT_ERRORS, REMOVE_SUBJECT_MESSAGE } from "../../store/types/SubjectType";

const AddSubject = () => {
    const dispatch = useDispatch();
    const { exam } = useSelector((state)=>state.ExamReducer);
    const { loading, subjectErrors, message, subjectTeachers, recentSubjects } = useSelector((state)=> state.SubjectReducer);
    const [state,setState] = useState({
        exam_id: exam._id,
        subject_code:"",
        subject_mark:"",
        subject_credit:"",
        subject_type:"theory",
        first_examinar:"",
        second_examinar:"",
        third_examinar:""
    });

    const handleInput = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }
    const createSubject = (e) =>{
        e.preventDefault();
        dispatch(createAction(state));
    }
    useEffect(()=>{
        dispatch(deptTeachers(exam.dept_id._id));
        dispatch(recentAddedSubjects(exam._id));
    },[]);
    useEffect(()=>{
        if(message){
            toast.success(message, { duration: 3000 });
            dispatch({type: REMOVE_SUBJECT_MESSAGE});
            setState({...state, subject_code:"", subject_mark:"", subject_credit:"", first_examinar:"",second_examinar:"",third_examinar:""});
            dispatch(recentAddedSubjects(exam._id));
        }
        if(subjectErrors && subjectErrors.length > 0){
            subjectErrors.map((error)=>{
                toast.error(error.msg);
            });
            dispatch({type: REMOVE_SUBJECT_ERRORS});
        }
    },[subjectErrors, message]);

    return (
        <>
        <Helmet>
            <title>Create subject | result processing</title>
            <meta name="description" content="Subject add Here" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={true}/>
        <section class="content">
        <div class="container-fluid">
            <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card-header">
                    <h4 className="float-left">Add Subject</h4>
                    <h3><NavLink to="/exam/subjects" className="btn btn-sm btn-success float-right text-bold">All Subject</NavLink></h3>
                </div>
                <form role="form" onSubmit={createSubject}>
                    <div class="card-body">
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Subject Code</label>
                        <div className="col-sm-8">
                           <input type="text" name="subject_code" value={state.subject_code} onChange={handleInput} class="form-control" id="exampleInputEmail1" placeholder="Eg: CSE-401, ACCE-401"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Subject Mark</label>
                        <div className="col-sm-8">
                           <input type="text" name="subject_mark" value={state.subject_mark} onChange={handleInput} class="form-control" id="exampleInputEmail1" placeholder="Subject Mark Eg: 100"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Subject Credit</label>
                        <div className="col-sm-8">
                           <input type="text" name="subject_credit" value={state.subject_credit} onChange={handleInput} class="form-control" id="exampleInputEmail1" placeholder="Eg: 3.0, 3.5"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2 col-form-label">Subject Type</label>
                        <div className="col-sm-3">
                           <input type="radio" name="subject_type" value="theory" checked={state.subject_type=="theory"} onChange={handleInput} class="" id="exampleInputEmail1"/>
                           &nbsp;&nbsp;<label className="col-form-label">Theory</label>
                        </div>
                        <div className="col-sm-3">
                           <input type="radio" name="subject_type" value="lab_viva" checked={state.subject_type=="lab_viva"} onChange={handleInput}  id="exampleInputEmail1"/>
                           &nbsp;&nbsp;<label className="col-form-label">Lab or Viva</label>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="exampleInput" className="col-sm-2  col-form-label">1st Examinar</label>
                        <div className="col-sm-8">
                          <select value={state.first_examinar} class="form-control" name="first_examinar" onChange={handleInput}>
                              <option value="">Select Examinar</option>
                              {subjectTeachers?subjectTeachers.map((teacher)=>
                                 <option value={teacher._id}>{teacher.name}</option>
                              ):""}
                          </select>
                        </div> 
                    </div>
                    {state.subject_type == "theory"?<>
                    <div class="form-group row">
                        <label for="exampleInput" className="col-sm-2  col-form-label">2nd Examinar</label>
                        <div className="col-sm-8">
                          <select value={state.second_examinar} class="form-control" name="second_examinar" onChange={handleInput}>
                              <option value="">Select Examinar</option>
                              {subjectTeachers?subjectTeachers.map((teacher)=>
                                 <option value={teacher._id}>{teacher.name}</option>
                              ):""}
                          </select>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInput" className="col-sm-2  col-form-label">3rd Examinar</label>
                        <div className="col-sm-8">
                          <select value={state.third_examinar} class="form-control" name="third_examinar" onChange={handleInput}>
                              <option value="">Select Examinar</option>
                              {subjectTeachers?subjectTeachers.map((teacher)=>
                                 <option value={teacher._id}>{teacher.name}</option>
                              ):""}
                          </select>
                        </div> 
                    </div></>:""}
                    <div class="form-group col-6 offset-sm-2">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                    </div>
                </form>
                </div>
                </div>
            </div>
            </div>
        </section>
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h4 className="float-left">Recently added Subject</h4>
                  </div>
                  <div class="card-body">
                    <table id="example2" class="table table-bordered table-hover">
                      <thead>
                      <tr>
                        <th>SL.</th>
                        <th>Subject Code</th>
                        <th>Total Mark</th>
                        <th>Credit</th>
                        <th>Subject Type</th>
                        <th>1st Examinar</th>
                        <th>2nd Examinar</th>
                        <th>3rd Examinar</th>
                        <th>Action</th>
                      </tr>
                      </thead>
                      <tbody>
                      {
                      !loading?
                      recentSubjects.length > 0 ?
                      recentSubjects.map((subject, index)=>(
                          <tr key={subject._id}>
                          <td>{ index+1}</td>
                          <td>{ subject.subject_code }</td>
                          <td>{ subject.subject_mark }</td>
                          <td>{ subject.subject_credit }</td>
                          <td>{ subject.subject_type }</td>
                          <td>{ subject.first_examinar.name }</td>
                          <td>{ subject.second_examinar? subject.second_examinar.name :""}</td>
                          <td>{ subject.third_examinar? subject.third_examinar.name :""}</td>
                          <td>
                            <NavLink exact to={`/exam/edit-subject/${subject._id}`} ><button title="Edit" className="text-success" ><i className="fas fa-edit"></i></button></NavLink>&nbsp;
                          </td>
                        </tr>
                        ))
                        :'No resent subjects found'
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

export default AddSubject;