export type ITooltip = {
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

export type Igrid = {
  bottom: any
  left: any
  right: any
  top: any
  containLabel?: boolean
}

export type Ilegend = {
  type?: string
  show?: boolean
  left?: 'left' | 'right' | 'center'
  top?: 'top' | 'bottom' | 'middle'
  icon?:
    | 'circle'
    | 'rect'
    | 'roundRect'
    | 'triangle'
    | 'diamond'
    | 'pin'
    | 'arrow'
    | 'none'
    | undefined
  itemHeight: number
  itemWidth: number
  orient?: 'horizontal' | 'vertical'
  itemGap: 10
  textStyle: {
    color?: string
    fontSize?: number
  }
  [key: string]: any
}

export type IbarxAxis = {
  show?: boolean
  name?: string
  gridIndex?: number
  position?: 'top' | 'bottom' | 'left' | 'right'
  type?: 'category' | 'value'
  boundaryGap?: boolean // 留白
  splitNumber?: number // 分割线数量
  axisLabel: {
    show?: boolean
    color?: string
    fontSize?: number
    fontWeight?:
      | 'normal'
      | 'bold'
      | 'bolder'
      | 'lighter'
      | 100
      | 200
      | 300
      | 400
      | 500
      | 600
      | 700
      | 800
      | 900
  }
  nameTextStyle: {
    color?: string
    fontSize?: number
    align?: 'left' | 'center' | 'right'
    padding?: Array<number>
  }
  // 轴线配置
  axisLine: {
    show?: boolean
    onZero?: boolean // 是否在0刻度上
    symbol?: Array<string> // 轴线箭头 'none'|'arrow'|
    lineStyle: {
      color?: string
      width?: number
      type?: 'solid' | 'dashed' | 'dotted'
    }
  }
  // 刻度配置
  axisTick: {
    show?: boolean
    alignWithLabel?: boolean // 刻度与柱状图居中
    inside?: boolean // 是否在内部
    length?: number // 刻度长度
    lineStyle: {
      color?: string
      width?: number
      type?: 'solid' | 'dashed' | 'dotted'
    }
  }
  //分割线
  splitLine: {
    show?: boolean
    lineStyle: {
      color?: string
      width?: number
      type?: 'solid' | 'dashed' | 'dotted'
    }
  }
}

export type IbaryAxis = {
  show?: boolean
  name?: string
  position?: 'left' | 'right'
  type?: 'category' | 'value'
  boundaryGap?: boolean // 留白
  splitNumber?: number // 分割线数量
  axisLabel: {
    show?: boolean
    color?: string
    fontSize?: number
    fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter'
  }
  nameTextStyle: {
    color?: string
    fontSize?: number
    align?: 'left' | 'center' | 'right'
    padding?: Array<number>
  }
  // 轴线配置
  axisLine: {
    show?: boolean
    onZero?: boolean // 是否在0刻度上
    symbol?: Array<string> // 轴线箭头 'none'|'arrow'|
    lineStyle: {
      color?: string
      width?: number
      type?: 'solid' | 'dashed' | 'dotted'
    }
  }
  // 刻度配置
  axisTick: {
    show?: boolean
    alignWithLabel?: boolean // 刻度与柱状图居中
    inside?: boolean // 是否在内部
    length?: number // 刻度长度
    lineStyle: {
      color?: string
      width?: number
      type?: 'solid' | 'dashed' | 'dotted'
    }
  }
  //分割线
  splitLine: {
    show?: boolean
    lineStyle: {
      color?: string
      width?: number
      type?: 'solid' | 'dashed' | 'dotted'
    }
  }
}
/**
 * 柱状图 折线图 series 配置
 */
export type IbarLineSeries = {
  type: 'bar' | 'line'
  xAxisIndex?: number // 坐标index
  yAxisIndex?: number // 坐标index
  showBackground?: boolean
  realtimeSort?: boolean // 实时排序
  backgroundStyle: {
    color?: string
    borderRadius?: number
  }
  // bar是否堆叠
  stack?: string | undefined
  // bar堆叠策略  默认all
  stackStrategy?: 'all' | 'samesign' | 'positive' | 'negative'
  barWidth?: string | number // 空为自适应
  barMaxWidth?: number
  // bar 偏移
  barGap?: string | undefined

  // line样式
  smooth?: boolean
  showSymbol?: boolean
  symbol?: string
  symbolSize?: number
  // 阶梯线
  step?: boolean | 'start' | 'middle' | 'end'

  // 图形上的文字标签
  itemStyle: {
    // 整体颜色 影响图例
    color?: string
  }
  lineStyle: {
    type?: 'solid' | 'dashed' | 'dotted'
    color?: string
    width?: number
  }
  label: {
    show?: boolean
    // 位置
    color?: string
    fontSize?: number
    fontWeight?: string
    position?:
      | 'top'
      | 'bottom'
      | 'left'
      | 'right'
      | 'inside'
      | 'insideLeft'
      | 'insideRight'
      | 'insideTop'
      | 'insideBottom'
      | 'insideTopLeft'
      | 'insideBottomLeft'
      | 'insideTopRight'
      | 'insideBottomRight'
  }
}

/**
 * 饼图 series 配置
 */
export type IpieSeries = {
  type: 'pie'
  // 扇区间隔 0
  padAngle?: number
  // 南丁格尔图 false
  roseType?: boolean
  // 总数据0时显示扇区 true
  stillShowZeroSum?: boolean
  // 扇区比例精度 2
  percentPrecision?: number
  label: {
    show?: boolean
    position?: 'inside' | 'outer' | 'center'
    color?: string
    fontWeight?: string
    fontSize?: number
    // label对齐， position为auto时生效
    alignTo?: 'none' | 'labelLine' | 'edge'
  }
  center: Array<any>
  radius: Array<any>
  itemStyle: {
    borderColor?: string
    borderWidth?: number
    borderType?: string
    borderRadius?: string
  }
  labelLine:{
    smooth?:number
    length?:number
    length2?:number
  }
}
