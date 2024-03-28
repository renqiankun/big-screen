<template>
  <div class="package-com-wrap">
    <div ref="nodeRef" class="package-item"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import type { IChartOption, IComponent } from '../../types/type'
import { hideTooTipHand, destroyHand } from '../utils'
import dataJson from './data.json'
const props = withDefaults(
  defineProps<{
    config: IComponent
  }>(),
  {}
)

let nodeRef = ref()
let myChart: any = ''
let chartOption = computed<IChartOption>(() => {
  return props.config.option as IChartOption
})

const init = async () => {
  await nextTick()
  if (!myChart) {
    myChart = echarts.init(nodeRef.value)
  }
  let option = {
    ...chartOption.value,
    dataset: dataJson
  }
  hideTooTipHand(myChart)
  myChart.setOption(option)
}

let unwatchSize= watch(()=>[props.config.x,props.config.y],()=>{
    myChart?.resize()
})
let unwatchOption = watch(
  () => chartOption,
  (newVal) => {
    init()
  },
  { deep: true, flush: 'post', immediate: true }
)

onBeforeUnmount(() => {
  unwatchSize?.()
  unwatchOption?.()
  destroyHand(myChart)
})
</script>

<style lang="scss" scoped></style>
../../types/type