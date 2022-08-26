import React from "react";
import { Route, Routes as Switch } from "react-router-dom"
import RouteLink from "../../router/RouteLink";
import Activation from "./Activation";
import ChairmanDashboard from "./ChairmanDashboard";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./ResetPassword";

const ChairmanRoute = () => {
    return (
        <>
            <Switch>
               <Route path="/dashboard" element={<RouteLink><ChairmanDashboard/></RouteLink>}></Route>
               <Route path="/login" element={<RouteLink><Login/></RouteLink>}></Route>
               <Route path="/register" element={<RouteLink><Register/></RouteLink>}></Route>
               <Route path="/verify-account/:token" element={<RouteLink><Activation/></RouteLink>}></Route>
               <Route path="/forgot-password" element={<RouteLink><ForgotPassword/></RouteLink>}></Route>
               <Route path="/reset-password/:token" element={<RouteLink><ResetPassword/></RouteLink>}></Route>
            </Switch>
        </>
    );
}

export default ChairmanRoute;