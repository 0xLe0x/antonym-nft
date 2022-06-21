import { createApp } from 'vue'
import Toast from 'vue-toastification'
import router from './router'

import 'virtual:windi.css'
import 'vue-toastification/dist/index.css'

import App from './App.vue'

createApp(App)
  .use(router)
  .use(Toast)
  .mount('#app')
