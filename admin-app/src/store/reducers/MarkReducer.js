import { REMOVE_MARK_LOADER, REMOVE_MARK_ERRORS, REMOVE_MARK_MESSAGE, SET_MARKS, SET_MARK_ERRORS, SET_MARK_LOADER, SET_MARK_MESSAGE, SET_MARK_SUBJECTS, SET_MARK_STUDENTS, REMOVE_MARK_STUDENTS } from "../types/MarkType";

const initState = {
    loading: false,
    markErrors: [],
    message: '',
    marks: [],
    markStudents:[],
    markSubjects:[],
    mark: [],
    status: false,
}

const MarkReducer = (state=initState, action) =>{
    if(action.type === SET_MARK_LOADER){
        return{...state, loading: true };
    }
    else if(action.type === REMOVE_MARK_LOADER){
        return{...state, loading: false };
    }
    else if(action.type === SET_MARK_MESSAGE){
        return{...state, message: action.payload };
    }
    else if(action.type === REMOVE_MARK_MESSAGE){
        return{...state, message: '' };
    }
    else if(action.type === SET_MARK_ERRORS){
        return{...state, markErrors: action.payload  };
    }
    else if(action.type === REMOVE_MARK_ERRORS){
        return{...state, markErrors: [] };
    }
    else if(action.type === SET_MARK_SUBJECTS){
        return{...state, markSubjects: action.payload };
    }
    else if(action.type === SET_MARK_STUDENTS){
        return{...state, markStudents: action.payload };
    }
    else if(action.type === REMOVE_MARK_STUDENTS){
        return{...state, markStudents: [] };
    }
    else if(action.type === SET_MARKS){
        return{...state, marks: action.payload };
    }
    else{
        return state;
    }
}
export default MarkReducer;