import axiosExam from "../../helper/axiosExam";
import { REMOVE_RESULT_LOADER, SET_RESULT_ERRORS, SET_RESULT_LOADER, SET_RESULT_SINGLE, SET_RESULT_SUBJECTS } from "../types/ResultType";

export const fetchExamSubjects = (exam_id) =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_RESULT_LOADER});
          try {
                const {data: { response }} = await axiosExam.get(`/exam/result-subjects/${exam_id}`);
                
                dispatch({type: SET_RESULT_SUBJECTS, payload: response});
                dispatch({type: REMOVE_RESULT_LOADER});
          } catch (error) {
                dispatch({type: REMOVE_RESULT_LOADER});
                if(error && error.response.data){
                     const {errors} = error.response.data;
                     dispatch({type: SET_RESULT_ERRORS, payload:errors});
                } 
          }
    }
}

export const fetchSingleSubjectResult = (exam_id, subject_id) =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_RESULT_LOADER});
          try {
                const {data: { response }} = await axiosExam.get(`/exam/result-single-subject/${exam_id}/${subject_id}`);
                
                dispatch({type: SET_RESULT_SINGLE, payload: response});
                dispatch({type: REMOVE_RESULT_LOADER});
          } catch (error) {
                dispatch({type: REMOVE_RESULT_LOADER});
                if(error && error.response.data){
                     const {errors} = error.response.data;
                     dispatch({type: SET_RESULT_ERRORS, payload:errors});
                } 
          }
    }
}