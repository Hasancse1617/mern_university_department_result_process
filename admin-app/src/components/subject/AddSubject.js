import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { createAction } from "../../store/actions/SubjectAction";
import { REMOVE_SUBJECT_ERRORS, REMOVE_SUBJECT_MESSAGE } from "../../store/types/SubjectType";

const AddSubject = () => {
    const dispatch = useDispatch();
    const { exam } = useSelector((state)=>state.ExamReducer);
    const { subjectErrors, message } = useSelector((state)=> state.SubjectReducer);
    const [state,setState] = useState({
        subject_name:"",
        subject_code:"",
        roll:"",
        reg:"",
        session:""
    });
    const handleInput = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }
    const createSubject = (e) =>{
        e.preventDefault();
        const {name,roll,reg,session} = state;
        const formData = new FormData();
        formData.append('dept_id',exam.dept_id._id);
        formData.append('name',name);
        formData.append('roll',roll);
        formData.append('reg', reg);
        formData.append('session', session);
        dispatch(createAction(formData));
    }
    useEffect(()=>{
        if(message){
            toast.success(message, { duration: 3000 });
            dispatch({type: REMOVE_SUBJECT_MESSAGE});
            setState({name:"", roll:"", reg:"", session:""});
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
                        <label for="exampleInputName" className="col-sm-2  col-form-label">Subject Name</label>
                        <div className="col-sm-8">
                           <input type="text" name="subject_name" value={state.subject_name} onChange={handleInput} class="form-control" id="exampleInputName" placeholder="Enter Subject Name"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Subject Code</label>
                        <div className="col-sm-8">
                           <input type="text" name="subject_code" value={state.subject_code} onChange={handleInput} class="form-control" id="exampleInputEmail1" placeholder="Enter Subject Code"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Subject Number</label>
                        <div className="col-sm-8">
                           <input type="text" name="subject_total" value={state.subject_total} onChange={handleInput} class="form-control" id="exampleInputEmail1" placeholder="Enter Subject Total"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Subject Credit</label>
                        <div className="col-sm-8">
                           <input type="text" name="subject_credit" value={state.subject_credit} onChange={handleInput} class="form-control" id="exampleInputEmail1" placeholder="Enter Subject Credit"/>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInput" className="col-sm-2  col-form-label">First Examinar</label>
                        <div className="col-sm-8">
                          <select value={state.first_examinar} class="form-control" name="first_examinar" onChange={handleInput}>
                              <option value="">Select Examinar</option>
                              <option value="2016-17">2016-17</option>
                          </select>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInput" className="col-sm-2  col-form-label">Second Examinar</label>
                        <div className="col-sm-8">
                          <select value={state.first_examinar} class="form-control" name="first_examinar" onChange={handleInput}>
                              <option value="">Select Examinar</option>
                              <option value="2016-17">2016-17</option>
                          </select>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInput" className="col-sm-2  col-form-label">Third Examinar</label>
                        <div className="col-sm-8">
                          <select value={state.first_examinar} class="form-control" name="first_examinar" onChange={handleInput}>
                              <option value="">Select Examinar</option>
                              <option value="2016-17">2016-17</option>
                          </select>
                        </div> 
                    </div>
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
        </>
    );
}

export default AddSubject;