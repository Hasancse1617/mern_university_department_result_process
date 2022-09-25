import { TEACHER_STATUS, REMOVE_STUDENT_ERRORS, SET_RECENT_STUDENTS, REMOVE_STUDENT_LOADER, SET_STUDENTS, SET_STUDENT_ERRORS, SET_STUDENT_LOADER, SET_STUDENT_MESSAGE, SET_SINGLE_STUDENT, SET_TEACHERS } from "../types/StudentType";
import axiosChairman from "../../helper/axiosChairman";

export const fetchSessionStudent = (session, dept_id) =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_STUDENT_LOADER});
          try {
                const {data: { response }} = await axiosChairman.get(`/student/session-student/${dept_id}?session=${session}`);
                dispatch({type: SET_STUDENTS, payload: response});
                dispatch({type: REMOVE_STUDENT_LOADER});
          } catch (error) {
                dispatch({type: REMOVE_STUDENT_LOADER});
                if(error && error.response.data){
                  const {errors} = error.response.data;
                  dispatch({type: SET_STUDENT_ERRORS, payload:errors});
                } 
          }
    }
}

export const fetchRecentStudent = (dept_id) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_STUDENT_LOADER});
            try {
                  const {data: { response }} = await axiosChairman.get(`/student/recently-added/${dept_id}`);
                  
                  dispatch({type: SET_RECENT_STUDENTS, payload: response});
                  dispatch({type: REMOVE_STUDENT_LOADER});
            } catch (error) {
                  dispatch({type: REMOVE_STUDENT_LOADER});
                  if(error && error.response.data){
                       const {errors} = error.response.data;
                       dispatch({type: SET_STUDENT_ERRORS, payload:errors});
                  } 
            }
      }
}

export const fetchTeachers = (dept_id) =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_STUDENT_LOADER});
            try {
                  const {data: { response }} = await axiosChairman.get(`/chairman/all-teacher/${dept_id}`);
                  
                  dispatch({type: SET_TEACHERS, payload: response});
                  dispatch({type: REMOVE_STUDENT_LOADER});
            } catch (error) {
                  dispatch({type: REMOVE_STUDENT_LOADER});
                  if(error && error.response.data){
                       const {errors} = error.response.data;
                       dispatch({type: SET_STUDENT_ERRORS, payload:errors});
                  } 
            }
      }
}

export const createAction = (studentData) =>{
    return async(dispatch,getState)=>{
        // const {AuthReducer: {token}} = getState();
        dispatch({type: SET_STUDENT_LOADER});
        try {
                const { data:{msg} } = await axiosChairman.post(`/student/add`,studentData); 
                dispatch({type: REMOVE_STUDENT_LOADER});
                dispatch({type: SET_STUDENT_MESSAGE, payload:msg});  
          } catch (error) {
                dispatch({type: REMOVE_STUDENT_LOADER});
                if(error && error.response.data){
                  const {errors} = error.response.data;
                  dispatch({type: SET_STUDENT_ERRORS, payload:errors});
                } 
          }
    }
}

export const deleteAction = (id) =>{
    return async (dispatch, getState)=>{
            try {
            const {data} = await axiosChairman.post(`/student/delete/${id}`);
            dispatch({type:SET_STUDENT_LOADER});
            dispatch({type:REMOVE_STUDENT_ERRORS});
            dispatch({type:SET_STUDENT_MESSAGE, payload: data.msg});    
        } catch (error) {
            if(error && error.response.data){
               const {errors} = error.response.data;
               dispatch({type: SET_STUDENT_ERRORS, payload:errors});
            } 
        }
      
    };
}

export const fetchStudent = (id) =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_STUDENT_LOADER});
          try {
                const { data } = await axiosChairman.get(`/student/edit/${id}`);
                dispatch({type:SET_SINGLE_STUDENT, payload: data.response});
                dispatch({type: REMOVE_STUDENT_LOADER});
          } catch (error) {
               if(error && error.response.data){
                  const {errors} = error.response.data;
               }
               dispatch({type: REMOVE_STUDENT_LOADER});
          }
    }
}

export const updateAction = (studentData,id) =>{
      return async(dispatch,getState)=>{
          // const {AuthReducer: {token}} = getState();
          dispatch({type: SET_STUDENT_LOADER});
          try {
                  const { data:{msg} } = await axiosChairman.post(`/student/update/${id}`,studentData); 
                  dispatch({type: REMOVE_STUDENT_LOADER});
                  dispatch({type: SET_STUDENT_MESSAGE, payload:msg});
            } catch (error) {
                  dispatch({type: REMOVE_STUDENT_LOADER});
                  if(error && error.response.data){
                        const {errors} = error.response.data;
                        dispatch({type: SET_STUDENT_ERRORS, payload:errors});
                  } 
            }
      }
}

export const statusAction = (statusData) =>{
      return async(dispatch,getState)=>{
            try {
                  const {data: {status,teacher_id}} = await axiosChairman.post(`/status-teacher`, statusData);
                  dispatch({type: TEACHER_STATUS, payload: {status,teacher_id}});
            } catch (error) {
                  if(error && error.response.data){
                        const {errors} = error.response.data;
                        dispatch({type: SET_STUDENT_ERRORS, payload:errors});
                   } 
            }
      }
  }

  export const deleteTeacher = (id) =>{
      return async (dispatch, getState)=>{
            try {
                  dispatch({type:SET_STUDENT_LOADER});
                  const {data} = await axiosChairman.post(`/teacher-delete/${id}`);
                  dispatch({type:REMOVE_STUDENT_LOADER});
                  dispatch({type:SET_STUDENT_MESSAGE, payload: data.msg});    
          } catch (error) {
              if(error){
                  if(error && error.response.data){
                        const {errors} = error.response.data;
                        dispatch({type: SET_STUDENT_ERRORS, payload:errors});
                  } 
              } 
          }
      }
  }
