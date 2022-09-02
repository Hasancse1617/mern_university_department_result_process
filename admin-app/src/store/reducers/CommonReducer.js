import { REMOVE_COMMON_ERRORS, REMOVE_COMMON_LOADER, REMOVE_COMMON_MESSAGE, SET_COMMON_ERRORS, SET_COMMON_LOADER, SET_COMMON_MESSAGE, SET_DEPT } from '../types/CommonType';


const initState = {
    loading: false,
	commonErrors: [],
	message:'',
	departments:''
}

const CommonReducer = (state = initState, action) => {
    if (action.type === SET_COMMON_LOADER) {
		return { ...state, loading: true };
	} else if (action.type === REMOVE_COMMON_LOADER) {
		return { ...state, loading: false };
	}
	else if (action.type === SET_COMMON_ERRORS) {
		return {...state,chairmanErrors: action.payload};
	} 
	else if (action.type === REMOVE_COMMON_ERRORS) {
		return {...state,chairmanErrors: []};
	}
	else if (action.type === SET_COMMON_MESSAGE) {
		return {...state,message: action.payload};
	}
	else if (action.type === REMOVE_COMMON_MESSAGE) {
		return {...state,message: ''};
	}
	else if (action.type === SET_DEPT) {
		return {...state,departments: action.payload};
	}
	else {
		return state;
	}
}

export default CommonReducer;