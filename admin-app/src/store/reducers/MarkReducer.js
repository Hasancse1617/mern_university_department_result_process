import { REMOVE_MARK_LOADER, REMOVE_MARK_ERRORS, REMOVE_MARK_MESSAGE, SET_MARKS, SET_MARK_ERRORS, SET_MARK_LOADER, SET_MARK_MESSAGE, SET_MARK_SUBJECTS, SET_MARK_STUDENTS, REMOVE_MARK_STUDENTS, SET_MARK_EDIT_STUDENTS, REMOVE_MARK_EDIT_STUDENTS, SET_MARK_LAB_VIVA_STUDENTS, REMOVE_MARK_LAB_VIVA_STUDENTS, SET_MARK_LAB_VIVA_EDIT_STUDENTS, REMOVE_MARK_LAB_VIVA_EDIT_STUDENTS } from "../types/MarkType";

const initState = {
    loading: false,
    markErrors: [],
    message: '',
    marks: [],
    markStudents:[],
    markLabVivaStudents:[],
    markLabVivaEditStudents:{},
    markEditStudents:{},
    markSubjects:[],
    markF_S_Students:{},
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
        return{...state, markStudents: action.payload.response, markF_S_Students: action.payload.check_entry};
    }
    else if(action.type === SET_MARK_EDIT_STUDENTS){
        return{...state, markEditStudents: action.payload}
    }
    else if(action.type === REMOVE_MARK_STUDENTS){
        return{...state, markStudents: [], markF_S_Students: {}};
    }
    else if(action.type === REMOVE_MARK_EDIT_STUDENTS){
        return{...state, markEditStudents: {}};
    }
    else if(action.type === SET_MARK_LAB_VIVA_STUDENTS){
        return{...state, markLabVivaStudents: action.payload};
    }
    else if(action.type === REMOVE_MARK_LAB_VIVA_STUDENTS){
        return{...state, markLabVivaStudents: []};
    }
    else if(action.type === SET_MARK_LAB_VIVA_EDIT_STUDENTS){
        return{...state, markLabVivaEditStudents: action.payload};
    }
    else if(action.type === REMOVE_MARK_LAB_VIVA_EDIT_STUDENTS){
        return{...state, markLabVivaEditStudents: {}};
    }
    else if(action.type === SET_MARKS){
        return{...state, marks: action.payload };
    }
    else{
        return state;
    }
}
export default MarkReducer;