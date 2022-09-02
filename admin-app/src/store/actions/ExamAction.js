import axiosInstance from "../../helper/axiosInstance";
import { EXAM_STATUS, REMOVE_EXAM_LOADER, SET_EXAM_ERRORS, SET_EXAM_LOADER, SET_EXAM_MESSAGE, SET_EXAM_TOKEN } from '../types/ExamType';

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

export const forgotPassword = (state) =>{
    return async (dispatch) =>{
        try {
            dispatch({type: SET_EXAM_LOADER});
            const {data} = await axiosInstance.post('/exam/forgot-password',state);
            dispatch({type: REMOVE_EXAM_LOADER});
            dispatch({type: SET_EXAM_MESSAGE, payload: data.msg});
        } catch (error) {
            dispatch({type: REMOVE_EXAM_LOADER});
            if(error.response.data){
                const {errors} = error.response.data;
                dispatch({type: SET_EXAM_ERRORS, payload:errors});
            }
        }
    }
}

export const resetPassword = (state,token) =>{
    return async (dispatch) =>{
        try {
            dispatch({type: SET_EXAM_LOADER});
            const {data} = await axiosInstance.post(`/exam/reset-password/${token}`,state);
            dispatch({type: REMOVE_EXAM_LOADER});
            dispatch({type: SET_EXAM_MESSAGE, payload: data.msg});
        } catch (error) {
            dispatch({type: REMOVE_EXAM_LOADER});
            if(error.response.data){
                const {errors} = error.response.data;
                dispatch({type: SET_EXAM_ERRORS, payload:errors});
            }
        }
    }
}

export const statusAction = (statusData) =>{
    return async(dispatch,getState)=>{
          try {
                const {data: {status,exam_id}} = await axiosInstance.post(`/status-exam`, statusData);
                dispatch({type: EXAM_STATUS, payload: {status,exam_id}});
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: SET_EXAM_ERRORS, payload:errors});
          }
    }
}

export const deleteExam = (id) =>{
    return async (dispatch, getState)=>{
          try {
                dispatch({type: SET_EXAM_LOADER});
                const {data} = await axiosInstance.post(`/exam-delete/${id}`);
                dispatch({type: REMOVE_EXAM_LOADER});
                dispatch({type: SET_EXAM_MESSAGE, payload: data.msg});    
        } catch (error) {
            if(error){
               const {errors} = error.response.data;
               dispatch({type: SET_EXAM_ERRORS, payload:errors});
            } 
        }
    }
}