import { SET_RESULT_SUBJECTS, REMOVE_RESULT_ERRORS, REMOVE_RESULT_LOADER, REMOVE_RESULT_MESSAGE, SET_RESULT_ERRORS, SET_RESULT_LOADER, SET_RESULT_MESSAGE, SET_RESULT_SINGLE, REMOVE_RESULT_SINGLE, SET_RESULTS } from '../types/ResultType';

const initState = {
    loading: false,
	resultErrors: [],
	message:"",
	resultSingle:{},
	results:[]
}

const ResultReducer = (state = initState, action) => {
    if (action.type === SET_RESULT_LOADER) {
		return { ...state, loading: true };
	} else if (action.type === REMOVE_RESULT_LOADER) {
		return { ...state, loading: false };
	}
	else if (action.type === SET_RESULT_ERRORS) {
		return {...state, resultErrors: action.payload};
	} 
	else if (action.type === REMOVE_RESULT_ERRORS) {
		return {...state, resultErrors: []};
	}
	else if (action.type === SET_RESULT_MESSAGE) {
		return {...state, message: action.payload};
	}
	else if (action.type === REMOVE_RESULT_MESSAGE) {
		return {...state, message: ''};
	}
	else if (action.type === SET_RESULT_SUBJECTS) {
		return {...state, resultSubjects: action.payload};
	}
	else if (action.type === SET_RESULT_SINGLE) {
		return {...state, resultSingle: action.payload};
	}
	else if (action.type === REMOVE_RESULT_SINGLE) {
		return {...state, resultSingle: {}};
	}
	else if (action.type === SET_RESULTS) {
		return {...state, results: action.payload};
	}
	else {
		return state;
	}
}

export default ResultReducer;