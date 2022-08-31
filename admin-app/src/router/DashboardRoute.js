import React from "react";
import { Route, Routes as Switch } from "react-router-dom"
import Header from "../components/layouts/Header";
import Sidebar from "../components/layouts/Sidebar";
import Footer from "../components/layouts/Footer";
import ChairmanDashboard from "../components/chairman/ChairmanDashboard";
import AddStudent from "../components/student/AddStudent";
import AllStudent from "../components/student/AllStudent";
import EditStudent from "../components/student/EditStudent";
import ChairmanPrivateRoute from "../components/chairman/ChairmanPrivateRoute";
import AllTeacher from "../components/student/AllTeacher";

const DashboardRoute = () => {
    return (
        <>
            <Header/>
            <Sidebar/>
            <div class="content-wrapper">
                <Switch>
                    {/* Chairman dashboard Route */}
                    <Route path="/dashboard" element={<ChairmanPrivateRoute><ChairmanDashboard/></ChairmanPrivateRoute>}></Route>
                    <Route path="/all-teacher" element={<ChairmanPrivateRoute><AllTeacher/></ChairmanPrivateRoute>}></Route>
                    <Route path="/all-student" element={<ChairmanPrivateRoute><AllStudent/></ChairmanPrivateRoute>}></Route>
                    <Route path="/add-student" element={<ChairmanPrivateRoute><AddStudent/></ChairmanPrivateRoute>}></Route>
                    <Route path="/edit-stduent/:id" element={<ChairmanPrivateRoute><EditStudent/></ChairmanPrivateRoute>}></Route>
                </Switch>
            </div>
            <Footer/>
        </>
    );
}

export default DashboardRoute;