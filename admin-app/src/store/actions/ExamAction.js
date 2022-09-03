import axiosInstance from "../../helper/axiosInstance";
import axiosExam from "../../helper/axiosExam";
import { EXAM_STATUS, REMOVE_EXAM_LOADER, SET_EXAMS, SET_EXAM_ERRORS, SET_EXAM_LOADER, SET_EXAM_MESSAGE, SET_EXAM_TOKEN } from '../types/ExamType';

export const RegisterExam = (state) =>{
    return async(dispatch)=>{
        try {
            dispatch({type: SET_EXAM_LOADER});
            const {data} = await axiosExam.post('/exam/register',state);
            dispatch({type: REMOVE_EXAM_LOADER});
            dispatch({type: SET_EXAM_MESSAGE, payload: data.msg});
        } catch (error) {
            dispatch({type: REMOVE_EXAM_LOADER});
            if(error && error.response.data){
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
            const {data} = await axiosExam.post('/exam/login',state);
            dispatch({type: REMOVE_EXAM_LOADER});
            localStorage.setItem("examToken", data.token);
            dispatch({type: SET_EXAM_TOKEN, payload: data.token});
        } catch (error) {
            dispatch({type: REMOVE_EXAM_LOADER});
            if(error && error.response.data){
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
            const {data} = await axiosExam.post('/exam/forgot-password',state);
            dispatch({type: REMOVE_EXAM_LOADER});
            dispatch({type: SET_EXAM_MESSAGE, payload: data.msg});
        } catch (error) {
            dispatch({type: REMOVE_EXAM_LOADER});
            if(error && error.response.data){
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
            const {data} = await axiosExam.post(`/exam/reset-password/${token}`,state);
            dispatch({type: REMOVE_EXAM_LOADER});
            dispatch({type: SET_EXAM_MESSAGE, payload: data.msg});
        } catch (error) {
            dispatch({type: REMOVE_EXAM_LOADER});
            if(error && error.response.data){
                const {errors} = error.response.data;
                dispatch({type: SET_EXAM_ERRORS, payload:errors});
            }
        }
    }
}
// Start Control Dept chairman
export const fetchExams = (dept_id) =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_EXAM_LOADER});
          try {
                const {data: { response }} = await axiosInstance.get(`/exam/all-exam/${dept_id}`);
                
                dispatch({type: SET_EXAMS, payload: response});
                dispatch({type: REMOVE_EXAM_LOADER});
          } catch (error) {
                dispatch({type: REMOVE_EXAM_LOADER});
                if(error && error.response.data){
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
                if(error && error.response.data){
                    const {errors} = error.response.data;
                    dispatch({type: SET_EXAM_ERRORS, payload:errors});
                }
          }
    }
}

export const deleteExam = (id) =>{
    return async (dispatch, getState)=>{
          try {
                dispatch({type: SET_EXAM_LOADER});
                const {data} = await axiosInstance.post(`/delete-exam/${id}`);
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
// End Control Dept chairman