import React from "react";
import { Route, Routes as Switch } from "react-router-dom"
import Header from "../components/layouts/Header";
import Sidebar from "../components/layouts/Sidebar";
import Footer from "../components/layouts/Footer";
import ChairmanDashboard from "../components/chairman/ChairmanDashboard";

const DashboardRoute = () => {
    return (
        <>
            <Header/>
            <Sidebar/>
            <Switch>
                {/* Chairman dashboard Route */}
                <Route path="/dashboard" element={<ChairmanDashboard/>}></Route>
            </Switch>
            <Footer/>
        </>
    );
}

export default DashboardRoute;