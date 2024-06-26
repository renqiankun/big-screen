import type { ITooltip, IbarLineSeries, IbarxAxis, IbaryAxis, Igrid, Ilegend, IpieSeries } from "./base"
import type { IDatePicker } from "./date-picker"
import type { IRquest,IGlobalRequest } from "./request"

export type IPannel = {
  scale: number
  width: number
  height: number
  bgColor?: any
  bgImg?: any
  bgMethod?: any // 背景size  cover、container、100% 100%
  colors?: any[]
  components: IComponent[]
  globalVariable: Record<any, any>
  // 全局请求信息
  globalRequest: IGlobalRequest
}

export type IComponent = {
  id?: string | null
  x: number
  y: number
  w: number
  h: number
  r: number
  z?: number
  lock?: boolean
  hide?: boolean
  scaleRatio?: number
  active: boolean
  preventDeactivation: boolean
  // 基本信息
  baseConfig: IBaseConfig
  // 各种组件的配置信息
  option: IChartOption | TextOption | Object |IDatePicker

  // 请求信息
  request: IRquest
}

//基本信息  包括缩略信息
export type IBaseConfig = {
  label: string // 缩略标题
  img: string // 缩略图
  component: string // 组件名称
  configComponent?:string
}

// 组件属性
export type IChartOption = {
  backgroundColor?: string
  color?: string[] | undefined
  tooltip: ITooltip
  grid:Igrid 
  legend: Ilegend
  xAxis: [
    IbarxAxis
  ]
  yAxis: [
    IbaryAxis
  ]
  series: Array<IbarLineSeries>
  dataset?: {
    dimensions: Array<any>
    source: Array<Object>
  }
  [key: string]: any
}




export type IpieOption = {
  backgroundColor?: string
  color?: string[] | undefined
  tooltip: ITooltip
  grid:Igrid 
  legend: Ilegend
  series:IpieSeries
  dataset?: {
    dimensions: Array<any>
    source: Array<Object>
  }
  [key: string]: any
}
// 文字组件的配置
export type TextOption = {
  backgroundColor: string
  [key: string]: any
}
