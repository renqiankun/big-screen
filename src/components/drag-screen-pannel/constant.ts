import type { IChartOption } from './type'

const chartOption: IChartOption = {
  color: undefined,
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
    appendToBody: true,
    axisPointer: {
      type: 'cross',
      label: { color: '#666', backgroundColor: '#fff' }
    }
  },
  grid: {
    right: 0,
    bottom: '0',
    left: 0,
    top: '60px',
    containLabel: true
  },
  legend: {
    show: true,
    type: 'scroll',
    // x: 'center',
    // y: '0px',
    top: 'top',
    left: 'center',
    orient: 'horizontal',
    itemGap: 10,
    icon: undefined,
    itemWidth: 10,
    itemHeight: 8,
    textStyle: { color: '#B9B8CE', fontSize: 13 }, //, lineHeight: 15
    pageIconColor: '#B9B8CE',
    pageIconInactiveColor: '#999',
    pageIconSize: 10,
    inactiveColor: '#999',
    pageIcons: {
      horizontal: ['M0,0L20,0L10,-20z', 'M0,0L20,0L10,20z']
    },
    pageTextStyle: {
      color: '#fff',
      fontSize: 10
    }
  },
  xAxis: [
    {
      type: 'category',
      show: true,
      position: undefined,
      name: '',
      boundaryGap: true, // 留白
      splitNumber: 5, // 分隔段数
      axisLabel: {
        show: true,
        color: '#B9B8CE',
        fontSize: 12,
        fontWeight: 'normal'
      },
      nameTextStyle: {
        color: '#B9B8CE',
        fontSize: 12,
        align: 'left',
        padding: [0, 0, 0, 0]
      },
      axisLine: {
        show: true,
        onZero: false,
        symbol: ['none', 'none'],
        lineStyle: {
          color: '#B9B8CE',
          width: 1,
          type: 'solid'
        }
      },
      axisTick: {
        show: true,
        alignWithLabel: false,
        inside: false,
        length: 5,
        lineStyle: {
          color: '#B9B8CE',
          width: 1,
          type: 'solid'
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#B9B8CE',
          width: 1,
          type: 'solid'
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      show: true,
      position: undefined,
      name: '',
      boundaryGap: false, // 留白
      splitNumber: 5, // 分隔段数
      axisLabel: {
        show: true,
        color: '#B9B8CE',
        fontSize: 12,
        fontWeight: 'normal'
      },
      nameTextStyle: {
        color: '#B9B8CE',
        fontSize: 12,
        align: 'left',
        padding: [0, 0, 0, 0]
      },
      axisLine: {
        show: true,
        onZero: false,
        symbol: ['none', 'none'],
        lineStyle: {
          color: '#B9B8CE',
          width: 1,
          type: 'solid'
        }
      },
      axisTick: {
        show: true,
        alignWithLabel: false,
        inside: false,
        length: 5,
        lineStyle: {
          color: '#B9B8CE',
          width: 1,
          type: 'solid'
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#B9B8CE',
          width: 1,
          type: 'solid'
        }
      }
    }
  ],
  series: [
    {
      type: 'bar',
      xAxisIndex: 0,
      yAxisIndex: 0,
      showBackground: true,
      stack :undefined,
      stackStrategy:'all',
      backgroundStyle: {
       
      },
      itemStyle:{

      },
      lineStyle:{

      },
      label:{

      }
    }
  ]
}

export const commonOptionMap = {
  'chart-bar-line': chartOption
}
