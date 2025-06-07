import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';
import './assets/tailwind.css'; // Make sure this path is correct

createApp(App).use(router).mount('#app');
