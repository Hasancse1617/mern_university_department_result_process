import jwt_decode from 'jwt-decode';
import { EXAM_STATUS, SET_EXAMS, EXAM_LOGOUT, REMOVE_EXAM_ERRORS, REMOVE_EXAM_LOADER, REMOVE_EXAM_MESSAGE, SET_EXAM_ERRORS, SET_EXAM_LOADER, SET_EXAM_MESSAGE, SET_EXAM_TOKEN, SET_EXAM_STUDENTS } from '../types/ExamType';


const initState = {
    loading: false,
	examErrors: [],
	token: '',
	exams: [],
	exam: '',
	message:'',
	examStudents: [],
	exam_status: false,
    examId: 0,
}

const verifyToken = (token) => {
	const decodeToken = jwt_decode(token);
	const expiresIn = new Date(decodeToken.exp * 1000);
	if (new Date() > expiresIn) {
		localStorage.removeItem('examToken');
		return null;
	} else {
		return decodeToken;
	}
};
const token = localStorage.getItem('examToken');
if (token) {
	const decoded = verifyToken(token);
	if (decoded) {
		initState.token = token;
		const { exam } = decoded;
		initState.exam = exam;
	}
}

const ExamReducer = (state = initState, action) => {
    if (action.type === SET_EXAM_LOADER) {
		return { ...state, loading: true };
	} else if (action.type === REMOVE_EXAM_LOADER) {
		return { ...state, loading: false };
	} else if (action.type === SET_EXAM_TOKEN) {
		const decoded = verifyToken(action.payload);
		const { exam } = decoded;
		return {
			...state,
			token: action.payload,
			exam: exam,
			examErrors: []
		};
	} 
	else if (action.type === EXAM_LOGOUT) {
		return { ...state, token: '', exam: '' };
	} 
	else if (action.type === SET_EXAM_ERRORS) {
		return {...state,examErrors: action.payload};
	} 
	else if (action.type === REMOVE_EXAM_ERRORS) {
		return {...state,examErrors: []};
	}
	else if (action.type === SET_EXAM_MESSAGE) {
		return {...state,message: action.payload};
	}
	else if (action.type === REMOVE_EXAM_MESSAGE) {
		return {...state,message: ''};
	}
	else if (action.type === SET_EXAM_STUDENTS) {
		return {...state,examStudents: action.payload};
	}
	else if(action.type === SET_EXAMS){
        return{...state, exams: action.payload };
    }
	else if(action.type === EXAM_STATUS){
        return{...state, exam_status: action.payload.status, examId: action.payload.exam_id}
    }
	else {
		return state;
	}
}

export default ExamReducer;