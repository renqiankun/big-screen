import type { IDatePicker } from "../../types/date-picker"


export const datePicker= {
  label: '日期',
  img: 'bar_x',
  component: 'date-picker',
  configComponent: 'date-picker-config',
  w: 220,
  h: 32,
  option:<IDatePicker> {
    type: 'date',
    valueFormat:'YYYY-MM-DD',
    format:'YYYY-MM-DD',
    bgColor: '#fff',
    defaultType: 'now',
    modelValue: '',
    // 此字段为prop的描述
    propDesc:[
      { label: '日期', value: 'modelValue' },
    ],
    events: [
      { label: '修改时触发', event: 'onChange' }
    ],
    // 事件和组件绑定关系
    listeners:[]
  },
}
  

  export const daterangePicker= {
    label: '日期范围',
    img: 'bar_x',
    component: 'date-picker',
    configComponent: 'date-picker-config',
    w:220,
    h:32,
    option: {
      type:'daterange',
      bgColor:'#fff',
      defaultType:'',
    }
  }
  