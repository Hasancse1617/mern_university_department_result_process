import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes as Switch, Navigate } from "react-router";
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
               <Route path="/chairman/login" element={<RouteLink><Login/></RouteLink>}></Route>
               <Route path="/chairman/register" element={<RouteLink><Register/></RouteLink>}></Route>
               <Route path="/chairman/forgot-password" element={<RouteLink><ForgotPassword/></RouteLink>}></Route>
               <Route path="/chairman/reset-password/:token" element={<RouteLink><ResetPassword/></RouteLink>}></Route>
               <Route path="/admin/*" element={<DashboardRoute/>}></Route>
           </Switch>
        </>
    );
}

export default Router;