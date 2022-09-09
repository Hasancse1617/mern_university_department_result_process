import axios from 'axios';
import jwt_decode from 'jwt-decode';
import store from '../store';
import { TEACHER_LOGOUT } from '../store/types/TeacherType';

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    baseURL: "http://localhost:5000/api"
  };
  // Create instance
  const axiosTeacher = axios.create(defaultOptions);

  //check token expire or not every request
  const VerifyToken = (token) => {
    const decodeToken = jwt_decode(token);
    const expiresIn = new Date(decodeToken.exp * 1000);
    if (new Date() > expiresIn) {
      localStorage.removeItem('teacherToken');
      store.dispatch({type: TEACHER_LOGOUT});
      return null;
    } else {
      return decodeToken;
    }
  };

  // Set the AUTH token for any request
  axiosTeacher.interceptors.request.use(function (config) {
    const token = localStorage.getItem('teacherToken');
    if(token){
      const verify = VerifyToken(token);
    }else{
       store.dispatch({type: TEACHER_LOGOUT});
    }
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

export default axiosTeacher;