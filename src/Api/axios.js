import axios from 'axios';
import router from '../Router/router';  // Import the router

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



// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    // If the response status is 403, redirect to login page
    if (error.response && error.response.status === 403) {
      router.push('/');  // Navigate to login page
    }
    // Return any other errors as a rejection
    return Promise.reject(error);
  }
);


export default axiosInstance;