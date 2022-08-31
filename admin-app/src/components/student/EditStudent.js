import React from "react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { updateAction, fetchStudent } from "../../store/actions/StudentAction";
import { REMOVE_SINGLE_STUDENT, REMOVE_STUDENT_ERRORS, REMOVE_STUDENT_MESSAGE } from "../../store/types/StudentType";
import Loader from "../loader/Loader";


const EditStudent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { loading, studentErrors, student, message, status } = useSelector((state)=> state.StudentReducer);
    const [state,setState] = useState({
        name:"",
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
    const updateStudent = (e) =>{
        e.preventDefault();
        const {name,roll,reg,session} = state;
        const formData = new FormData();
        formData.append('name',name);
        formData.append('roll',roll);
        formData.append('reg', reg);
        formData.append('session', session);
        dispatch(updateAction(formData,id));
    }

    useEffect(()=>{
        if(message){
            dispatch({type: REMOVE_SINGLE_STUDENT});
            toast.success(message, { duration: 3000 });
            dispatch({type: REMOVE_STUDENT_MESSAGE});
            navigate('/chairman/add-student');
        }
        if(studentErrors && studentErrors.length > 0){
            studentErrors.map((error)=>{
                toast.error(error.msg);
            });
            dispatch({type: REMOVE_STUDENT_ERRORS});
        }
    },[studentErrors,message]);
    useEffect(()=>{
        dispatch(fetchStudent(id));
    },[]);
    useEffect(()=>{
        if(status){
           setState({
               name: student.name,
               roll: student.roll,
               reg: student.reg,
               session: student.session
           });
        }
        dispatch(fetchStudent(id));
    },[status]);

    return (
        <>
        <Helmet>
            <title>Edit student - result processing</title>
            <meta name="description" content="User add Here" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={false}/>
        <section class="content">
        <div class="container-fluid">
            <div class="row">
            <div class="col-12">
                <div class="card">
                <div class="card-header">
                    <h4 className="float-left">Edit Student</h4>
                    <h3><NavLink exact to="/admin/student/all?page=1" className="btn btn-sm btn-success float-right text-bold">All Student</NavLink></h3>
                </div>
                {!loading?<form role="form" onSubmit={updateStudent}>
                    <div class="card-body">
                        <div class="form-group row">
                            <label for="exampleInputName" className="col-sm-2  col-form-label">Student Name</label>
                            <div className="col-sm-8">
                            <input type="text" name="name" value={state.name} onChange={handleInput} class="form-control" id="exampleInputName" placeholder="Enter Student Name"/>
                            </div> 
                        </div>
                        <div class="form-group row">
                            <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Student Roll</label>
                            <div className="col-sm-8">
                            <input type="text" name="roll" value={state.roll} onChange={handleInput} class="form-control" id="exampleInputEmail1" placeholder="Enter Student Roll" readOnly/>
                            </div> 
                        </div>
                        <div class="form-group row">
                            <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Student Reg</label>
                            <div className="col-sm-8">
                            <input type="text" name="reg" value={state.reg} onChange={handleInput} class="form-control" id="exampleInputEmail1" placeholder="Enter Student Reg" readOnly/>
                            </div> 
                        </div>
                        <div class="form-group row">
                            <label for="exampleInput" className="col-sm-2  col-form-label">Session</label>
                            <div className="col-sm-8">
                            <select value={state.session} class="form-control" name="session" onChange={handleInput}>
                                <option value="">Select Session</option>
                                <option value="2016-17">2016-17</option>
                                <option value="2017-18">2017-18</option>
                                <option value="2018-19">2018-19</option>
                                <option value="2019-20">2019-20</option>
                                <option value="2020-21">2020-21</option>
                            </select>
                            </div> 
                        </div>
                        <div class="form-group col-6 offset-sm-2">
                            <button type="submit" class="btn btn-primary">Submit</button>
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

export default EditStudent;