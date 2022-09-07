import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { createAction, recentSubjects, subjectTeachers } from "../../store/actions/SubjectAction";
import { REMOVE_SUBJECT_ERRORS, REMOVE_SUBJECT_MESSAGE } from "../../store/types/SubjectType";

const AddSubject = () => {
    const dispatch = useDispatch();
    const { exam } = useSelector((state)=>state.ExamReducer);
    const { subjectErrors, message } = useSelector((state)=> state.SubjectReducer);
    const [state,setState] = useState({
        exam_id: exam._id,
        subject_code:"",
        subject_mark:"",
        subject_credit:"",
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
        dispatch(recentSubjects());
        dispatch(subjectTeachers());
    },[]);
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
                        <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Subject Code</label>
                        <div className="col-sm-8">
                           <input type="text" name="subject_code" value={state.subject_code} onChange={handleInput} class="form-control" id="exampleInputEmail1" placeholder="Enter Subject Code eg: CSE-402"/>
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
                              <option value="2016-17">2016-17</option>
                          </select>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInput" className="col-sm-2  col-form-label">2nd Examinar</label>
                        <div className="col-sm-8">
                          <select value={state.second_examinar} class="form-control" name="first_examinar" onChange={handleInput}>
                              <option value="">Select Examinar</option>
                              <option value="2016-17">2016-17</option>
                          </select>
                        </div> 
                    </div>
                    <div class="form-group row">
                        <label for="exampleInput" className="col-sm-2  col-form-label">3rd Examinar</label>
                        <div className="col-sm-8">
                          <select value={state.third_examinar} class="form-control" name="first_examinar" onChange={handleInput}>
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
                        <th>1st Examinar</th>
                        <th>2nd Examinar</th>
                        <th>3rd Examinar</th>
                        <th>Action</th>
                      </tr>
                      </thead>
                      <tbody>
                     {/* {
                      !loading?
                      recentSubjects.length > 0 ?
                      recentSubjects.map((subject, index)=>(
                          <tr key={subject._id}>
                          <td>{ index+1}</td>
                          <td>{ subject.code }</td>
                          <td>{ subject.roll }</td>
                          <td>{ subject.reg }</td>
                          <td>{ subject.session }</td>
                          <td>
                            <NavLink exact to={`/exam/edit-subject/${subject._id}`} ><button className="text-success" ><i className="fas fa-edit"></i></button></NavLink>&nbsp;
                            <button onClick={() => deleteSubject(subject._id)} className="text-danger"><i className="fas fa-trash"></i></button>&nbsp;
                          </td>
                        </tr>
                        ))
                        :'No resent subjects found'
                      :(<Loader/>)
                      }  */}
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