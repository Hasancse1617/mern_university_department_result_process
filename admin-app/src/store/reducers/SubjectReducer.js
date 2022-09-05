import { REMOVE_SINGLE_SUBJECT, REMOVE_SUBJECT_ERRORS, REMOVE_SUBJECT_LOADER, REMOVE_SUBJECT_MESSAGE, SET_SINGLE_SUBJECT, SET_SUBJECTS, SET_SUBJECT_ERRORS, SET_SUBJECT_LOADER, SET_SUBJECT_MESSAGE } from "../types/SubjectType";

const initState = {
    loading: false,
    subjectErrors: [],
    message: '',
    subjects: [],
    subject: [],
    status: false,
}

const SubjectReducer = (state=initState, action) =>{
    if(action.type === SET_SUBJECT_LOADER){
        return{...state, loading: true };
    }
    else if(action.type === REMOVE_SUBJECT_LOADER){
        return{...state, loading: false };
    }
    else if(action.type === SET_SUBJECT_MESSAGE){
        return{...state, message: action.payload };
    }
    else if(action.type === REMOVE_SUBJECT_MESSAGE){
        return{...state, message: '' };
    }
    else if(action.type === SET_SUBJECT_ERRORS){
        return{...state, subjectErrors: action.payload  };
    }
    else if(action.type === REMOVE_SUBJECT_ERRORS){
        return{...state, subjectErrors: [] };
    }
    else if(action.type === SET_SUBJECTS){
        return{...state, subjects: action.payload };
    }
    else if(action.type === SET_SINGLE_SUBJECT){
        return{...state, subject: action.payload, status: true };
    }
    else if(action.type === REMOVE_SINGLE_SUBJECT){
        return{...state, subject: [], status: false };
    }
    else{
        return state;
    }
}
export default SubjectReducer;