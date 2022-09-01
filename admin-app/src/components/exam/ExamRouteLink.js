import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ExamRouteLink = ({children}) => {
    const {exam} = useSelector((state)=>state.ExamReducer);
    return exam?( <Navigate to="/exam/dashboard" replace />) : children;
}

export default ExamRouteLink;