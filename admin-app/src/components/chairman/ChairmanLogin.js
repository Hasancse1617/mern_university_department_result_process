import React from "react";
import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from 'react-redux';
import { LoginChairman } from  "../../store/actions/ChairmanAction";
import toast, { Toaster } from 'react-hot-toast';
import { REMOVE_CHAIRMAN_ERRORS, REMOVE_CHAIRMAN_MESSAGE } from '../../store/types/ChairmanType';
import { NavLink } from 'react-router-dom';
import Select from 'react-select';
import { fetchDept } from "../../store/actions/CommonAction";

const ChairmanLogin = () => {
    const dispatch = useDispatch();
    const {loading, chairmanErrors, message} = useSelector((state)=>state.ChairmanReducer);
    const {departments} = useSelector((state)=>state.CommonReducer);
    const [state, setState] = useState({
        dept_id: "",
        email: "",
        password: "",
        remember_me: false,
    });
    const handleInputs = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }
    const handleSelect = (selected_option) =>{
        setState({
           ...state,
           dept_id: selected_option.value
        });
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
        // console.log(state);
    }
    useEffect(()=>{
        dispatch(fetchDept());
    },[]);
    const Options = () =>{
        const options = [];
        if(departments){
            departments.map((dept)=>{
                options.push({value: dept._id , label:dept.dept_name });
            })
        }
        return options;
    }
    useEffect(()=>{
        if(chairmanErrors && chairmanErrors.length > 0){
            chairmanErrors.map((error)=>{
                toast.error(error.msg);
            });
          dispatch({type: REMOVE_CHAIRMAN_ERRORS});
        }
        if(message){
            toast.success(message);
            dispatch({type: REMOVE_CHAIRMAN_MESSAGE});
        }
    }, [message, chairmanErrors]);

    return (
        <>
        <Toaster position="top-right" reverseOrder={true}/>
        <div className="login-box">
            <Helmet>
                <title>Chairman Login - Reasult Processing</title>
                <meta name="description" content="User Login Here" />
            </Helmet>
            <div class="login-logo">
                <NavLink to="/admin"><img src="http://localhost:5000/images/logo2.png" width="20%"/></NavLink><br/>
                <b>Dept. Chairman</b>
            </div>
            <div class="card">
                <div class="card-body login-card-body">
                <p class="login-box-msg"><h5>Sign In</h5></p>
                
                <form onSubmit={chairmanLogin}>
                    <div class="input-group mb-3">
                       <Select name="dept_name" defaultInputValue={state.dept_id} onChange={handleSelect} options={Options()} placeholder="Select Department"/>
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
                    <NavLink to="/chairman/forgot-password">Forgotten password?</NavLink>
                    <NavLink to="/chairman/register" style={{float: "right"}}>SignUp</NavLink>
                </p>
                </div>
                {/* <!-- /.login-card-body --> */}
            </div>
        </div>
        </>
    );
}

export default ChairmanLogin;