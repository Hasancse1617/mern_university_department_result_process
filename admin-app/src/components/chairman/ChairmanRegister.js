import React from "react";
import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from 'react-redux';
import { RegisterChairman } from  "../../store/actions/ChairmanAction";
import toast, { Toaster } from 'react-hot-toast';
import { REMOVE_CHAIRMAN_ERRORS, REMOVE_CHAIRMAN_MESSAGE } from '../../store/types/ChairmanType';
import { NavLink } from 'react-router-dom';

const ChairmanRegister = () => {
    const dispatch = useDispatch();
    const {loading, message, chairmanErrors} = useSelector((state)=>state.ChairmanReducer);
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        c_password: ""
    });
    const handleInputs = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    const chairmanSignUp = (e) =>{
        e.preventDefault();
        dispatch(RegisterChairman(state));
    }
    useEffect(()=>{
        if(chairmanErrors.length > 0){
            chairmanErrors.map((error)=>{
                toast.error(error.msg);
            });
          dispatch({type: REMOVE_CHAIRMAN_ERRORS});
        }
        if(message){
            toast.success(message, { duration: 5000 });
            dispatch({type: REMOVE_CHAIRMAN_MESSAGE});
        }
    }, [chairmanErrors, message]);


    return (
        <>
        <Toaster position="top-right" reverseOrder={true}/>
        <div className="login-box">
            <Helmet>
                <title>Chairman registration</title>
                <meta name="description" content="Chairman registration Here" />
            </Helmet>
            <div class="login-logo">
                <NavLink to="/admin"><img src="http://localhost:5000/images/logo2.png" width="20%"/></NavLink><br/>
                <b>Chairman Panel</b>
            </div>
            <div class="card">
                <div class="card-body login-card-body">
                <p class="login-box-msg"><h5>SignUp</h5></p>
                
                <form onSubmit={chairmanSignUp} enctype="multipart/form-data">
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
                <p class="mt-3 mb-1">
                    Already have an account? Please <NavLink to="/chairman/login">Login !!!</NavLink>
                </p>
                </div>
                {/* <!-- /.login-card-body --> */}
            </div>
        </div>
        </>
    );
}

export default ChairmanRegister;