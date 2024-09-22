import { createApp } from 'vue'
import App from './App.vue'
// import axiosInstance from './Api/axios.js';
import router from './Router/router.js';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const app = createApp(App);

app.use(router)

app.use(Vue3Toastify, {
  autoClose: 3000,
});

app.mount('#app');
