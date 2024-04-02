

export const datePicker= {
    label: '日期',
    img: 'bar_x',
    component: 'date-picker',
    configComponent: 'date-picker-config',
    w:220,
    h:32,
    option: {
      type:'date',
      bgColor:'#fff',
      defaultType:'now',
      events:[
        {label:'改变',event:'onChange'}
      ]
    }
  }
  

  export const daterangePicker= {
    label: '日期范围',
    img: 'bar_x',
    component: 'date-picker',
    configComponent: 'date-picker-config',
    w:20,
    h:32,
    option: {
      type:'daterange',
      bgColor:'#fff',
      defaultType:'',
    }
  }
  