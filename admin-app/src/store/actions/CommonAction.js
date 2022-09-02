import axiosInstance from "../../helper/axiosInstance";
import { REMOVE_COMMON_LOADER, SET_COMMON_ERRORS, SET_COMMON_LOADER, SET_DEPT } from "../types/CommonType";

export const fetchDept = (id) =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_COMMON_LOADER});
          try {
                const { data } = await axiosInstance.get(`/all-dept`);
                dispatch({type: SET_DEPT, payload: data.response});
                dispatch({type: REMOVE_COMMON_LOADER});
          } catch (error) {
                if(error.response.data){
                    const {errors} = error.response.data;
                    dispatch({type: SET_COMMON_ERRORS, payload:errors});
                }
                dispatch({type: REMOVE_COMMON_LOADER});
          }
    }
}