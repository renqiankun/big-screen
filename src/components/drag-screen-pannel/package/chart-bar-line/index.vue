<template>
  <div class="package-com-wrap">
    <div ref="nodeRef" class="package-item"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { IChartOption, IComponent } from '../../types/type'
import { hideTooTipHand, destroyHand } from '../utils'
import dataJson from './data.json'
import type { IGlobalRequest } from '../../types/request'
import { httpHand } from '../http/http'
const props = withDefaults(
  defineProps<{
    dev?: boolean // 开发模式
    config: IComponent
    globalRequest?: IGlobalRequest
    pannelGlobalVariable?: Record<any, any>
    globalVariable?: Record<any, any>
  }>(),
  {
    dev: true,
    globalRequest: () => ({}) as IGlobalRequest,
    pannelGlobalVariable: () => ({}),
    globalVariable: () => ({})
  }
)
let isDev = computed(() => props.dev)
let nodeRef = ref()
let myChart: any = ''
let chartOption = computed<IChartOption>(() => {
  return props.config.option as IChartOption
})

let unwatchSize: any = null
let unwatchOption: any = null
onMounted(() => {
  if (isDev.value) {
    initWatch()
  }else{
    init()
  }
})

onBeforeUnmount(() => {
  unwatchSize?.()
  unwatchOption?.()
  destroyHand(myChart)
})

const init = async () => {
  await nextTick()
  if (!myChart) {
    myChart = echarts.init(nodeRef.value)
  }
  let data = await getHttpData()
  let option = {
    ...chartOption.value,
    dataset: isDev.value ? dataJson : data
  }
  hideTooTipHand(myChart)
  myChart.setOption(option)
}
const getHttpData = async () => {
  let params = {
    globalRequest: props.globalRequest as IGlobalRequest,
    request: props.config.request,
    globalVariable: {
      ...props.pannelGlobalVariable,
      ...props.globalVariable
    }
  }
  let res = await httpHand(params)
  return res || []
}
const initWatch = () => {
  unwatchSize = watch(
    () => [props.config.x, props.config.y],
    () => {
      myChart?.resize()
    }
  )
  unwatchOption = watch(
    () => chartOption,
    (newVal) => {
      init()
    },
    { deep: true, flush: 'post', immediate: true }
  )
}
</script>

<style lang="scss" scoped></style>
