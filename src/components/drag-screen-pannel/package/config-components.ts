import chartBarLine from './chart-bar-line/config.vue'
import chartPie from './chart-pie/config.vue'
import datePicker from './date-picker/config.vue'
const install = (app: any) => {
  app.component('chartBarLineConfig', chartBarLine)
  app.component('chartPieConfig', chartPie)
  app.component('datePickerConfig', datePicker)
}

export default install
