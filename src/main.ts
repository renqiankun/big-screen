import './assets/main.css'
import elementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import VueDragResizeRotate from '@gausszhou/vue3-drag-resize-rotate'
import '@gausszhou/vue3-drag-resize-rotate/lib/bundle.esm.css'

import '@/theme/index.scss'

import screenComponets from '@/components/drag-screen-pannel/package/index'
const app = createApp(App)

app.use(VueDragResizeRotate)
app.use(elementPlus)
app.use(screenComponets)
app.mount('#app')
