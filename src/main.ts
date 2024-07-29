import { createApp } from 'vue';
import '@/style.css';
import App from './App.vue';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function (registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(function (err) {
      console.log('Service Worker registration failed', err);
    });
}

createApp(App).mount('#app');
