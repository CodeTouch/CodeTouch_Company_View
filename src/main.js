import { createApp } from 'vue'
import { createPinia } from 'pinia';

import App from './App.vue'
import router from './router/router.js';
import axiosInstance from './axios';

const app = createApp(App);
const pinia = createPinia();

app.config.globalProperties.$axios = axiosInstance;
app.use(pinia);
app.use(router);
app.mount('#app');