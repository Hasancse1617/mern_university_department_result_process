import React from "react";
import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from 'react-redux';
import { LoginChairman } from  "../../store/actions/ChairmanAction";
import toast, { Toaster } from 'react-hot-toast';
import { REMOVE_CHAIRMAN_ERRORS } from '../../store/types/ChairmanType';
import { NavLink } from 'react-router-dom';

const TeacherLogin = () => {
    const dispatch = useDispatch();
    const {loading, chairmanErrors} = useSelector((state)=>state.ChairmanReducer);
    const [state, setState] = useState({
        exam_id: '',
        email:"",
        password: '',
        remember_me: false,
    });
    const handleInputs = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    const handleCheck = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.checked,
        })
    }
    const chairmanLogin = (e) =>{
        e.preventDefault();
        dispatch(LoginChairman(state));
        console.log(state);
    }
    useEffect(()=>{
        if(chairmanErrors.length > 0){
            chairmanErrors.map((error)=>{
                toast.error(error.msg);
            });
          dispatch({type: REMOVE_CHAIRMAN_ERRORS});
        }
    }, [chairmanErrors]);

    return (
        <>
        <Toaster position="top-right" reverseOrder={true}/>
        <div className="login-box">
            <Helmet>
                <title>Teacher Login - Reasult Processing</title>
                <meta name="description" content="User Login Here" />
            </Helmet>
            <div class="login-logo">
                <NavLink to="/admin"><img src="http://localhost:5000/images/logo2.png" width="20%"/></NavLink><br/>
                <b>Teacher Panel</b>
            </div>
            <div class="card">
                <div class="card-body login-card-body">
                <p class="login-box-msg"><h5>You can only login to add exam number as a Examiner</h5></p>
                
                <form onSubmit={chairmanLogin}>
                    <div class="input-group mb-3">
                    <input type="text" name="exam_id" class="form-control" value={state.exam_id} onChange={handleInputs} placeholder="Exam ID"/>
                    <div class="input-group-append">
                        <div class="input-group-text">
                        <span class="fas fa-envelope"></span>
                        </div>
                    </div>
                    </div>
                    <div class="input-group mb-3">
                    <input type="email" name="email" class="form-control" value={state.email} onChange={handleInputs} placeholder="Your Email"/>
                    <div class="input-group-append">
                        <div class="input-group-text">
                        <span class="fas fa-envelope"></span>
                        </div>
                    </div>
                    </div>
                    <div class="input-group mb-3">
                    <input type="password" name="password" class="form-control" value={state.password} onChange={handleInputs} placeholder="Your Password"/>
                    <div class="input-group-append">
                        <div class="input-group-text">
                        <span class="fas fa-lock"></span>
                        </div>
                    </div>
                    </div>
                    <div class="row">

                    {/* <!-- /.col --> */}
                    <div class="col-4">
                        <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                    </div>
                    {/* <!-- /.col --> */}

                    </div>
                    
                </form>
                <br></br>
                <p class="mb-1">
                    <NavLink to="/teacher/forgot-password">Forgotten password?</NavLink>
                    <NavLink style={{float: "right"}} to="/teacher/register">SignUp</NavLink>
                </p>
                </div>
                {/* <!-- /.login-card-body --> */}
            </div>
        </div>
        </>
    );
}

export default TeacherLogin;