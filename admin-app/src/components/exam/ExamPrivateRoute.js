import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ExamPrivateRoute = ({children}) => {
    const {exam} = useSelector((state)=>state.ExamReducer);
    return chairman? children : (<Navigate to="/exam/login" replace/>);
}
export default ExamPrivateRoute;