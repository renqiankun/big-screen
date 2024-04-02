<template>
  <el-tabs class="tabs-full-width" v-model="activeName">
    <el-tab-pane label="基础" name="base">
      <baseName v-model="current.baseConfig.label" />
      <baseSize :current="current" />
      <basePosition :current="current" :pannel="pannel" />
      <datePickerNormal :option="option"/>
      <!-- echarts配置开始 -->
      <el-collapse v-model="chartActive">
      </el-collapse>
    </el-tab-pane>
    <el-tab-pane label="接口" name="second">
      <request v-model:request="current.request" v-model:globalRequest="pannel.globalRequest" :globalVariable="pannel.globalVariable"/>
    </el-tab-pane>
    <el-tab-pane label="事件" name="third">
        <baseEvents :pannel="pannel" :current="current"/>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import type { IChartOption, IComponent, IPannel } from '@/components/drag-screen-pannel/types/type'
import baseName from '@/components/drag-screen-pannel/attr-right/componnet-attr/base-name.vue'
import baseSize from '@/components/drag-screen-pannel/attr-right/componnet-attr/base-size.vue'
import basePosition from '@/components/drag-screen-pannel/attr-right/componnet-attr/base-position.vue'
import { computed, ref } from 'vue'
import request from '@/components/drag-screen-pannel/request/request.vue'
import datePickerNormal from '@/components/drag-screen-pannel/attr-right/componnet-attr/date-picker-normal.vue'
import type { IDatePicker } from '../../types/date-picker'
import baseEvents from '@/components/drag-screen-pannel/attr-right/componnet-attr/base-events.vue'
const props = defineProps<{
  pannel: IPannel
  current: IComponent
}>()
let option = computed(() => {
  return props.current.option as IDatePicker
})
let activeName = ref('base')

let chartActive = ref('')
</script>

<style lang="scss" scoped></style>