import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { forgotPassword } from '../../store/actions/ExamAction';
import { REMOVE_EXAM_ERRORS, REMOVE_EXAM_MESSAGE } from '../../store/types/ExamType';
import { Helmet } from "react-helmet";
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2'

const ExamForgotPassword = () => {
    const dispatch = useDispatch();
    const {loading, examErrors, message} = useSelector((state)=>state.ExamReducer);
    const [state, setState] = useState({
        exam_id:"",
        email:""
    });
    const handleInput = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(forgotPassword(state));
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
        }
    },[message]);
    return (
        <>
        <Toaster position="top-right" reverseOrder={false}/>
        <div class="login-box">
        <Helmet>
            <title>Exam forgot password - Result processing</title>
            <meta name="description" content="User Login Here" />
        </Helmet>
        <div class="login-logo">
            <NavLink to="/admin"><img src="http://localhost:5000/images/logo2.png" width="20%"/></NavLink><br/>
            <b>Exam Panel</b>
        </div>
        {/* <!-- /.login-logo --> */}
        <div class="card">
        <div class="card-body login-card-body">
        <p class="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>

        <form onSubmit={handleSubmit} method="post">
            <div class="input-group mb-3">
                <input type="text" name="exam_id" value={state.exam_id} onChange={handleInput} class="form-control" placeholder="Exam ID"/>
                <div class="input-group-append">
                    <div class="input-group-text">
                        <span class="fas fa-id-card"></span>
                    </div>
                </div>
            </div>
            <div class="input-group mb-3">
                <input type="email" name="email" value={state.email} onChange={handleInput} class="form-control" placeholder="Email"/>
                <div class="input-group-append">
                    <div class="input-group-text">
                        <span class="fas fa-envelope"></span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <button type="submit" class="btn btn-primary btn-block">Request new password</button>
                </div>
            </div>
        </form>

        <p class="mt-3 mb-1">
            Already have an account? Please <NavLink to="/exam/login">Login !!!</NavLink>
        </p>
        </div>
    </div>
    </div>
    </>
    );
}

export default ExamForgotPassword;