export type IPannel = {
  scale: number
  width: number
  height: number
  bgColor?: any
  bgImg?: any
  bgMethod?: any // 背景size  cover、container、100% 100%
  colors?: any[]
  components: IComponent[]
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
  option: IChartOption | TextOption | Object
  // 请求信息
  request: any
}

//基本信息  包括缩略信息
export type IBaseConfig = {
  label: string // 缩略标题
  img: string // 缩略图
  component: string // 组件名称
}

// 组件属性
export type IChartOption = {
  backgroundColor?: string
  color?: string[] | undefined
  tooltip: {
    trigger: string
    axisPointer: {
      type: string
      label: {
        color: string
        backgroundColor: string
      }
    }
    [key: string]: any
  }
  grid: {
    bottom: any
    left: any
    right: any
    top: any
    containLabel?: boolean
  }
  legend: {
    type?: string
    show?: boolean
    left?:'left'|'right'|'center'
    top?:'top'|'bottom'|'middle'
    icon?: 'circle'|'rect'|'roundRect'| 'triangle'| 'diamond'| 'pin'| 'arrow'| 'none' | undefined
    itemHeight: number 
    itemWidth: number 
    orient?: 'horizontal' | 'vertical'
    itemGap:10,
    textStyle:{
      color?:string,
      fontSize?:number
    }
    [key: string]: any
  }
  xAxis: {
    show?:boolean,
    name?:string
    type?:'category'|'value',
    boundaryGap ?:boolean, // 留白
    splitNumber?:number, // 分割线数量
    axisLabel:{
      show?:boolean,
      color?:string
      fontSize?:number
      fontWeight?:'normal'|'bold'|'bolder'|'lighter'|100|200|300|400|500|600|700|800|900
    },
    nameTextStyle:{
      color?:string
      fontSize ?:number
      align ?:'left'|'center'|'right',
      padding ?:Array<number>
    },
    // 轴线配置
    axisLine:{
      show?:boolean,
      onZero?:boolean, // 是否在0刻度上
      symbol?: Array<string>,// 轴线箭头 'none'|'arrow'|
      lineStyle:{
        color?:string,
        width?:number,
        type?:'solid'|'dashed'|'dotted'

      }
    }
    // 刻度配置
    axisTick:{
      show?:boolean,
      alignWithLabel?:boolean,// 刻度与柱状图居中
      inside?:boolean, // 是否在内部
      length?:number, // 刻度长度
      lineStyle:{
        color?:string,
        width?:number,
        type?:'solid'|'dashed'|'dotted'

      }
    }
    //分割线
    splitLine :{
      show?:boolean,
      lineStyle:{
        color?:string,
        width?:number,
        type?:'solid'|'dashed'|'dotted'
      }
    }
  }
  yAxis: {
    show?:boolean,
    name?:string
    type?:'category'|'value',
    boundaryGap ?:boolean, // 留白
    splitNumber?:number, // 分割线数量
    axisLabel:{
      show?:boolean,
      color?:string
      fontSize?:number
      fontWeight?:'normal'|'bold'|'bolder'|'lighter'|100|200|300|400|500|600|700|800|900
    },
    nameTextStyle:{
      color?:string
      fontSize ?:number
      align ?:'left'|'center'|'right',
      padding ?:Array<number>
    },
    // 轴线配置
    axisLine:{
      show?:boolean,
      onZero?:boolean, // 是否在0刻度上
      symbol?: Array<string>,// 轴线箭头 'none'|'arrow'|
      lineStyle:{
        color?:string,
        width?:number,
        type?:'solid'|'dashed'|'dotted'

      }
    }
    // 刻度配置
    axisTick:{
      show?:boolean,
      alignWithLabel?:boolean,// 刻度与柱状图居中
      inside?:boolean, // 是否在内部
      length?:number, // 刻度长度
      lineStyle:{
        color?:string,
        width?:number,
        type?:'solid'|'dashed'|'dotted'

      }
    }
    //分割线
    splitLine :{
      show?:boolean,
      lineStyle:{
        color?:string,
        width?:number,
        type?:'solid'|'dashed'|'dotted'
      }
    }
  }
  dataset?:{
    dimensions:Array<any>
    source:Array<Object>
  },
  series: Array<any>
  [key: string]: any
}

// 文字组件的配置
export type TextOption = {
  backgroundColor: string

  [key: string]: any
}
