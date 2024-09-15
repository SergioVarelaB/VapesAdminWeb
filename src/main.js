import { createApp } from 'vue'
import App from './App.vue'
import axiosInstance from './Api/axios.js';
import router from './Router/router.js';

createApp(App).use(router).mount('#app')


App.config.globalProperties.$axios = axiosInstance;
