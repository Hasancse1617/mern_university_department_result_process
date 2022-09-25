import axiosTeacher from '../../helper/axiosTeacher';
import { REMOVE_TEACHER_LOADER, SET_TEACHER_ERRORS, SET_TEACHER_LOADER, SET_TEACHER_MESSAGE, SET_TEACHER_TOKEN } from '../types/TeacherType';

export const RegisterTeacher = (state) =>{
    return async(dispatch)=>{
        try {
            dispatch({type: SET_TEACHER_LOADER});
            const {data} = await axiosTeacher.post('/teacher/register',state);
            dispatch({type: REMOVE_TEACHER_LOADER});
            dispatch({type: SET_TEACHER_MESSAGE, payload: data.msg});
            // console.log(data.msg)
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
            const {data} = await axiosTeacher.post('/teacher/login',state);
            dispatch({type: REMOVE_TEACHER_LOADER});
            localStorage.setItem("teacherToken", data.token);
            dispatch({type: SET_TEACHER_TOKEN, payload: data.token});
        } catch (error) {
            dispatch({type: REMOVE_TEACHER_LOADER});
            if(error && error.response.data){
                const {errors} = error.response.data;
                dispatch({type: SET_TEACHER_ERRORS, payload:errors});
            }
        }
    }
}

export const forgotPassword = (state) =>{
    return async (dispatch) =>{
        try {
            dispatch({type: SET_TEACHER_LOADER});
            const {data} = await axiosTeacher.post('/teacher/forgot-password',state);
            dispatch({type: REMOVE_TEACHER_LOADER});
            console.log(data)
            dispatch({type: SET_TEACHER_MESSAGE, payload: data.msg});
        } catch (error) {
            dispatch({type: REMOVE_TEACHER_LOADER});
            if(error && error.response.data){
                const {errors} = error.response.data;
                dispatch({type: SET_TEACHER_ERRORS, payload:errors});
            }
        }
    }
}

export const resetPassword = (state,token) =>{
    return async (dispatch) =>{
        try {
            dispatch({type: SET_TEACHER_LOADER});
            const {data} = await axiosTeacher.post(`/teacher/reset-password/${token}`,state);
            dispatch({type: REMOVE_TEACHER_LOADER});
            dispatch({type: SET_TEACHER_MESSAGE, payload: data.msg});
        } catch (error) {
            dispatch({type: REMOVE_TEACHER_LOADER});
            if(error && error.response.data){
                const {errors} = error.response.data;
                dispatch({type: SET_TEACHER_ERRORS, payload:errors});
            }
        }
    }
}

export const verifyAccount = (token) =>{
    return async(dispatch,getState)=>{
        // const {AuthReducer: {token}} = getState();
        dispatch({type: SET_TEACHER_LOADER});
        try {
                const { data:{msg} } = await axiosTeacher.post(`/teacher/verify-account/${token}`); 
                dispatch({type: REMOVE_TEACHER_LOADER});
                dispatch({type: SET_TEACHER_MESSAGE, payload:msg});   
          } catch (error) {
                dispatch({type: REMOVE_TEACHER_LOADER});
                if(error && error.response.data){
                    const {errors} = error.response.data;
                    dispatch({type: SET_TEACHER_ERRORS, payload:errors});
                }
          }
    }
}