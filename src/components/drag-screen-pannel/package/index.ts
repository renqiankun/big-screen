import chartBarLine from './chart-bar-line/index.vue'
import chartPie from './chart-pie/index.vue'
import './package.scss'
const install = (app: any) => {
  app.component('chartBarLine', chartBarLine)
  app.component('chartPie', chartPie)
}

export default install
