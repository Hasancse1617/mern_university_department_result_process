import React from "react";
import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from 'react-redux';
import { RegisterExam } from  "../../store/actions/ExamAction";
import toast, { Toaster } from 'react-hot-toast';
import { REMOVE_EXAM_ERRORS, REMOVE_EXAM_MESSAGE } from '../../store/types/ExamType';
import { NavLink, useNavigate } from 'react-router-dom';

const ExamRegister = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading, message, examErrors} = useSelector((state)=>state.ExamReducer);
    const [state, setState] = useState({
        name: "",
        email: "",
        exam_id: "",
        session: "",
        semister: "",
        password: "",
        c_password: ""
    });
    const handleInputs = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    const examSignUp = (e) =>{
        e.preventDefault();
        dispatch(RegisterExam(state));
    }
    useEffect(()=>{
        if(message){
            toast.success(message, { duration: 5000 });
            dispatch({type: REMOVE_EXAM_MESSAGE});
            setTimeout(()=>{
                navigate("/exam/login");
            },100);
        }
        if(examErrors.length > 0){
            examErrors.map((error)=>{
                toast.error(error.msg);
            });
          dispatch({type: REMOVE_EXAM_ERRORS});
        }
    }, [examErrors, message]);

    return (
        <>
        <Toaster position="top-right" reverseOrder={true}/>
        <div className="login-box">
            <Helmet>
                <title>Exam registration</title>
                <meta name="description" content="Exam registration Here" />
            </Helmet>
            <div class="login-logo">
                <NavLink to="/admin"><img src="http://localhost:5000/images/logo2.png" width="20%"/></NavLink><br/>
                <b>Exam Panel</b>
            </div>
            <div class="card">
                <div class="card-body login-card-body">
                <p class="login-box-msg"><h5>SignUp as a Exam Chairman</h5></p>
                
                <form onSubmit={examSignUp} enctype="multipart/form-data">
                   <div class="input-group mb-3">
                    <input type="text" name="name" class="form-control" value={state.name} onChange={handleInputs} placeholder="Enater Your Name"/>
                        <div class="input-group-append">
                            <div class="input-group-text">
                            <span class="fas fa-user"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                    <input type="email" name="email" class="form-control" value={state.email} onChange={handleInputs} placeholder="Enter Your Email"/>
                        <div class="input-group-append">
                            <div class="input-group-text">
                            <span class="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <select value={state.session} class="form-control" name="session" onChange={handleInputs}>
                            <option value="">Select Exam Session</option>
                            <option value="2016-17">2016-17</option>
                            <option value="2017-18">2017-18</option>
                            <option value="2018-19">2018-19</option>
                            <option value="2019-20">2019-20</option>
                            <option value="2020-21">2020-21</option>
                        </select>
                        <div class="input-group-append">
                            <div class="input-group-text">
                            <span class="fas fa-id-card"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                        <select value={state.semister} class="form-control" name="semister" onChange={handleInputs}>
                            <option value="">Select Exam Semister</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            <option value="4">Four</option>
                            <option value="5">Five</option>
                            <option value="6">Six</option>
                            <option value="7">Seven</option>
                            <option value="8">Eight</option>
                        </select>
                        <div class="input-group-append">
                            <div class="input-group-text">
                            <span class="fas fa-id-card"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                    <input type="text" name="exam_id" class="form-control" value={state.exam_id} onChange={handleInputs} placeholder="Exam ID"/>
                        <div class="input-group-append">
                            <div class="input-group-text">
                            <span class="fas fa-id-card"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                    <input type="password" name="password" class="form-control" value={state.password} onChange={handleInputs} placeholder="Exam Password"/>
                        <div class="input-group-append">
                            <div class="input-group-text">
                            <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                    <input type="password" name="c_password" class="form-control" value={state.c_password} onChange={handleInputs} placeholder="Exam Confirm Password"/>
                        <div class="input-group-append">
                            <div class="input-group-text">
                            <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                    {/* <!-- /.col --> */}
                    <div class="col-4">
                        <button type="submit" class="btn btn-primary btn-block">SignUp</button>
                    </div>
                    {/* <!-- /.col --> */}

                    </div>
                    
                </form>
                <br></br>
                <p class="mt-3 mb-1">
                    Already have an account? Please <NavLink to="/exam/login">Login !!!</NavLink>
                </p>
                </div>
                {/* <!-- /.login-card-body --> */}
            </div>
        </div>
        </>
    );
}

export default ExamRegister;