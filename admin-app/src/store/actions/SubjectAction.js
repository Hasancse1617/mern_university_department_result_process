import { REMOVE_SUBJECT_ERRORS, REMOVE_SUBJECT_LOADER, SET_SUBJECTS, SET_SUBJECT_ERRORS, SET_SUBJECT_LOADER, SET_SUBJECT_MESSAGE, SET_SINGLE_SUBJECT, SET_SUBJECT_TEACHERS, SET_RECENT_SUBJECTS } from "../types/SubjectType";
import axiosExam from "../../helper/axiosExam";

export const fetchSubjects = (exam_id) =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_SUBJECT_LOADER});
          try {
                const {data: { response }} = await axiosExam.get(`/subject/all/${exam_id}`);
                dispatch({type: SET_SUBJECTS, payload: response});
                dispatch({type: REMOVE_SUBJECT_LOADER});
          } catch (error) {
                dispatch({type: REMOVE_SUBJECT_LOADER});
                if(error && error.response.data){
                  const {errors} = error.response.data;
                  dispatch({type: SET_SUBJECT_ERRORS, payload:errors});
                } 
          }
    }
}

export const createAction = (subjectData) =>{
    return async(dispatch,getState)=>{
        // const {AuthReducer: {token}} = getState();
        dispatch({type: SET_SUBJECT_LOADER});
        try {
                const { data:{msg} } = await axiosExam.post(`/subject/add`,subjectData); 
                dispatch({type: REMOVE_SUBJECT_LOADER});
                dispatch({type: SET_SUBJECT_MESSAGE, payload:msg});  
          } catch (error) {
                dispatch({type: REMOVE_SUBJECT_LOADER});
                if(error && error.response.data){
                  const {errors} = error.response.data;
                  dispatch({type: SET_SUBJECT_ERRORS, payload:errors});
                } 
          }
    }
}

export const deleteAction = (id) =>{
    return async (dispatch, getState)=>{
            try {
            const {data} = await axiosExam.post(`/subject/delete/${id}`);
            dispatch({type:SET_SUBJECT_LOADER});
            dispatch({type:REMOVE_SUBJECT_ERRORS});
            dispatch({type:SET_SUBJECT_MESSAGE, payload: data.msg});    
        } catch (error) {
            if(error && error.response.data){
               const {errors} = error.response.data;
               dispatch({type: SET_SUBJECT_ERRORS, payload:errors});
            } 
        }
      
    };
}

export const fetchSubject = (id) =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_SUBJECT_LOADER});
          try {
                const { data } = await axiosExam.get(`/subject/edit/${id}`);
                dispatch({type:SET_SINGLE_SUBJECT, payload: data.response});
                dispatch({type: REMOVE_SUBJECT_LOADER});
          } catch (error) {
               if(error && error.response.data){
                  const {errors} = error.response.data;
               }
               dispatch({type: REMOVE_SUBJECT_LOADER});
          }
    }
}

export const updateAction = (subjectData,id) =>{
      return async(dispatch,getState)=>{
          // const {AuthReducer: {token}} = getState();
          dispatch({type: SET_SUBJECT_LOADER});
          try {
                  const { data:{msg} } = await axiosExam.post(`/subject/update/${id}`,subjectData); 
                  dispatch({type: REMOVE_SUBJECT_LOADER});
                  dispatch({type: SET_SUBJECT_MESSAGE, payload:msg});
            } catch (error) {
                  dispatch({type: REMOVE_SUBJECT_LOADER});
                  if(error && error.response.data){
                        const {errors} = error.response.data;
                        dispatch({type: SET_SUBJECT_ERRORS, payload:errors});
                  } 
            }
      }
}

export const deptTeachers = (dept_id) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_SUBJECT_LOADER});
            try {
                  const {data: { response }} = await axiosExam.get(`/subject/teachers/${dept_id}`);
                  dispatch({type: SET_SUBJECT_TEACHERS, payload: response});
                  dispatch({type: REMOVE_SUBJECT_LOADER});
            } catch (error) {
                  dispatch({type: REMOVE_SUBJECT_LOADER});
                  if(error && error.response.data){
                    const {errors} = error.response.data;
                    dispatch({type: SET_SUBJECT_ERRORS, payload:errors});
                  } 
            }
      }
  }

  export const recentAddedSubjects = (exam_id) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_SUBJECT_LOADER});
            try {
                  const {data: { response }} = await axiosExam.get(`/subject/recent-subjects/${exam_id}`);
                  dispatch({type: SET_RECENT_SUBJECTS, payload: response});
                  dispatch({type: REMOVE_SUBJECT_LOADER});
            } catch (error) {
                  dispatch({type: REMOVE_SUBJECT_LOADER});
                  if(error && error.response.data){
                    const {errors} = error.response.data;
                    dispatch({type: SET_SUBJECT_ERRORS, payload:errors});
                  } 
            }
      }
  }