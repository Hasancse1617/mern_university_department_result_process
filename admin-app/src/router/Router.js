import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes as Switch, Navigate } from "react-router";
import Activation from "../components/chairman/Activation";
import ChairmanRoute from "../components/chairman/ChairmanRoute";
import ForgotPassword from "../components/chairman/ForgotPassword";
import Login from "../components/chairman/Login";
import Register from "../components/chairman/Register";
import ResetPassword from "../components/chairman/ResetPassword";
import DashboardRoute from "./DashboardRoute";
import PrivateRoute from "./PrivateRoute";
import RouteLink from "./RouteLink";

const Router = () => {
    const { user } = useSelector((state)=>state.ChairmanReducer);
    return (
        <>
           <Switch>
               <Route path="/" element={user?<Navigate to="/chairman/dashboard" replace /> : <Navigate to="/chairman/login" replace/>}></Route>
               <Route path="/chairman/*" element={<ChairmanRoute/>}></Route>
               {/* <Route path="/chairman/*" element={<DashboardRoute/>}></Route> */}
           </Switch>
        </>
    );
}

export default Router;