import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RouteLink = ({children}) => {
    const {user} = useSelector((state)=>state.ChairmanReducer);
    return user?( <Navigate to="/chairman/dashboard" replace />) : children;
}

export default RouteLink;