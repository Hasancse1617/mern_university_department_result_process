import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TeacherPrivateRoute = ({children}) => {
    const {teacher} = useSelector((state)=>state.TeacherReducer);
    return teacher? children : (<Navigate to="/teacher/login" replace/>);
}

export default TeacherPrivateRoute;