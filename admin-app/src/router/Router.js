import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes as Switch } from "react-router";
import ChairmanActivation from "../components/chairman/ChairmanActivation";
import ChairmanForgotPassword from "../components/chairman/ChairmanForgotPassword";
import ChairmanLogin from "../components/chairman/ChairmanLogin";
import ChairmanRegister from "../components/chairman/ChairmanRegister";
import ChairmanResetPassword from "../components/chairman/ChairmanResetPassword";
import Login from "../components/layouts/Login";
import TeacherActivation from "../components/teacher/TeacherActivation";
import TeacherForgotPassword from "../components/teacher/TeacherForgotPassword";
import TeacherLogin from "../components/teacher/TeacherLogin";
import TeacherRegister from "../components/teacher/TeacherRegister";
import TeacherResetPassword from "../components/teacher/TeacherResetPassword";
import DashboardRoute from "./DashboardRoute";
import RouteLink from "./RouteLink";

const Router = () => {
    const { user } = useSelector((state)=>state.ChairmanReducer);
    return (
        <>
           <Switch>
               <Route path="/admin" element={<Login/>}></Route>
               
               {/* chairman some route without sidebar and footer */}
               <Route path="/chairman/login" element={<RouteLink><ChairmanLogin/></RouteLink>}></Route>
               <Route path="/chairman/register" element={<RouteLink><ChairmanRegister/></RouteLink>}></Route>
               <Route path="/chairman/verify-account/:token" element={<RouteLink><ChairmanActivation/></RouteLink>}></Route>
               <Route path="/chairman/forgot-password" element={<RouteLink><ChairmanForgotPassword/></RouteLink>}></Route>
               <Route path="/chairman/reset-password/:token" element={<RouteLink><ChairmanResetPassword/></RouteLink>}></Route>
               {/* end chairman some route without sidebar and footer */}
               <Route path="/chairman/*" element={<DashboardRoute/>}></Route>
               
               {/* Teacher some route without sidebar and footer */}
               <Route path="/teacher/login" element={<TeacherLogin/>}></Route>
               <Route path="/teacher/register" element={<TeacherRegister/>}></Route>
               <Route path="/teacher/verify-account/:token" element={<TeacherActivation/>}></Route>
               <Route path="/teacher/forgot-password" element={<TeacherForgotPassword/>}></Route>
               <Route path="/teacher/reset-password/:token" element={<TeacherResetPassword/>}></Route>
               {/* end Teacher some route without sidebar and footer */}
           </Switch>
        </>
    );
}

export default Router;