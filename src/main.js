import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import index from './router/index.js'

const app = createApp(App);
app.use(index);
app.mount('#app');
