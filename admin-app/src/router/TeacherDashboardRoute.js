import React from "react";
import { Route, Routes as Switch } from "react-router-dom"
import Header from "../components/layouts/Header";
import Sidebar from "../components/layouts/Sidebar";
import Footer from "../components/layouts/Footer";
import Dashboard from "../components/layouts/Dashboard";
import TeacherPrivateRoute from "./TeacherPrivateRoute";
import AddMarkTeacher from "../components/mark/AddMarkTeacher";

const TeacherDashboardRoute = () => {
    return (
        <>
            <Header/>
            <Sidebar/>
            <div class="content-wrapper">
                <Switch>
                    {/*Teacher dashboard Route */}
                    <Route path="/dashboard" element={<TeacherPrivateRoute><Dashboard/></TeacherPrivateRoute>}></Route>
                    <Route path="/add-mark" element={<TeacherPrivateRoute><AddMarkTeacher/></TeacherPrivateRoute>}></Route>
                    {/*End Exam Chairman dashboard Route */}
                </Switch>
            </div>
            <Footer/>
        </>
    );
}

export default TeacherDashboardRoute;