<template>
  <div class="config-wrap">
    <chartBarLineConfig :pannel="pannel" :current="current" />
  </div>
</template>

<script setup lang="ts">
import type { IComponent, IPannel } from '../type'
import chartBarLineConfig from '@/components/drag-screen-pannel/package/chart-bar-line/config.vue'
const props = defineProps<{
  pannel: IPannel
  current: IComponent
}>()
</script>

<style lang="scss" scoped>
.config-wrap {
  width: 100%;
  ::v-deep(.el-tabs__nav) {
    float: unset;
    .el-tabs__item {
      flex: 1;
    }
  }
  ::v-deep(.el-collapse) {
    --el-collapse-header-bg-color: transparent;
    --el-collapse-content-bg-color: transparent;
    .el-collapse-item__content{
        padding-left: 10px;
    }
  }
}
</style>
