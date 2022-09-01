import axiosInstance from "../../helper/axiosInstance";
import { REMOVE_EXAM_LOADER, SET_EXAM_ERRORS, SET_EXAM_LOADER, SET_EXAM_MESSAGE, SET_EXAM_TOKEN } from '../types/ExamType';

export const RegisterExam = (state) =>{
    return async(dispatch)=>{
        try {
            dispatch({type: SET_EXAM_LOADER});
            const {data} = await axiosInstance.post('/exam/register',state);
            dispatch({type: REMOVE_EXAM_LOADER});
            dispatch({type: SET_EXAM_MESSAGE, payload: data.msg});
            console.log(data.msg)
        } catch (error) {
            dispatch({type: REMOVE_EXAM_LOADER});
            if(error.response.data){
                const {errors} = error.response.data;
                dispatch({type: SET_EXAM_ERRORS, payload:errors});
            } 
        }
    }
}

export const LoginExam = (state) =>{
    return async (dispatch) =>{
        try {
            dispatch({type: SET_EXAM_LOADER});
            const {data} = await axiosInstance.post('/exam/login',state);
            dispatch({type: REMOVE_EXAM_LOADER});
            localStorage.setItem("examToken", data.token);
            dispatch({type: SET_EXAM_TOKEN, payload: data.token});
        } catch (error) {
            dispatch({type: REMOVE_EXAM_LOADER});
            if(error.response.data){
                const {errors} = error.response.data;
                dispatch({type: SET_EXAM_ERRORS, payload:errors});
            }
        }
    }
}
