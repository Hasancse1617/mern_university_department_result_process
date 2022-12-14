import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { forgotPassword } from '../../store/actions/ChairmanAction';
import { REMOVE_CHAIRMAN_ERRORS, REMOVE_CHAIRMAN_MESSAGE } from '../../store/types/ChairmanType';
import { Helmet } from "react-helmet";
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2'

const ChairmanForgotPassword = () => {
    const dispatch = useDispatch();
    const {loading, chairmanErrors, message} = useSelector((state)=>state.ChairmanReducer);
    const [state, setState] = useState({
        email:''
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
        if(chairmanErrors && chairmanErrors.length > 0){
            chairmanErrors.map((error)=>{
                toast.error(error.msg);
            });
            dispatch({type: REMOVE_CHAIRMAN_ERRORS});
        }
    }, [chairmanErrors]);
    useEffect(()=>{
        if(message){
            toast.success(message, { duration: 5000 });
            dispatch({type: REMOVE_CHAIRMAN_MESSAGE});
        }
      },[message]);
    return (
        <>
        <Toaster position="top-right" reverseOrder={false}/>
        <div class="login-box">
        <Helmet>
            <title>Chairman forgot password - Movie</title>
            <meta name="description" content="User Login Here" />
        </Helmet>
        <div class="login-logo">
            <NavLink to="/admin"><img src="http://localhost:5000/images/logo2.png" width="20%"/></NavLink><br/>
            <b>Chairman Panel</b>
        </div>
        {/* <!-- /.login-logo --> */}
        <div class="card">
        <div class="card-body login-card-body">
        <p class="login-box-msg">You forgot your password? Here you can easily retrieve a new password.</p>

        <form onSubmit={handleSubmit} method="post">
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
            Already have an account? Please <NavLink to="/chairman/login">Login !!!</NavLink>
        </p>
        </div>
    </div>
    </div>
    </>
    );
}

export default ChairmanForgotPassword;