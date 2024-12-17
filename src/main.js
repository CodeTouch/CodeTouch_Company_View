import { createApp } from 'vue'
import { createPinia } from 'pinia';

import App from './App.vue'
import router from './router/router.js';
import axiosInstance from './axios';
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.config.globalProperties.$axios = axiosInstance;
app.use(pinia);
app.use(router);
app.mount('#app');