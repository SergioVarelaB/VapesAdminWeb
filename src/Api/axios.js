import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://vapesadmin.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'  // Adding CORS header
  },
});

export default axiosInstance;