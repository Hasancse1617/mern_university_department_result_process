import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes as Switch } from "react-router";
import ChairmanActivation from "../components/chairman/ChairmanActivation";
import ChairmanForgotPassword from "../components/chairman/ChairmanForgotPassword";
import ChairmanLogin from "../components/chairman/ChairmanLogin";
import ChairmanRegister from "../components/chairman/ChairmanRegister";
import ChairmanResetPassword from "../components/chairman/ChairmanResetPassword";
import ExamForgotPassword from "../components/exam/ExamForgotPassword";
import ExamLogin from "../components/exam/ExamLogin";
import ExamRegister from "../components/exam/ExamRegister";
import ExamResetPassword from "../components/exam/ExamResetPassword";
import Login from "../components/layouts/Login";
import TeacherActivation from "../components/teacher/TeacherActivation";
import TeacherForgotPassword from "../components/teacher/TeacherForgotPassword";
import TeacherLogin from "../components/teacher/TeacherLogin";
import TeacherRegister from "../components/teacher/TeacherRegister";
import TeacherResetPassword from "../components/teacher/TeacherResetPassword";
import ChairmanDashboardRoute from "./ChairmanDashboardRoute";
import ChairmanPublicRoute from "./ChairmanPublicRoute";
import ExamDashboardRoute from "./ExamDashboardRoute";
import ExamPublicRoute from "./ExamPublicRoute";
import TeacherDashboardRoute from "./TeacherDashboardRoute";
import TeacherPublicRoute from "./TeacherPublicRoute";

const Router = () => {
    const { user } = useSelector((state)=>state.ChairmanReducer);
    return (
        <>
           <Switch>
               <Route path="/admin" element={<Login/>}></Route>
                {/* *** Chairman Public Route *** */}
               <Route path="/chairman/login" element={<ChairmanPublicRoute><ChairmanLogin/></ChairmanPublicRoute>}></Route>
               <Route path="/chairman/register" element={<ChairmanPublicRoute><ChairmanRegister/></ChairmanPublicRoute>}></Route>
               <Route path="/chairman/verify-account/:token" element={<ChairmanPublicRoute><ChairmanActivation/></ChairmanPublicRoute>}></Route>
               <Route path="/chairman/forgot-password" element={<ChairmanPublicRoute><ChairmanForgotPassword/></ChairmanPublicRoute>}></Route>
               <Route path="/chairman/reset-password/:token" element={<ChairmanPublicRoute><ChairmanResetPassword/></ChairmanPublicRoute>}></Route>
               <Route path="/chairman/*" element={<ChairmanDashboardRoute/>}></Route>

                {/* *** Exam Chairman Public Route*** */}
               <Route path="/exam/login" element={<ExamPublicRoute><ExamLogin/></ExamPublicRoute>}></Route>
               <Route path="/exam/register" element={<ExamPublicRoute><ExamRegister/></ExamPublicRoute>}></Route>
               <Route path="/exam/forgot-password" element={<ExamPublicRoute><ExamForgotPassword/></ExamPublicRoute>}></Route>
               <Route path="/exam/reset-password/:token" element={<ExamPublicRoute><ExamResetPassword/></ExamPublicRoute>}></Route>
               <Route path="/exam/*" element={<ExamDashboardRoute/>}></Route>
                            
                {/* *** Teacher Public Route *** */}
               <Route path="/teacher/login" element={<TeacherPublicRoute><TeacherLogin/></TeacherPublicRoute>}></Route>
               <Route path="/teacher/register" element={<TeacherPublicRoute><TeacherRegister/></TeacherPublicRoute>}></Route>
               <Route path="/teacher/verify-account/:token" element={<TeacherPublicRoute><TeacherActivation/></TeacherPublicRoute>}></Route>
               <Route path="/teacher/forgot-password" element={<TeacherPublicRoute><TeacherForgotPassword/></TeacherPublicRoute>}></Route>
               <Route path="/teacher/reset-password/:token" element={<TeacherPublicRoute><TeacherResetPassword/></TeacherPublicRoute>}></Route>
               <Route path="/teacher/*" element={<TeacherDashboardRoute/>}></Route>

           </Switch>
        </>
    );
}

export default Router;