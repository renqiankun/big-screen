<template>
  <div class="size-wrap">
    <div>
      <span class="text">宽度</span>
      <el-input-number
        size="small"
        controls-position="right"
        v-model="pannel.width"
      ></el-input-number>
    </div>
    <div>
      <span class="text">高度</span>
      <el-input-number
        size="small"
        controls-position="right"
        v-model="pannel.height"
      ></el-input-number>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IPannel } from '../../type'

const props = defineProps<{
  pannel: IPannel
}>()
</script>

<style lang="scss" scoped>
.size-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: var(--screen-primary-text-color);
  .text {
    margin-right: 10px;
  }
}
</style>
