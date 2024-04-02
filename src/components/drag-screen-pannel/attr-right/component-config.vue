<template>
  <div class="config-wrap">
    <component :is="dyComponent" v-if="dyComponent" :pannel="pannel" :current="current" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { IComponent, IPannel } from '../types/type'
// import chartBarLineConfig from '@/components/drag-screen-pannel/package/chart-bar-line/config.vue'
// import chartPieConfig from '@/components/drag-screen-pannel/package/chart-pie/config.vue'
const props = defineProps<{
  pannel: IPannel
  current: IComponent
}>()

let dyComponent = computed(()=>{
  return props.current.baseConfig.configComponent || ''
})
// let isBar = computed(()=>{
//   return props.current.baseConfig.component === 'chart-bar-line'
// })
// let isPie = computed(()=>{
//   return props.current.baseConfig.component === 'chart-pie'
// })
// let isDatePicker = computed(()=>{
//   return props.current.baseConfig.component === 'date-picker'
// })
</script>

<style lang="scss" scoped>
.config-wrap {
  width: 100%;
  ::v-deep(.tabs-full-width) {
    & > .el-tabs__heade {
      .el-tabs__nav {
        float: unset;
        .el-tabs__item {
          flex: 1;
        }
      }
    }
  }
  ::v-deep(.el-collapse) {
    --el-collapse-header-bg-color: transparent;
    --el-collapse-content-bg-color: transparent;
    .el-collapse-item__content {
      padding-left: 10px;
    }
  }
}
</style>
../types/type