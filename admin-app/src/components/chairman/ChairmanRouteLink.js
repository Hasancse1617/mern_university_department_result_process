import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RouteLink = ({children}) => {
    const {chairman} = useSelector((state)=>state.ChairmanReducer);
    return chairman?( <Navigate to="/chairman/dashboard" replace />) : children;
}

export default RouteLink;