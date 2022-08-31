import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from "redux-thunk";
import ChairmanReducer from './reducers/ChairmanReducer';
import TeacherReducer from './reducers/TeacherReducer';
import StudentReducer from './reducers/StudentReducer';

const rootReducers = combineReducers({
     ChairmanReducer,
     TeacherReducer,
     StudentReducer,
});
const middlewares = [thunkMiddleware];
const Store = createStore(rootReducers, composeWithDevTools( applyMiddleware(...middlewares)));

export default Store;