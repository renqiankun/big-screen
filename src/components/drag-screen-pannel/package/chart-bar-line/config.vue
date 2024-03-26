<template>
  <el-tabs class="tabs-full-width" v-model="activeName">
    <el-tab-pane label="基础" name="base">
      <baseName v-model="current.baseConfig.label" />
      <baseSize :current="current" />
      <basePosition :current="current" :pannel="pannel" />
      <!-- echarts配置开始 -->
      <el-collapse v-model="chartActive">
        <el-collapse-item title="容器（grid）">
          <baseGrid :current="current" />
        </el-collapse-item>
        <baseLegend :current="current" />
        <!-- x轴配置 -->
        <baseX :x-axis="option.xAxis[0]" />
        <!-- y轴配置 -->
        <baseY :y-axis="option.yAxis[0]" />
        <baseSeries :current="current" />
      </el-collapse>
    </el-tab-pane>
    <el-tab-pane label="Config" name="second">Config</el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import type { IChartOption, IComponent, IPannel } from '@/components/drag-screen-pannel/type'
import baseName from '@/components/drag-screen-pannel/attr-right/componnet-attr/base-name.vue'
import baseSize from '@/components/drag-screen-pannel/attr-right/componnet-attr/base-size.vue'
import basePosition from '@/components/drag-screen-pannel/attr-right/componnet-attr/base-position.vue'
import baseGrid from '@/components/drag-screen-pannel/attr-right/componnet-attr/base-grid.vue'
import baseLegend from '@/components/drag-screen-pannel/attr-right/componnet-attr/base-legend.vue'
import baseX from '@/components/drag-screen-pannel/attr-right/componnet-attr/base-x.vue'
import baseY from '@/components/drag-screen-pannel/attr-right/componnet-attr/base-y.vue'
import baseSeries from '@/components/drag-screen-pannel/attr-right/componnet-attr/base-series/base-series.vue'
import { computed, ref } from 'vue'
const props = defineProps<{
  pannel: IPannel
  current: IComponent
}>()
let option = computed(() => {
  return props.current.option as IChartOption
})
let activeName = ref('base')

let chartActive = ref('')
</script>

<style lang="scss" scoped></style>
