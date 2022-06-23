import { ViteSSG } from 'vite-ssg'
import Toast from 'vue-toastification'
import VueTippy from 'vue-tippy'
import { routes } from './router'

import 'virtual:windi.css'
import 'vue-toastification/dist/index.css'
import '@mdi/font/css/materialdesignicons.min.css'

import App from './App.vue'

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app }) => {
    app.use(Toast)
    app.use(VueTippy, {
      component: 'v-tippy'
    })
  }
)
