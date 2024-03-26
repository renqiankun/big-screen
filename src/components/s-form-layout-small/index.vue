<template>
  <div class="s-form-layout-small">
    <div class="title">
      <slot name="title">
        {{ title }}
        <el-tooltip v-if="desc" :content="desc" placement="top">
          <el-icon ><Warning /></el-icon>
        </el-tooltip>
      </slot>
    </div>
    <div class="value">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Warning } from '@element-plus/icons-vue'
const props = defineProps<{
  title: string
  desc?: string
  rate?: number
}>()
let rate = computed(() => {
  return props.rate ? props.rate : 100
})
</script>

<style lang="scss" scoped>
.s-form-layout-small {
  display: inline-block;
  width: v-bind("rate+'%'");
}
.title {
  color: #5c5c5c;
  font-size: 12px;
  margin-top: 2px;
  display: inline-flex;
  align-items: center;
  column-gap: 3px;
}
</style>
<style lang="scss">
.s-form-layout-small {
  box-sizing: border-box;
  padding-right: 10px;
  // &:last-child{
  //   padding-right: 0;
  //   padding-left: 0;
  // }
}
</style>
