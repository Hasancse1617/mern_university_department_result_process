import React from "react";
import { Route, Routes as Switch } from "react-router-dom"
import Header from "../components/layouts/Header";
import Sidebar from "../components/layouts/Sidebar";
import Footer from "../components/layouts/Footer";
import ExamPrivateRoute from "./ExamPrivateRoute";
import Dashboard from "../components/layouts/Dashboard";
import ExamStudent from "../components/exam/ExamStudent";
import AddSubject from "../components/subject/AddSubject";
import AllSubject from "../components/subject/AllSubject";
import EditSubject from "../components/subject/EditSubject";
import ViewSingleMark from "../components/result/ViewSingleMark";
import ViewResult from "../components/result/ViewResult";

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
                    <Route path="/subjects" element={<ExamPrivateRoute><AllSubject/></ExamPrivateRoute>}></Route>
                    <Route path="/add-subject" element={<ExamPrivateRoute><AddSubject/></ExamPrivateRoute>}></Route>
                    <Route path="/edit-subject/:id" element={<ExamPrivateRoute><EditSubject/></ExamPrivateRoute>}></Route>
                    
                    <Route path="/view-mark" element={<ExamPrivateRoute><ViewSingleMark/></ExamPrivateRoute>}></Route>
                    <Route path="/view-result" element={<ExamPrivateRoute><ViewResult/></ExamPrivateRoute>}></Route>

                    {/*End Exam Chairman dashboard Route */}
                </Switch>
            </div>
            <Footer/>
        </>
    );
}

export default ExamDashboardRoute;