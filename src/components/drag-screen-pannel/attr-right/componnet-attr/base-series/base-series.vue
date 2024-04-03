<template>
  <el-collapse-item>
    <template #title>
      <div class="title-wrap">
        <span>系列（series）</span>
        <el-icon @click.stop="addType"><Plus /></el-icon>
      </div>
    </template>

    <el-tabs
      size="small"
      v-model="editableTabsValue"
      type="border-card"
      class="series-tab"
      closable
      @tabRemove="removeHand"
    >
      <el-tab-pane v-for="(item, index) in series" :label="item.type" :name="index">
        <baseSeriesBarLine :seriesItem="item" :option="current.option" />
      </el-tab-pane>
    </el-tabs>
  </el-collapse-item>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { IComponent, IChartOption } from '../../../types/type'
import baseSeriesBarLine from './base-series-bar-line.vue'
import { Plus } from '@element-plus/icons-vue'
import type { IbarLineSeries } from '@/components/drag-screen-pannel/types/base'
const props = defineProps<{
  current: IComponent
}>()

let series = computed({
  get: () => {
    return (props.current.option as IChartOption).series
  },
  set: (val) => {
    ;(props.current.option as IChartOption).series = val
  }
})

const editableTabsValue = ref(0)

const addType = () => {
  let item: IbarLineSeries = {
    type: 'bar',
    backgroundStyle: {},
    itemStyle: {},
    lineStyle: {},
    label: {}
  }
  ;(props.current.option as IChartOption).series.push(item)
}

const removeHand = (index:any) => {
  let newSeries = series.value.filter((item, i) => i !== index)
  series.value = newSeries
}

const emits = defineEmits(['update:current'])
</script>

<style lang="scss" scoped>
.title-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding-right: 5px;
}

.series-tab {
  ::v-deep(.el-tabs__nav) {
    .el-tabs__item {
      padding: 0 !important;
      min-width: 70px;
    }
    .el-icon {
      display: none;
    }
    .is-active {
      .el-icon {
        display: inline-block;
      }
    }
  }
}
</style>
../../../types/type
