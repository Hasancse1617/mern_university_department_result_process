import React from "react";
import { Route, Routes as Switch } from "react-router-dom"
import Dashboard from "../components/layouts/Dashboard";
import Header from "../components/layouts/Header";
import Sidebar from "../components/layouts/Sidebar";
import Footer from "../components/layouts/Footer";
import UserRoute from "../components/user/UserRoute";

const DashboardRoute = () => {
    return (
        <>
            <Header/>
            <Sidebar/>
            <Switch>
                <Route path="/dashboard" element={<Dashboard/>}></Route>
                <Route path="/user/*" element={<UserRoute/>}></Route>
            </Switch>
            <Footer/>
        </>
    );
}

export default DashboardRoute;