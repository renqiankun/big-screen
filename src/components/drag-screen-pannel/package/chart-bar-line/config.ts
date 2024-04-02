import {
  chartBarLineSeries,
  chartBaseConfig,
  chartGrid,
  chartLegend,
  chartToolTip,
  chartXAxis,
  chartYAxis
} from '../../constant'
import type { IChartOption } from '../../types/type'

export const chartBar = {
  label: '柱状图',
  img: 'bar_x',
  component: 'chart-bar-line',
  configComponent: 'chart-bar-line-config',
  option: {
    ...chartBaseConfig,
    tooltip: chartToolTip,
    grid: chartGrid,
    legend: chartLegend,
    xAxis: [chartXAxis],
    yAxis: [chartYAxis],
    series: [chartBarLineSeries, chartBarLineSeries]
  }
}

export const chartLine = {
  label: '折线图',
  img: 'bar_x',
  component: 'chart-bar-line',
  configComponent: 'chart-bar-line-config',

  option: {
    ...chartBaseConfig,
    tooltip: chartToolTip,
    grid: chartGrid,
    legend: chartLegend,
    xAxis: [chartXAxis],
    yAxis: [chartYAxis],
    series: [
      {
        ...chartBarLineSeries,
        type: 'line'
      },
      {
        ...chartBarLineSeries,
        type: 'line'
      }
    ]
  }
}

// 横向柱状图
export const charthorBar = {
  label: '横向柱状图',
  img: 'bar_x',
  component: 'chart-bar-line',
  configComponent: 'chart-bar-line-config',

  option: {
    ...chartBaseConfig,
    tooltip: chartToolTip,
    grid: chartGrid,
    legend: chartLegend,
    xAxis: [{ ...chartXAxis, type: 'value', boundaryGap: false }],
    yAxis: [{ ...chartYAxis, type: 'category', boundaryGap: true }],
    series: [chartBarLineSeries, chartBarLineSeries]
  }
}

export const chartDoubleYBar = {
  label: '双Y轴',
  img: 'bar_x',
  component: 'chart-bar-line',
  option: {
    ...chartBaseConfig,
    tooltip: chartToolTip,
    grid: chartGrid,
    legend: chartLegend,
    xAxis: [chartXAxis],
    yAxis: [chartYAxis, chartYAxis],
    series: [
      {
        ...chartBarLineSeries,
        type: 'bar'
      },
      {
        ...chartBarLineSeries,
        yAxisIndex: 1,
        type: 'line'
      }
    ]
  }
}
