import axiosInstance from '../../helper/axiosInstance';
import { REMOVE_CHAIRMAN_LOADER, SET_CHAIRMAN_ERRORS, SET_CHAIRMAN_LOADER, SET_CHAIRMAN_MESSAGE, SET_CHAIRMAN_TOKEN } from '../types/ChairmanType';

export const ChairmanRegister = (state) =>{
    return async(dispatch)=>{
        try {
            dispatch({type: SET_CHAIRMAN_LOADER});
            const {data} = await axiosInstance.post('/chairman/register',state);
            dispatch({type: REMOVE_CHAIRMAN_LOADER});
            dispatch({type: SET_CHAIRMAN_MESSAGE, payload: data.msg});
            console.log(data.msg)
        } catch (error) {
            const {errors} = error.response.data;
            dispatch({type: REMOVE_CHAIRMAN_LOADER});
            dispatch({type: SET_CHAIRMAN_ERRORS, payload:errors});
        }
    }
}

export const ChairmanLogin = (state) =>{
    return async (dispatch) =>{
        try {
            dispatch({type: SET_CHAIRMAN_LOADER});
            const {data} = await axiosInstance.post('/login',state);
            dispatch({type: REMOVE_CHAIRMAN_LOADER});
            localStorage.setItem("myToken", data.token);
            dispatch({type: SET_CHAIRMAN_TOKEN, payload: data.token});
        } catch (error) {
            const {errors} = error.response.data;
            dispatch({type: REMOVE_CHAIRMAN_LOADER});
            dispatch({type: SET_CHAIRMAN_ERRORS, payload:errors});
        }
    }
}

export const forgotPassword = (state) =>{
    return async (dispatch) =>{
        try {
            dispatch({type: SET_CHAIRMAN_LOADER});
            const {data} = await axiosInstance.post('/forgot-password',state);
            dispatch({type: REMOVE_CHAIRMAN_LOADER});
            dispatch({type: SET_CHAIRMAN_MESSAGE, payload: data.msg});
        } catch (error) {
            dispatch({type: REMOVE_CHAIRMAN_LOADER});
            dispatch({type: SET_CHAIRMAN_ERRORS, payload: error.response.data.errors});
        }
    }
}

export const resetPassword = (state,token) =>{
    return async (dispatch) =>{
        try {
            dispatch({type: SET_CHAIRMAN_LOADER});
            const {data} = await axiosInstance.post(`/reset-password/${token}`,state);
            dispatch({type: REMOVE_CHAIRMAN_LOADER});
            dispatch({type: SET_CHAIRMAN_MESSAGE, payload: data.msg});
        } catch (error) {
            dispatch({type: REMOVE_CHAIRMAN_LOADER});
            dispatch({type: SET_CHAIRMAN_ERRORS, payload: error.response.data.errors});
        }
    }
}