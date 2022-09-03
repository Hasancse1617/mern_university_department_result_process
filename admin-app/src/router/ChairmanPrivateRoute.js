import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ChairmanPrivateRoute = ({children}) => {
    const {chairman} = useSelector((state)=>state.ChairmanReducer);
    return chairman? children : (<Navigate to="/chairman/login" replace/>);
}
export default ChairmanPrivateRoute;