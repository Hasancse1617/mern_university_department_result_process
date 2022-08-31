import { REMOVE_SINGLE_STUDENT, SET_RECENT_STUDENTS, REMOVE_STUDENT_ERRORS, REMOVE_STUDENT_LOADER, REMOVE_STUDENT_MESSAGE, SET_SINGLE_STUDENT, SET_STUDENTS, SET_STUDENT_ERRORS, SET_STUDENT_LOADER, SET_STUDENT_MESSAGE, SET_TEACHERS, TEACHER_STATUS } from "../types/StudentType";

const initState = {
    loading: false,
    studentErrors: [],
    message: '',
    students: [],
    teachers: [],
    recentStudents: [],
    student: [],
    status: false,
    teacher_status: false,
    teacherId: 0,
}

const StudentReducer = (state=initState, action) =>{
    if(action.type === SET_STUDENT_LOADER){
        return{...state, loading: true };
    }
    else if(action.type === REMOVE_STUDENT_LOADER){
        return{...state, loading: false };
    }
    else if(action.type === SET_STUDENT_MESSAGE){
        return{...state, message: action.payload };
    }
    else if(action.type === REMOVE_STUDENT_MESSAGE){
        return{...state, message: '' };
    }
    else if(action.type === SET_STUDENT_ERRORS){
        return{...state, studentErrors: action.payload  };
    }
    else if(action.type === REMOVE_STUDENT_ERRORS){
        return{...state, studentErrors: [] };
    }
    else if(action.type === SET_STUDENTS){
        return{...state, students: action.payload };
    }
    else if(action.type === SET_TEACHERS){
        return{...state, teachers: action.payload };
    }
    else if(action.type === SET_RECENT_STUDENTS){
        return{...state, recentStudents: action.payload };
    }
    else if(action.type === SET_SINGLE_STUDENT){
        return{...state, student: action.payload, status: true };
    }
    else if(action.type === REMOVE_SINGLE_STUDENT){
        return{...state, student: [], status: false };
    }
    else if(action.type === TEACHER_STATUS){
        return{...state, teacher_status: action.payload.status, teacherId: action.payload.teacher_id}
    }
    else{
        return state;
    }
}
export default StudentReducer;