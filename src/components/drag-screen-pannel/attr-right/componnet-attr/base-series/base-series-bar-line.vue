<template>
  <formLayout title="基础">
    <sFormLayout :rate="50" title="类型">
      <el-select size="small" v-model="seriesItem.type">
        <el-option label="柱状图" value="bar"></el-option>
        <el-option label="折线图" value="line"></el-option>
      </el-select>
    </sFormLayout>
    <sFormLayout :rate="50" title="颜色" desc="影响图例颜色">
      <el-color-picker size="small" v-model="seriesItem.itemStyle.color"></el-color-picker>
    </sFormLayout>

    <sFormLayout v-if="isBar" :rate="50" title="背景">
      <el-switch size="small" v-model="seriesItem.showBackground"></el-switch>
    </sFormLayout>

    <sFormLayout v-if="isBar" :rate="50" title="背景色">
      <el-color-picker size="small" v-model="seriesItem.backgroundStyle.color"></el-color-picker>
    </sFormLayout>
    <sFormLayout v-if="isBar" :rate="50" title="实时排序">
      <el-switch size="small" v-model="seriesItem.realtimeSort"></el-switch>
    </sFormLayout>
    <sFormLayout v-if="isBar" :rate="50" title="偏移" desc="只需设置最后一个系列，-100%则两个重叠">
      <el-input size="small" v-model="seriesItem.barGap" @input="changeBarGapVal"></el-input>
    </sFormLayout>
    <sFormLayout v-if="isBar" :rate="50" title="宽度" desc="只需设置最后一个系列">
      <el-input placeholder="自适应" size="small" v-model="seriesItem.barWidth"></el-input>
    </sFormLayout>
    <sFormLayout v-if="isBar" :rate="50" title="最大宽度" desc="只需设置最后一个系列">
      <el-input-number size="small" v-model="seriesItem.barMaxWidth"></el-input-number>
    </sFormLayout>
  </formLayout>

  <formLayout v-if="isLine" title="线">
    <sFormLayout :rate="50" title="圆滑">
      <el-switch size="small" v-model="seriesItem.smooth"></el-switch>
    </sFormLayout>
    <sFormLayout :rate="50" title="类型">
      <el-select size="small" v-model="seriesItem.lineStyle.type">
        <el-option label="实线" value="solid"></el-option>
        <el-option label="虚线" value="dashed"></el-option>
        <el-option label="点线" value="dotted"></el-option>
      </el-select>
    </sFormLayout>
    <sFormLayout :rate="50" title="颜色" desc="不影响图例颜色">
      <el-color-picker size="small" v-model="seriesItem.lineStyle.color"></el-color-picker>
    </sFormLayout>
    <sFormLayout :rate="50" title="宽度">
      <el-input-number v-model="seriesItem.lineStyle.width" size="small"></el-input-number>
    </sFormLayout>
  </formLayout>

  <formLayout v-if="isLine" title="图标">
    <sFormLayout :rate="50" title="显示">
      <el-switch v-model="seriesItem.showSymbol" size="small"></el-switch>
    </sFormLayout>
    <sFormLayout :rate="50" title="图标">
      <el-select clearable v-model="seriesItem.symbol" size="small">
        <el-option label="无" value="none"></el-option>
        <el-option label="圆形" value="circle"></el-option>
        <el-option label="正方形" value="rect"></el-option>
        <el-option label="三角形" value="triangle"></el-option>
        <el-option label="菱形" value="diamond"></el-option>
        <el-option label="箭头" value="arrow"></el-option>
        <el-option label="线" value="line"></el-option>
        <el-option label="空心圆" value="emptyCircle"></el-option>
      </el-select>
    </sFormLayout>
    <sFormLayout :rate="50" title="大小">
      <el-input-number v-model="seriesItem.symbolSize" size="small"></el-input-number>
    </sFormLayout>
  </formLayout>

  <formLayout title="标题">
    <sFormLayout :rate="50" title="显示">
      <el-switch size="small" v-model="seriesItem.label.show"></el-switch>
    </sFormLayout>
    <sFormLayout :rate="50" title="位置">
      <el-select size="small" v-model="seriesItem.label.position">
        <el-option
          v-for="item in labelPositionList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </sFormLayout>
    <sFormLayout :rate="50" title="字体大小">
      <el-input-number size="small" v-model="seriesItem.label.fontSize"></el-input-number>
    </sFormLayout>
    <sFormLayout :rate="50" title="加粗">
      <el-select v-model="seriesItem.label.fontWeight" size="small">
        <el-option label="不加粗" value="normal"></el-option>
        <el-option label="加粗" value="bold"></el-option>
        <el-option label="更粗" value="bolder"></el-option>
        <el-option label="更细" value="lighter"></el-option>
      </el-select>
    </sFormLayout>
    <sFormLayout :rate="50" title="字体颜色">
      <el-color-picker
        style="width: 100%"
        size="small"
        v-model="seriesItem.label.color"
      ></el-color-picker>
    </sFormLayout>
  </formLayout>

  <formLayout title="堆叠">
    <sFormLayout :rate="50" title="堆叠值">
      <el-input size="small" v-model="seriesItem.stack"></el-input>
    </sFormLayout>
    <sFormLayout :rate="50" title="堆叠方式">
      <el-select size="small" v-model="seriesItem.stackStrategy">
        <el-option label="全部（默认）" value="all"></el-option>
        <el-option label="正负符号相同时" value="samesign"></el-option>
        <el-option label="正值" value="positive"></el-option>
        <el-option label="负值" value="negative"></el-option>
      </el-select>
    </sFormLayout>
  </formLayout>

  <formLayout title="坐标轴" v-if="option.xAxis.length>1 || option.yAxis.length>1">
    <sFormLayout v-if="option.xAxis.length>1" :rate="50" title="X轴" desc="两个X坐标轴时可以选择">
      <el-select size="small" v-model="seriesItem.xAxisIndex">
        <el-option label="第一个（0）" :value="0"></el-option>
        <el-option label="第二个（1）" :value="1"></el-option>
      </el-select>
    </sFormLayout>

    <sFormLayout v-if="option.yAxis.length>1"  :rate="50" title="Y轴" desc="两个Y坐标轴时可以选择">
      <el-select size="small" v-model="seriesItem.yAxisIndex">
        <el-option label="第一个（0）" :value="0"></el-option>
        <el-option label="第二个（1）" :value="1"></el-option>
      </el-select>
    </sFormLayout>
  </formLayout>
</template>

<script setup lang="ts">
import type { barLineSeries } from '../../../type'
import formLayout from '@/components/form-layout/index.vue'
import sFormLayout from '@/components/s-form-layout-small/index.vue'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    seriesItem: barLineSeries
    option:any
  }>(),
  {}
)
let labelPositionList = [
  { label: '上', value: 'top' },
  { label: '下', value: 'bottom' },
  { label: '左', value: 'left' },
  { label: '右', value: 'right' },
  { label: '内部', value: 'inside' },
  { label: '外部', value: 'outside' },
  { label: '内部左', value: 'insideLeft' },
  { label: '内部右', value: 'insideRight' },
  { label: '内部上', value: 'insideTop' },
  { label: '内部下', value: 'insideBottom' }
]
let isBar = computed(() => {
  return props.seriesItem.type === 'bar'
})

let isLine = computed(() => {
  return props.seriesItem.type === 'line'
})
const changeBarGapVal = (val: any) => {
  if (!val) {
    return (props.seriesItem.barGap = undefined)
  }
}
const emits = defineEmits(['update:barGap'])
</script>

<style lang="scss" scoped></style>
