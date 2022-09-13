import React from "react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loader from "../loader/Loader";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { deptTeachers, fetchSubject, updateAction } from "../../store/actions/SubjectAction";
import { REMOVE_SINGLE_SUBJECT, REMOVE_SUBJECT_ERRORS, REMOVE_SUBJECT_MESSAGE } from "../../store/types/SubjectType";

const EditSubject = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const { exam } = useSelector((state)=>state.ExamReducer);
    const { loading, status, subjectErrors, message, subject, subjectTeachers } = useSelector((state)=> state.SubjectReducer);
    const [state,setState] = useState({
        subject_mark:"",
        subject_credit:"",
        subject_type:"",
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
    const updateSubject = (e) =>{
        e.preventDefault();
        dispatch(updateAction(state, id));
    }
    useEffect(()=>{
        dispatch(fetchSubject(id));
        dispatch(deptTeachers(exam.dept_id._id));
        return()=>{
            dispatch({type: REMOVE_SINGLE_SUBJECT});
        }
    },[]);
    useEffect(()=>{
        if(status){
           setState({
               subject_code: subject.subject_code,
               subject_mark: subject.subject_mark,
               subject_credit: subject.subject_credit,
               subject_type: subject.subject_type,
               first_examinar: subject.first_examinar,
               second_examinar: subject.second_examinar,
               third_examinar: subject.third_examinar
           });
        }
        dispatch(fetchSubject(id));
    },[status]);
    useEffect(()=>{
        if(message){
            toast.success(message, { duration: 3000 });
            dispatch({type: REMOVE_SUBJECT_MESSAGE});
            navigate('/exam/subjects');
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
                    <h4 className="float-left">Edit Subject</h4>
                    <h3><NavLink to="/exam/subjects" className="btn btn-sm btn-success float-right text-bold">All Subject</NavLink></h3>
                </div>
                {!loading?<form role="form" onSubmit={updateSubject}>
                    <div class="card-body">
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Subject Code</label>
                        <div className="col-sm-8">
                           <input type="text" name="subject_code" value={state.subject_code} class="form-control" id="exampleInputEmail1" placeholder="Enter Subject Code eg: CSE-402" readOnly/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Subject Mark</label>
                        <div className="col-sm-8">
                           <input type="text" name="subject_mark" value={state.subject_mark} onChange={handleInput} class="form-control" id="exampleInputEmail1" placeholder="Enter Total Subject Mark"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Subject Credit</label>
                        <div className="col-sm-8">
                           <input type="text" name="subject_credit" value={state.subject_credit} onChange={handleInput} class="form-control" id="exampleInputEmail1" placeholder="Enter Subject Credit"/>
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
                    {subject.subject_type == "theory"?<>
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
                        <button type="submit" class="btn btn-primary">Update</button>
                    </div>
                    </div>
                </form>:<Loader/>}
                </div>
                </div>
            </div>
            </div>
        </section>
        </>
    );
}

export default EditSubject;