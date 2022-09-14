import { SET_RESULT_SUBJECTS, REMOVE_RESULT_ERRORS, REMOVE_RESULT_LOADER, REMOVE_RESULT_MESSAGE, SET_RESULT_ERRORS, SET_RESULT_LOADER, SET_RESULT_MESSAGE, SET_RESULT_SINGLE, REMOVE_RESULT_SINGLE } from '../types/ResultType';

const initState = {
    loading: false,
	resultErrors: [],
	message:"",
	resultSingle:{}
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
	else {
		return state;
	}
}

export default ResultReducer;