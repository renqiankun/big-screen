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
export type IDatePicker = {
  type: IDateType
  placeholder?: string
  format?:string
  valueFormat?: string
  bgColor: string
  color?: string
  readonly?:boolean

  // 当前时间或固定值 或无
  defaultType?: 'now' | 'fix' | ''
  modelValue?: '' | Date | [any ,any ],
  // 事件
  events?:Array<IDatePickerEvents>
}
