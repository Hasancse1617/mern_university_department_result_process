import React from "react";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../store/actions/ExamAction';
import { REMOVE_EXAM_ERRORS, REMOVE_EXAM_MESSAGE } from '../../store/types/ExamType';
import { Helmet } from "react-helmet";
import toast, { Toaster } from 'react-hot-toast';

const ExamResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, examErrors,message} = useSelector((state)=>state.ExamReducer);
    const [state, setState] = useState({
        password:'',
        c_password:'',
    });
    const handleInput = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(resetPassword(state,token));
    }
    useEffect(()=>{
        if(examErrors && examErrors.length > 0){
            examErrors.map((error)=>{
                toast.error(error.msg);
            });
            dispatch({type: REMOVE_EXAM_ERRORS});
        }
    }, [examErrors]);
    useEffect(()=>{
        if(message){
            toast.success(message, { duration: 5000 });
            dispatch({type: REMOVE_EXAM_MESSAGE});
            setTimeout(()=>{ navigate("/exam/login") },100);
        }
      },[message]);
    return (
        <>
        <Toaster position="top-right" reverseOrder={false}/>
        <div class="login-box">
        <Helmet>
            <title>Exam reset password</title>
            <meta name="description" content="User Login Here" />
        </Helmet>
            <div class="login-logo">
                <NavLink to="/admin"><img src="http://localhost:5000/images/logo2.png" width="20%"/></NavLink><br/>
                <b>Reset Password</b>
            </div>
            {/* <!-- /.login-logo --> */}
            <div class="card">
                <div class="card-body login-card-body">
                <p class="login-box-msg">You are only one step a way from your new password, recover your password now.</p>

                <form onSubmit={handleSubmit} method="post">
                    <div class="input-group mb-3">
                    <input type="password" name="password" value={state.password} onChange={handleInput} class="form-control" placeholder="Password"/>
                    <div class="input-group-append">
                        <div class="input-group-text">
                        <span class="fas fa-lock"></span>
                        </div>
                    </div>
                    </div>
                    <div class="input-group mb-3">
                    <input type="password" name="c_password" value={state.c_password} onChange={handleInput} class="form-control" placeholder="Confirm Password"/>
                    <div class="input-group-append">
                        <div class="input-group-text">
                        <span class="fas fa-lock"></span>
                        </div>
                    </div>
                    </div>
                    <div class="row">
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary btn-block">Change password</button>
                    </div>
                    {/* <!-- /.col --> */}
                    </div>
                </form>

                <p class="mt-3 mb-1">
                    Already have an account? Please <NavLink to="admin/login">Login !!!</NavLink>
                </p>
                </div>
                {/* <!-- /.login-card-body --> */}
            </div>
            </div>
        </>
    );
}

export default ExamResetPassword;