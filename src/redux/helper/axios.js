import axios from 'axios';
import { api } from '../../urlconfig';

const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    Authorization: window.localStorage.getItem('token')
      ? `Bearer ${window.localStorage.getItem('token')}`
      : '',
  },
});

export default axiosInstance;
