import jwt_decode from 'jwt-decode';
import { CHAIRMAN_LOGOUT, REMOVE_CHAIRMAN_ERRORS, REMOVE_CHAIRMAN_LOADER, REMOVE_CHAIRMAN_MESSAGE, REMOVE_UNAUTHORIZED_ACCESS, SET_CHAIRMAN_ERRORS, SET_CHAIRMAN_LOADER, SET_CHAIRMAN_MESSAGE, SET_CHAIRMAN_TOKEN } from '../types/ChairmanType';


const initState = {
    loading: false,
	chairmanErrors: [],
	token: '',
	chairman: '',
	message:'',
}
console.log("Chairman Reducer")
const verifyToken = (token) => {
	const decodeToken = jwt_decode(token);
	const expiresIn = new Date(decodeToken.exp * 1000);
	if (new Date() > expiresIn) {
		localStorage.removeItem('chairmanToken');
		return null;
	} else {
		return decodeToken;
	}
};
const token = localStorage.getItem('chairmanToken');
if (token) {
	const decoded = verifyToken(token);
	if (decoded) {
		initState.token = token;
		const { chairman } = decoded;
		initState.chairman = chairman;
	}
}

const ChairmanReducer = (state = initState, action) => {
    if (action.type === SET_CHAIRMAN_LOADER) {
		return { ...state, loading: true };
	} else if (action.type === REMOVE_CHAIRMAN_LOADER) {
		return { ...state, loading: false };
	} else if (action.type === SET_CHAIRMAN_TOKEN) {
		const decoded = verifyToken(action.payload);
		const { chairman } = decoded;
		return {
			...state,
			token: action.payload,
			chairman: chairman,
			chairmanErrors: []
		};
	} 
	else if (action.type === CHAIRMAN_LOGOUT) {
		return { ...state, token: '', chairman: '' };
	} 
	else if (action.type === SET_CHAIRMAN_ERRORS) {
		return {...state,chairmanErrors: action.payload};
	} 
	else if (action.type === REMOVE_CHAIRMAN_ERRORS) {
		return {...state,chairmanErrors: []};
	}
	else if (action.type === SET_CHAIRMAN_MESSAGE) {
		return {...state,message: action.payload};
	}
	else if (action.type === REMOVE_CHAIRMAN_MESSAGE) {
		return {...state,message: ''};
	}
	else {
		return state;
	}
}

export default ChairmanReducer;