import axiosExam from "../../helper/axiosExam";
import axiosTeacher from "../../helper/axiosTeacher";
import { REMOVE_MARK_LOADER, SET_MARK_SUBJECTS, SET_MARKS, SET_MARK_ERRORS, SET_MARK_LOADER } from "../types/MarkType";

//Exam Section
export const fetchStudentMark = (subject_id) =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_MARK_LOADER});
          try {
                const {data: { response }} = await axiosExam.get(`/subject-student/all/${subject_id}`);
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
//Teacher Section Mark Add
export const fetchMarkSubjects = (exam_id) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_MARK_LOADER});
            try {
                  const {data: { response }} = await axiosTeacher.get(`/mark-subjects/all/${exam_id}`);
                  dispatch({type: SET_MARK_SUBJECTS, payload: response});
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