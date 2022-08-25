import React from "react";
import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from 'react-redux';
import { ChairmanRegister } from  "../../store/actions/ChairmanAction";
import toast, { Toaster } from 'react-hot-toast';
import { REMOVE_CHAIRMAN_ERRORS } from '../../store/types/ChairmanType';
import { NavLink } from 'react-router-dom';

const Register = () => {
    const dispatch = useDispatch();
    const {loading, loginErrors} = useSelector((state)=>state.AuthReducer);
    const [state, setState] = useState({
        name: "",
        email: "",
        image: "",
        password: "",
        c_password: ""
    });
    const [preview, setPreview] = useState('');
    const handleInputs = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    const handleImage = (e) =>{
        if(e.target.files.length !== 0){
            const reader = new FileReader();
            setState({
                ...state,
                [e.target.name]: e.target.files[0]
            });
            reader.onloadend = () =>{
                setPreview(reader.result);
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    const chairmanSignUp = (e) =>{
        e.preventDefault();
        dispatch(ChairmanRegister(state));
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
                <title>Chairman registration</title>
                <meta name="description" content="Chairman registration Here" />
            </Helmet>
            <div class="login-logo">
                <a href="../../index2.html"><b>Chairman Panel</b></a>
            </div>
            <div class="card">
                <div class="card-body login-card-body">
                <p class="login-box-msg"><h5>SignUp</h5></p>
                
                <form onSubmit={chairmanSignUp}>
                <div class="input-group mb-3">
                    <input type="text" name="name" class="form-control" value={state.name} onChange={handleInputs} placeholder="Name"/>
                        <div class="input-group-append">
                            <div class="input-group-text">
                            <span class="fas fa-user"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                    <input type="email" name="email" class="form-control" value={state.email} onChange={handleInputs} placeholder="Email"/>
                        <div class="input-group-append">
                            <div class="input-group-text">
                            <span class="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                    <input type="file" name="image" class="form-control" onChange={handleImage}/>
                        <div class="input-group-append">
                            <div class="input-group-text">
                            <span class="fas fa-image"></span>
                            </div>
                        </div>
                    </div>
                    {preview? 
                    <div class="input-group mb-3">
                        <img src={preview} height="90"></img>
                    </div>:""}
                    <div class="input-group mb-3">
                    <input type="password" name="password" class="form-control" value={state.password} onChange={handleInputs} placeholder="Password"/>
                        <div class="input-group-append">
                            <div class="input-group-text">
                            <span class="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>
                    <div class="input-group mb-3">
                    <input type="password" name="c_password" class="form-control" value={state.c_password} onChange={handleInputs} placeholder="Confirm Password"/>
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
                <p class="mb-1">
                    <NavLink to="/chairman/forgot-password">If you have an account, click here to login</NavLink>
                    {/* <NavLink style={{float: "right"}} to="/chairman/forgot-password">Register</NavLink> */}
                </p>
                </div>
                {/* <!-- /.login-card-body --> */}
            </div>
        </div>
        </>
    );
}

export default Register;