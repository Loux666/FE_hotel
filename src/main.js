
import './assets/custom-grid.css'; // Custom Vanilla Grid
import './assets/custom-utils.css'; // Custom Vanilla Utilities
import 'flatpickr/dist/flatpickr.min.css';
import 'nouislider/dist/nouislider.min.css';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css';
import './assets/premium-theme.css'; // Add Luxury Theme

import 'flatpickr';
import 'nouislider';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js';

import $ from 'jquery';
window.$ = window.jQuery = $;




import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
