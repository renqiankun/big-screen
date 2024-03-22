import chartBarLine from './chart-bar-line/index.vue'
import './package.scss'
const install = (app: any) => {
    
    app.component('chartBarLine', chartBarLine)
}

export default install