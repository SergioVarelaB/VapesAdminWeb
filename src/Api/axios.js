import axios from 'axios';

const axiosInstance = axios.create({
  // dev
  // baseURL: 'http://localhost:4000',
  // prod
  baseURL: 'https://vapesadmin.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'  // Adding CORS header
  },
});


export default axiosInstance;