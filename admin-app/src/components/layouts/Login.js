import React from "react";
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';
import { NavLink } from "react-router-dom";

const Login = () => {
    return (
        <>
        <Toaster position="top-right" reverseOrder={true}/>
        <div className="login-box">
            <Helmet>
                <title>Admin Panel - Reasult Processing</title>
                <meta name="description" content="User Login Here" />
            </Helmet>
            <div class="login-logo">
                <a href="../../index2.html"><b>Admin Panel</b></a>
            </div>
            <div class="card">
                <div class="card-body login-card-body">
                <p class="login-box-msg"><h5>Login As a</h5></p>
                
                <form>
                    <NavLink to="/chairman/login">
                        <div class="col-12">
                            <button type="submit" class="btn btn-dark btn-block">Dept Chairman</button>
                        </div>
                    </NavLink>
                    <br/>
                    <NavLink to="/exam/login">
                        <div class="col-12">
                            <button type="submit" class="btn btn-success btn-block">Exam Chairman</button>
                        </div>
                    </NavLink>
                    <br/>
                    <NavLink to="/teacher/login">
                        <div class="col-12">
                            <button type="submit" class="btn btn-primary btn-block">Exam Teacher</button>
                        </div>
                    </NavLink>
                </form>
                </div>
                {/* <!-- /.login-card-body --> */}
            </div>
        </div>
        </>
    );
}
export default Login;