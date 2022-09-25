import axios from 'axios';
import jwt_decode from 'jwt-decode';
import store from '../store';
import { CHAIRMAN_LOGOUT } from '../store/types/ChairmanType';

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    baseURL: "http://localhost:5000/api"
  };
  // Create instance
  const axiosChairman = axios.create(defaultOptions);

  //check token expire or not every request
  const VerifyToken = (token) => {
    const decodeToken = jwt_decode(token);
    const expiresIn = new Date(decodeToken.exp * 1000);
    if (new Date() > expiresIn) {
      localStorage.removeItem('chairmanToken');
      store.dispatch({type: CHAIRMAN_LOGOUT});
      return null;
    } else {
      return decodeToken;
    }
  };

  // Set the AUTH token for any request
  axiosChairman.interceptors.request.use(function (config) {
    const token = localStorage.getItem('chairmanToken');
    if(token){
      const verify = VerifyToken(token);
    }else{
       store.dispatch({type: CHAIRMAN_LOGOUT});
    }
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

export default axiosChairman;