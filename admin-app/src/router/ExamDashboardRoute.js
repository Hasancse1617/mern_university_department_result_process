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
import MarkSubjects from "../components/mark/MarkSubjects";
import AddMark from "../components/mark/AddMark";

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
                    <Route path="/mark-subjects" element={<ExamPrivateRoute><MarkSubjects/></ExamPrivateRoute>}></Route>
                    <Route path="/add-mark/:id" element={<ExamPrivateRoute><AddMark/></ExamPrivateRoute>}></Route>
                    {/*End Exam Chairman dashboard Route */}
                </Switch>
            </div>
            <Footer/>
        </>
    );
}

export default ExamDashboardRoute;