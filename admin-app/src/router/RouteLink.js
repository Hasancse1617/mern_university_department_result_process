import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RouteLink = ({children}) => {
    const {user} = useSelector((state)=>state.AuthReducer);
    return user?( <Navigate to="/admin/dashboard" replace />) : children;
}

export default RouteLink;