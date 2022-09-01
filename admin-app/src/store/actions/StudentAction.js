import { TEACHER_STATUS, REMOVE_STUDENT_ERRORS, SET_RECENT_STUDENTS, REMOVE_STUDENT_LOADER, SET_STUDENTS, SET_STUDENT_ERRORS, SET_STUDENT_LOADER, SET_STUDENT_MESSAGE, SET_SINGLE_STUDENT, SET_TEACHERS } from "../types/StudentType";
import axiosInstance from "../../helper/axiosInstance";

export const fetchSessionStudent = (session) =>{
    return async(dispatch,getState)=>{
          dispatch({type: SET_STUDENT_LOADER});
          try {
                const {data: { response }} = await axiosInstance.get(`/student/session-student?session=${session}`);
                dispatch({type: SET_STUDENTS, payload: response});
                dispatch({type: REMOVE_STUDENT_LOADER});
          } catch (error) {
                dispatch({type: REMOVE_STUDENT_LOADER});
                if(error){
                  const {errors} = error.response.data;
                  dispatch({type: SET_STUDENT_ERRORS, payload:errors});
                } 
          }
    }
}

export const fetchRecentStudent = () =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_STUDENT_LOADER});
            try {
                  const {data: { response }} = await axiosInstance.get(`/student/recently-added`);
                  
                  dispatch({type: SET_RECENT_STUDENTS, payload: response});
                  dispatch({type: REMOVE_STUDENT_LOADER});
            } catch (error) {
                  dispatch({type: REMOVE_STUDENT_LOADER});
                  if(error){
                       const {errors} = error.response.data;
                       dispatch({type: SET_STUDENT_ERRORS, payload:errors});
                  } 
            }
      }
}

export const fetchTeachers = () =>{
      return async(dispatch,getState)=>{
            dispatch({type: SET_STUDENT_LOADER});
            try {
                  const {data: { response }} = await axiosInstance.get(`/chairman/all-teacher`);
                  
                  dispatch({type: SET_TEACHERS, payload: response});
                  dispatch({type: REMOVE_STUDENT_LOADER});
            } catch (error) {
                  dispatch({type: REMOVE_STUDENT_LOADER});
                  if(error){
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
                const { data:{msg} } = await axiosInstance.post(`/student/add`,studentData); 
                dispatch({type: REMOVE_STUDENT_LOADER});
                dispatch({type: SET_STUDENT_MESSAGE, payload:msg});  
          } catch (error) {
                dispatch({type: REMOVE_STUDENT_LOADER});
                if(error){
                  const {errors} = error.response.data;
                  dispatch({type: SET_STUDENT_ERRORS, payload:errors});
                } 
          }
    }
}

export const deleteAction = (id) =>{
    return async (dispatch, getState)=>{
            try {
            const {data} = await axiosInstance.post(`/student/delete/${id}`);
            dispatch({type:SET_STUDENT_LOADER});
            dispatch({type:REMOVE_STUDENT_ERRORS});
            dispatch({type:SET_STUDENT_MESSAGE, payload: data.msg});    
        } catch (error) {
            if(error){
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
                const { data } = await axiosInstance.get(`/student/edit/${id}`);
                dispatch({type:SET_SINGLE_STUDENT, payload: data.response});
                dispatch({type: REMOVE_STUDENT_LOADER});
          } catch (error) {
               if(error){
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
                  const { data:{msg} } = await axiosInstance.post(`/student/update/${id}`,studentData); 
                  dispatch({type: REMOVE_STUDENT_LOADER});
                  dispatch({type: SET_STUDENT_MESSAGE, payload:msg});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: REMOVE_STUDENT_LOADER});
                  dispatch({type: SET_STUDENT_ERRORS, payload:errors});
            }
      }
}

export const statusAction = (statusData) =>{
      return async(dispatch,getState)=>{
            try {
                  const {data: {status,teacher_id}} = await axiosInstance.post(`/status-teacher`, statusData);
                  dispatch({type: TEACHER_STATUS, payload: {status,teacher_id}});
            } catch (error) {
                  const {errors} = error.response.data;
                  dispatch({type: SET_STUDENT_ERRORS, payload:errors});
            }
      }
  }

  export const deleteTeacher = (id) =>{
      return async (dispatch, getState)=>{
            try {
                  dispatch({type:SET_STUDENT_LOADER});
                  const {data} = await axiosInstance.post(`/teacher-delete/${id}`);
                  dispatch({type:REMOVE_STUDENT_LOADER});
                  dispatch({type:SET_STUDENT_MESSAGE, payload: data.msg});    
          } catch (error) {
              if(error){
                 const {errors} = error.response.data;
                 dispatch({type: SET_STUDENT_ERRORS, payload:errors});
              } 
          }
      }
  }
