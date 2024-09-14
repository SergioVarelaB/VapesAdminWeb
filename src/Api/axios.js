import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/',
  // Aquí puedes añadir más configuraciones como headers por defecto
});

export default axiosInstance;