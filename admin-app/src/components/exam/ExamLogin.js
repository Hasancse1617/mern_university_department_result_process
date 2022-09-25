import React from "react";
import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from 'react-redux';
import { LoginExam } from  "../../store/actions/ExamAction";
import toast, { Toaster } from 'react-hot-toast';
import { REMOVE_EXAM_ERRORS } from '../../store/types/ExamType';
import { NavLink } from 'react-router-dom';

const ExamLogin = () => {
    const dispatch = useDispatch();
    const {loading, examErrors} = useSelector((state)=>state.ExamReducer);
    const [state, setState] = useState({
        exam_id: '',
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
    const examLogin = (e) =>{
        e.preventDefault();
        dispatch(LoginExam(state));
        console.log(state);
    }
    useEffect(()=>{
        if(examErrors.length > 0){
            examErrors.map((error)=>{
                toast.error(error.msg);
            });
          dispatch({type: REMOVE_EXAM_ERRORS});
        }
    }, [examErrors]);

    return (
        <>
        <Toaster position="top-right" reverseOrder={true}/>
        <div className="login-box">
            <Helmet>
                <title>Exam Chairman Login - Reasult Processing</title>
                <meta name="description" content="User Login Here" />
            </Helmet>
            <div class="login-logo">
                <NavLink to="/admin"><img src="http://localhost:5000/images/logo2.png" width="20%"/></NavLink><br/>
                <b>Exam Panel</b>
                <h5>Login as a Exam Chairman.</h5>
            </div>
            <div class="card">
                <div class="card-body login-card-body">
                <p class="login-box-msg"><h5>You can login after validation from Dept Chairman!</h5></p>
                
                <form onSubmit={examLogin}>
                    <div class="input-group mb-3">
                    <input type="text" name="exam_id" class="form-control" value={state.exam_id} onChange={handleInputs} placeholder="Exam ID"/>
                    <div class="input-group-append">
                        <div class="input-group-text">
                        <span class="fas fa-envelope"></span>
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
                    <NavLink to="/exam/forgot-password">Forgotten password?</NavLink>
                    <NavLink to="/exam/register" style={{float: "right"}}>SignUp</NavLink>
                </p>
                </div>
                {/* <!-- /.login-card-body --> */}
            </div>
        </div>
        </>
    );
}

export default ExamLogin;