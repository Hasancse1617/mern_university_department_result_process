import axiosExam from "../../helper/axiosExam";
import { REMOVE_MARK_LOADER, SET_MARKS, SET_MARK_ERRORS, SET_MARK_LOADER } from "../types/MarkType";

export const fetchStudentMark = (subject_id) =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_MARK_LOADER});
          try {
                const {data: { response }} = await axiosExam.get(`/subject/all/${subject_id}`);
                dispatch({type: SET_MARKS, payload: response});
                dispatch({type: REMOVE_MARK_LOADER});
          } catch (error) {
                dispatch({type: REMOVE_MARK_LOADER});
                if(error && error.response.data){
                  const {errors} = error.response.data;
                  dispatch({type: SET_MARK_ERRORS, payload:errors});
                } 
          }
    }
}