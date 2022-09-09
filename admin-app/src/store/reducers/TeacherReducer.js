import jwt_decode from 'jwt-decode';
import { TEACHER_LOGOUT, REMOVE_TEACHER_ERRORS, REMOVE_TEACHER_LOADER, REMOVE_TEACHER_MESSAGE, SET_TEACHER_ERRORS, SET_TEACHER_LOADER, SET_TEACHER_MESSAGE, SET_TEACHER_TOKEN } from '../types/TeacherType';


const initState = {
    loading: false,
	teacherErrors: [],
	token: '',
	teacher: '',
	message:'',
}

const verifyToken = (token) => {
	const decodeToken = jwt_decode(token);
	const expiresIn = new Date(decodeToken.exp * 1000);
	if (new Date() > expiresIn) {
		localStorage.removeItem('teacherToken');
		return null;
	} else {
		return decodeToken;
	}
};
const token = localStorage.getItem('teacherToken');
if (token) {
	const decoded = verifyToken(token);
	if (decoded) {
		initState.token = token;
		const { teacher } = decoded;
		initState.teacher = teacher;
	}
}

const TeacherReducer = (state = initState, action) => {
    if (action.type === SET_TEACHER_LOADER) {
		return { ...state, loading: true };
	} else if (action.type === REMOVE_TEACHER_LOADER) {
		return { ...state, loading: false };
	} else if (action.type === SET_TEACHER_TOKEN) {
		const decoded = verifyToken(action.payload);
		const { teacher } = decoded;
		return {
			...state,
			token: action.payload,
			teacher: teacher,
			teacherErrors: []
		};
	} 
	else if (action.type === TEACHER_LOGOUT) {
		return { ...state, token: '', teacher: '' };
	} 
	else if (action.type === SET_TEACHER_ERRORS) {
		return {...state,teacherErrors: action.payload};
	} 
	else if (action.type === REMOVE_TEACHER_ERRORS) {
		return {...state,teacherErrors: []};
	}
	else if (action.type === SET_TEACHER_MESSAGE) {
		return {...state,message: action.payload};
	}
	else if (action.type === REMOVE_TEACHER_MESSAGE) {
		return {...state,message: ''};
	}
	else {
		return state;
	}
}

export default TeacherReducer;