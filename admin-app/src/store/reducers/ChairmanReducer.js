import jwt_decode from 'jwt-decode';
import { CHAIRMAN_LOGOUT, REMOVE_CHAIRMAN_ERRORS, REMOVE_CHAIRMAN_LOADER, REMOVE_CHAIRMAN_MESSAGE, REMOVE_UNAUTHORIZED_ACCESS, SET_CHAIRMAN_ERRORS, SET_CHAIRMAN_LOADER, SET_CHAIRMAN_MESSAGE, SET_CHAIRMAN_TOKEN } from '../types/ChairmanType';


const initState = {
    loading: false,
	loginErrors: [],
	token: '',
	user: '',
	message:'',
	unauthorized:'',
}

const verifyToken = (token) => {
	const decodeToken = jwt_decode(token);
	const expiresIn = new Date(decodeToken.exp * 1000);
	if (new Date() > expiresIn) {
		localStorage.removeItem('myToken');
		return null;
	} else {
		return decodeToken;
	}
};
const token = localStorage.getItem('myToken');
if (token) {
	const decoded = verifyToken(token);
	if (decoded) {
		initState.token = token;
		const { user } = decoded;
		initState.user = user;
	}
}

const AuthReducer = (state = initState, action) => {
    if (action.type === SET_CHAIRMAN_LOADER) {
		return { ...state, loading: true };
	} else if (action.type === REMOVE_CHAIRMAN_LOADER) {
		return { ...state, loading: false };
	} else if (action.type === SET_CHAIRMAN_TOKEN) {
		const decoded = verifyToken(action.payload);
		const { user } = decoded;
		return {
			...state,
			token: action.payload,
			user: user,
			loginErrors: [],
			registerErrors: [],
		};
	} 
	else if (action.type === CHAIRMAN_LOGOUT) {
		return { ...state, token: '', user: '' };
	} 
	else if (action.type === SET_CHAIRMAN_ERRORS) {
		return {...state,loginErrors: action.payload};
	} 
	else if (action.type === REMOVE_CHAIRMAN_ERRORS) {
		return {...state,loginErrors: []};
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

export default AuthReducer;