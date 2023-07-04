import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from './i18n';

const app = createApp(App);
app.mount('#app');
app.config.globalProperties.i18n = i18n;
