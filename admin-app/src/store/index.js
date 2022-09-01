import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from "redux-thunk";
import ChairmanReducer from './reducers/ChairmanReducer';
import TeacherReducer from './reducers/TeacherReducer';
import StudentReducer from './reducers/StudentReducer';
import ExamReducer from './reducers/ExamReducer';

const rootReducers = combineReducers({
     ChairmanReducer,
     TeacherReducer,
     StudentReducer,
     ExamReducer,
});
const middlewares = [thunkMiddleware];
const Store = createStore(rootReducers, composeWithDevTools( applyMiddleware(...middlewares)));

export default Store;