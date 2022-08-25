import React from "react";
import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from 'react-redux';
import { ChairmanLogin } from  "../../store/actions/ChairmanAction";
import toast, { Toaster } from 'react-hot-toast';
import { REMOVE_CHAIRMAN_ERRORS } from '../../store/types/ChairmanType';
import { NavLink } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const {loading, loginErrors} = useSelector((state)=>state.AuthReducer);
    const [state, setState] = useState({
        email: '',
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
    const userLogin = (e) =>{
        e.preventDefault();
        dispatch(ChairmanLogin(state));
        console.log(state);
    }
    useEffect(()=>{
        if(loginErrors.length > 0){
            loginErrors.map((error)=>{
                toast.error(error.msg);
            });
          dispatch({type: REMOVE_CHAIRMAN_ERRORS});
        }
    }, [loginErrors]);

    return (
        <>
        <Toaster position="top-right" reverseOrder={false}/>
        <div className="login-box">
            <Helmet>
                <title>User Login - Movie</title>
                <meta name="description" content="User Login Here" />
            </Helmet>
            <div class="login-logo">
                <a href="../../index2.html"><b>Chairman Panel</b></a>
            </div>
            <div class="card">
                <div class="card-body login-card-body">
                <p class="login-box-msg"><h5>Sign In</h5></p>
                
                <form onSubmit={userLogin}>
                    <div class="input-group mb-3">
                    <input type="email" name="email" class="form-control" value={state.email} onChange={handleInputs} placeholder="Email"/>
                    <div class="input-group-append">
                        <div class="input-group-text">
                        <span class="fas fa-envelope"></span>
                        </div>
                    </div>
                    </div>
                    <div class="input-group mb-3">
                    <input type="password" name="password" class="form-control" value={state.password} onChange={handleInputs} placeholder="Password"/>
                    <div class="input-group-append">
                        <div class="input-group-text">
                        <span class="fas fa-lock"></span>
                        </div>
                    </div>
                    </div>
                    <div class="row">
                    <div class="col-8">
                        <div class="icheck-primary">
                        <input type="checkbox" value={state.remember_me} name="remember_me" onChange={handleCheck} id="remember"/>
                        <label for="remember">
                            Remember Me
                        </label>
                        </div>
                    </div>
                    {/* <!-- /.col --> */}
                    <div class="col-4">
                        <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                    </div>
                    {/* <!-- /.col --> */}

                    </div>
                    
                </form>
                <br></br>
                <p class="mb-1">
                    <NavLink to="/chairman/forgot-password">I forgot my password</NavLink>
                    <NavLink style={{float: "right"}} to="/chairman/register">SignUp</NavLink>
                </p>
                </div>
                {/* <!-- /.login-card-body --> */}
            </div>
        </div>
        </>
    );
}

export default Login;