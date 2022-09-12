import axiosTeacher from "../../helper/axiosTeacher";
import { REMOVE_MARK_LOADER, SET_MARK_SUBJECTS, SET_MARK_ERRORS, SET_MARK_LOADER, SET_MARK_STUDENTS, SET_MARK_MESSAGE } from "../types/MarkType";

//Teacher Section Mark Add
export const fetchMarkStudents = (dept_id,session,subject_id,teacher_id,examinar_type,exam_id) =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_MARK_LOADER});
          try {
                const {data: { response, check_entry }} = await axiosTeacher.get(`/mark-students/all/${dept_id}/${session}/${subject_id}/${teacher_id}/${examinar_type}/${exam_id}`);
                dispatch({type: SET_MARK_STUDENTS, payload: { response, check_entry }});
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

  export const addedMarkAction = (studentData) =>{
      return async(dispatch,getState)=>{
          // const {AuthReducer: {token}} = getState();
          dispatch({type: SET_MARK_LOADER});
          try {
                  const { data:{msg} } = await axiosTeacher.post(`/mark/add`,studentData); 
                  dispatch({type: REMOVE_MARK_LOADER});
                  dispatch({type: SET_MARK_MESSAGE, payload:msg});  
            } catch (error) {
                  dispatch({type: REMOVE_MARK_LOADER});
                  if(error && error.response.data){
                    const {errors} = error.response.data;
                    dispatch({type: SET_MARK_ERRORS, payload:errors});
                  } 
            }
      }
  }