export type IDateType =
  | 'year'
  | 'years'
  | 'month'
  | 'date'
  | 'dates'
  | 'datetime'
  | 'week'
  | 'datetimerange'
  | 'daterange'
  | 'monthrange'

export type IDatePickerEvents = {
  label: string
  event: any
}

export type Ilisteners = {
  relComponentId: string; 
  relEvent: string
  // 组件属性与新属性关联map
  relMap:Record<any,any>
}
export type IDatePicker = {
  type: IDateType
  placeholder?: string
  format?: string
  valueFormat?: string
  bgColor: string
  color?: string
  readonly?: boolean
  // 当前时间或固定值 或无
  defaultType?: 'now' | 'fix' | ''
  // 绑定的数据
  modelValue?: any
  propDesc?: Array<{ label: any; value: any }>
  // 事件
  events?: Array<IDatePickerEvents>
  // 监听事件如组件绑定关系
  listeners?: Array<Ilisteners>
}
