import React from "react";
import { Route, Routes as Switch } from "react-router-dom"
import Header from "../components/layouts/Header";
import Sidebar from "../components/layouts/Sidebar";
import Footer from "../components/layouts/Footer";
import ExamPrivateRoute from "./ExamPrivateRoute";
import Dashboard from "../components/layouts/Dashboard";
import ExamStudent from "../components/exam/ExamStudent";

const ExamDashboardRoute = () => {
    return (
        <>
            <Header/>
            <Sidebar/>
            <div class="content-wrapper">
                <Switch>
                    {/*Exam Chairman dashboard Route */}
                    <Route path="/dashboard" element={<ExamPrivateRoute><Dashboard/></ExamPrivateRoute>}></Route>
                    <Route path="/students" element={<ExamPrivateRoute><ExamStudent/></ExamPrivateRoute>}></Route>
                    {/*End Exam Chairman dashboard Route */}
                </Switch>
            </div>
            <Footer/>
        </>
    );
}

export default ExamDashboardRoute;