<template>
  <div class="package-com-wrap">
    <div ref="nodeRef" class="package-item"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, toRef, watch, type Ref } from 'vue'
import type { IChartOption, IComponent, IPannel } from '../../types/type'
import { hideTooTipHand, destroyHand } from '../utils'
import dataJson from './data.json'
import type { IGlobalRequest } from '../../types/request'
import { useHttpHand } from '../http/http'
const props = withDefaults(
  defineProps<{
    dev?: boolean // 开发模式  静态数据或 http请求数据
    config: IComponent
    pannel: IPannel
    // 预览组件传入的业务全局变量
    globalVariable?: Record<any, any>
  }>(),
  {
    dev: true
  }
)
let isDev = computed(() => props.dev)
let nodeRef = ref()
let myChart: any = ''
let chartOption = computed<IChartOption>(() => {
  return props.config.option as IChartOption
})

onBeforeUnmount(() => {
  destroyHand(myChart)
})

const init = async () => {
  await nextTick()
  if (!myChart) {
    myChart = echarts.init(nodeRef.value)
  }
  let option = {
    ...chartOption.value,
    dataset: isDev.value ? dataJson : httpData.value || []
  }
  hideTooTipHand(myChart)
  myChart.setOption(option)
}
// 接口数据
let requestParams = computed(() => {
  return {
    globalRequest: props.pannel.globalRequest ?? ({} as IGlobalRequest),
    request: props.config.request ?? {},
    globalVariable: {
      ...props.pannel.globalVariable,
      ...props.globalVariable
    }
  }
})
let httpData: Ref = useHttpHand(requestParams, init)
watch(
  () => [props.config.x, props.config.y],
  () => {
    myChart?.resize()
  }
)
watch(
  () => chartOption,
  (newVal) => {
    init()
  },
  { deep: true, flush: 'post', immediate: true }
)
</script>

<style lang="scss" scoped></style>
