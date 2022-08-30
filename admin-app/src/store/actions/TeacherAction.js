import axiosInstance from '../../helper/axiosInstance';
import { REMOVE_TEACHER_LOADER, SET_TEACHER_ERRORS, SET_TEACHER_LOADER, SET_TEACHER_MESSAGE, SET_TEACHER_TOKEN } from '../types/TeacherType';

export const RegisterTeacher = (state) =>{
    return async(dispatch)=>{
        try {
            dispatch({type: SET_TEACHER_LOADER});
            const {data} = await axiosInstance.post('/teacher/register',state);
            dispatch({type: REMOVE_TEACHER_LOADER});
            dispatch({type: SET_TEACHER_MESSAGE, payload: data.msg});
            console.log(data.msg)
        } catch (error) {
            const {errors} = error.response.data;
            dispatch({type: REMOVE_TEACHER_LOADER});
            dispatch({type: SET_TEACHER_ERRORS, payload:errors});
        }
    }
}

export const LoginTeacher = (state) =>{
    return async (dispatch) =>{
        try {
            dispatch({type: SET_TEACHER_LOADER});
            const {data} = await axiosInstance.post('/teacher/login',state);
            dispatch({type: REMOVE_TEACHER_LOADER});
            localStorage.setItem("myToken", data.token);
            dispatch({type: SET_TEACHER_TOKEN, payload: data.token});
        } catch (error) {
            const {errors} = error.response.data;
            dispatch({type: REMOVE_TEACHER_LOADER});
            dispatch({type: SET_TEACHER_ERRORS, payload:errors});
        }
    }
}

export const forgotPassword = (state) =>{
    return async (dispatch) =>{
        try {
            dispatch({type: SET_TEACHER_LOADER});
            const {data} = await axiosInstance.post('/teacher/forgot-password',state);
            dispatch({type: REMOVE_TEACHER_LOADER});
            dispatch({type: SET_TEACHER_MESSAGE, payload: data.msg});
        } catch (error) {
            dispatch({type: REMOVE_TEACHER_LOADER});
            dispatch({type: SET_TEACHER_ERRORS, payload: error.response.data.errors});
        }
    }
}

export const resetPassword = (state,token) =>{
    return async (dispatch) =>{
        try {
            dispatch({type: SET_TEACHER_LOADER});
            const {data} = await axiosInstance.post(`/teacher/reset-password/${token}`,state);
            dispatch({type: REMOVE_TEACHER_LOADER});
            dispatch({type: SET_TEACHER_MESSAGE, payload: data.msg});
        } catch (error) {
            dispatch({type: REMOVE_TEACHER_LOADER});
            dispatch({type: SET_TEACHER_ERRORS, payload: error.response.data.errors});
        }
    }
}

export const verifyAccount = (token) =>{
    return async(dispatch,getState)=>{
        // const {AuthReducer: {token}} = getState();
        dispatch({type: SET_TEACHER_LOADER});
        try {
                const { data:{msg} } = await axiosInstance.post(`/teacher/verify-account/${token}`); 
                dispatch({type: REMOVE_TEACHER_LOADER});
                dispatch({type: SET_TEACHER_MESSAGE, payload:msg});   
          } catch (error) {
                const {errors} = error.response.data;
                dispatch({type: REMOVE_TEACHER_LOADER});
                dispatch({type: SET_TEACHER_ERRORS, payload:errors});
          }
    }
}