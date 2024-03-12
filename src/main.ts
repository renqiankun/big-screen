import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import VueDragResizeRotate from '@gausszhou/vue3-drag-resize-rotate'
import '@gausszhou/vue3-drag-resize-rotate/lib/bundle.esm.css'
const app = createApp(App)
app.use(VueDragResizeRotate)
app.mount('#app')
