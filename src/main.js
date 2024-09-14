import { createApp } from 'vue'
import App from './App.vue'
import axiosInstance from './Api/axios.js';

createApp(App).mount('#app')

App.config.globalProperties.$axios = axiosInstance;
