import axios from 'axios';
import jwt_decode from 'jwt-decode';
import store from '../store';
import { EXAM_LOGOUT } from '../store/types/ExamType';

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    baseURL: "http://localhost:5000/api"
  };
  // Create instance
  const axiosExam = axios.create(defaultOptions);

  //check token expire or not every request
  const VerifyToken = (token) => {
    const decodeToken = jwt_decode(token);
    const expiresIn = new Date(decodeToken.exp * 1000);
    if (new Date() > expiresIn) {
      localStorage.removeItem('examToken');
      store.dispatch({type: EXAM_LOGOUT});
      return null;
    } else {
      return decodeToken;
    }
  };

  // Set the AUTH token for any request
  axiosExam.interceptors.request.use(function (config) {
    const token = localStorage.getItem('examToken');
    if(token){
      const verify = VerifyToken(token);
    }else{
       store.dispatch({type: EXAM_LOGOUT});
    }
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

export default axiosExam;