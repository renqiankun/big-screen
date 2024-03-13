export type IPannel = {
  scale: number
  width: number
  height: number
  bgColor?:any
  bgImg?:any
  bgMethod?:any // 背景size  cover、container、100% 100%
  colors?:any[]
  components: IComponent[]
}



export type IComponent = {
  id?:string
  x: number | string
  y: number | string
  w: number | string
  h: number | string
  r: number | string
  z: number | string
  lock?:boolean
  hide?:boolean
  scaleRatio: number
  active: boolean
  preventDeactivation: boolean
  // 基本信息
  chartConfig:IChartConfig,
  // 各种组件的配置信息
  option:IChartOption | TextOption
  // 请求信息
  request:any
}

// 基本信息
export type IChartConfig = {
  label:string
  img:string,
  component:string
}


// 组件属性
export type IChartOption = {
  backgroundColor:string
  grid?:{
    bottom:any,
    left:any,
    right:any,
    top:any
  }
  legend?:{
    type?:string
    show?:boolean
    icon?:string
    itemHeight:number | string
    itemWidth:number | string
    orient:string
  }
  xAxis?:any
  yAxis?:any
  series?:Array<any>
  [key :string]:any
}

// 文字组件的配置
export type TextOption = {
  backgroundColor:string

  [key :string]:any
}