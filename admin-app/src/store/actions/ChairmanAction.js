import axiosChairman from '../../helper/axiosChairman';
import { REMOVE_CHAIRMAN_LOADER, SET_DASH_INFO, SET_CHAIRMAN_ERRORS, SET_CHAIRMAN_LOADER, SET_CHAIRMAN_MESSAGE, SET_CHAIRMAN_TOKEN, SET_DEPT } from '../types/ChairmanType';

export const RegisterChairman = (state) =>{
    return async(dispatch)=>{
        try {
            dispatch({type: SET_CHAIRMAN_LOADER});
            const {data} = await axiosChairman.post('/chairman/register',state);
            dispatch({type: REMOVE_CHAIRMAN_LOADER});
            dispatch({type: SET_CHAIRMAN_MESSAGE, payload: data.msg});
            console.log(data.msg)
        } catch (error) {
            if(error && error.response.data){
                const {errors} = error.response.data;
                dispatch({type: SET_CHAIRMAN_ERRORS, payload:errors});
            }
            dispatch({type: REMOVE_CHAIRMAN_LOADER});
        }
    }
}

export const LoginChairman = (state) =>{
    return async (dispatch) =>{
        try {
            dispatch({type: SET_CHAIRMAN_LOADER});
            const {data} = await axiosChairman.post('/chairman/login',state);
            dispatch({type: REMOVE_CHAIRMAN_LOADER});
            localStorage.setItem("chairmanToken", data.token);
            dispatch({type: SET_CHAIRMAN_TOKEN, payload: data.token});
        } catch (error) {
            if(error && error.response.data){
                const {errors} = error.response.data;
                dispatch({type: SET_CHAIRMAN_ERRORS, payload:errors});
            }
            dispatch({type: REMOVE_CHAIRMAN_LOADER});
        }
    }
}

export const forgotPassword = (state) =>{
    return async (dispatch) =>{
        try {
            dispatch({type: SET_CHAIRMAN_LOADER});
            const {data} = await axiosChairman.post('/chairman/forgot-password',state);
            dispatch({type: REMOVE_CHAIRMAN_LOADER});
            dispatch({type: SET_CHAIRMAN_MESSAGE, payload: data.msg});
        } catch (error) {
            if(error && error.response.data){
                const {errors} = error.response.data;
                dispatch({type: SET_CHAIRMAN_ERRORS, payload:errors});
            }
            dispatch({type: REMOVE_CHAIRMAN_LOADER});
        }
    }
}

export const resetPassword = (state,token) =>{
    return async (dispatch) =>{
        try {
            dispatch({type: SET_CHAIRMAN_LOADER});
            const {data} = await axiosChairman.post(`/chairman/reset-password/${token}`,state);
            dispatch({type: REMOVE_CHAIRMAN_LOADER});
            dispatch({type: SET_CHAIRMAN_MESSAGE, payload: data.msg});
        } catch (error) {
            if(error && error.response.data){
                const {errors} = error.response.data;
                dispatch({type: SET_CHAIRMAN_ERRORS, payload:errors});
            }
            dispatch({type: REMOVE_CHAIRMAN_LOADER});
        }
    }
}

export const verifyAccount = (token) =>{
    return async(dispatch,getState)=>{
        // const {AuthReducer: {token}} = getState();
        dispatch({type: SET_CHAIRMAN_LOADER});
        try {
                const { data:{msg} } = await axiosChairman.post(`/chairman/verify-account/${token}`); 
                dispatch({type: REMOVE_CHAIRMAN_LOADER});
                dispatch({type: SET_CHAIRMAN_MESSAGE, payload:msg});   
          } catch (error) {
                if(error && error.response.data){
                    const {errors} = error.response.data;
                    dispatch({type: SET_CHAIRMAN_ERRORS, payload:errors});
                }
                dispatch({type: REMOVE_CHAIRMAN_LOADER});
          }
    }
}

export const fetchDashInfo = (dept_id) =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_CHAIRMAN_LOADER});
          try {
                const {data: { response }} = await axiosChairman.get(`/chairman/dash-info/${dept_id}`);
                dispatch({type: SET_DASH_INFO, payload: response});
                dispatch({type: REMOVE_CHAIRMAN_LOADER});
          } catch (error) {
                if(error && error.response.data){
                    const {errors} = error.response.data;
                    dispatch({type: SET_CHAIRMAN_ERRORS, payload:errors});
                }
                dispatch({type: REMOVE_CHAIRMAN_LOADER});
          }
    }
}

export const resignAction = (id) =>{
    return async (dispatch, getState)=>{
            try {
            const {data} = await axiosChairman.post(`/chairman/resign/${id}`);
            console.log(data.msg)
            dispatch({type: SET_CHAIRMAN_MESSAGE, payload: data.msg});    
        } catch (error) {
            if(error && error.response.data){
                const {errors} = error.response.data;
                dispatch({type: SET_CHAIRMAN_ERRORS, payload:errors});
            }
            dispatch({type: REMOVE_CHAIRMAN_LOADER});
        }
      
    };
}