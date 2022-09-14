import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from "redux-thunk";
import ChairmanReducer from './reducers/ChairmanReducer';
import TeacherReducer from './reducers/TeacherReducer';
import StudentReducer from './reducers/StudentReducer';
import ExamReducer from './reducers/ExamReducer';
import CommonReducer from './reducers/CommonReducer';
import SubjectReducer from './reducers/SubjectReducer';
import MarkReducer from './reducers/MarkReducer';
import ResultReducer from './reducers/ResultReducer';

const rootReducers = combineReducers({
     ChairmanReducer,
     TeacherReducer,
     StudentReducer,
     ExamReducer,
     CommonReducer,
     SubjectReducer,
     MarkReducer,
     ResultReducer,
});
const middlewares = [thunkMiddleware];
const Store = createStore(rootReducers, composeWithDevTools( applyMiddleware(...middlewares)));

export default Store;