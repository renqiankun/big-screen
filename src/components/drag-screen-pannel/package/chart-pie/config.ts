import {
  chartBaseConfig,
  chartGrid,
  chartLegend,
  chartPieSeries,
  chartPieToolTip,
} from '../../constant'

export const chartPie= {
  label: '饼图',
  img: 'bar_x',
  component: 'chart-pie',
  configComponent: 'chart-pie-config',
  option: {
    ...chartBaseConfig,
    tooltip: chartPieToolTip,
    legend: chartLegend,
    series: chartPieSeries
  }
}
export const chartPieNan= {
  label: '南丁格尔图',
  img: 'bar_x',
  component: 'chart-pie',
  configComponent: 'chart-pie-config',
  option: {
    ...chartBaseConfig,
    tooltip: chartPieToolTip,
    legend: chartLegend,
    series: {
      ...chartPieSeries,
      roseType:true
    }
  }
}

export const chartPieflower= {
  label: '花瓣',
  img: 'bar_x',
  component: 'chart-pie',
  configComponent: 'chart-pie-config',
  option: {
    ...chartBaseConfig,
    tooltip: chartPieToolTip,
    legend: chartLegend,
    series: {
      ...chartPieSeries,
      padAngle:20,
      roseType:true,
      radius:[0,'100%'],
      label:{
        show:false,
        position:'inside'
      },
      itemStyle:{
        borderRadius:'50%'
      }
    }
  }
}
