import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TeacherPublicRoute = ({children}) => {
    const {teacher} = useSelector((state)=>state.TeacherReducer);
    return teacher?( <Navigate to="/teacher/dashboard" replace />) : children;
}

export default TeacherPublicRoute;