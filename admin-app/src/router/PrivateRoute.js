import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({children}) => {
    const {user} = useSelector((state)=>state.AuthReducer);
    return user? children : (<Navigate to="/admin/login" replace/>);
}

export default PrivateRoute;