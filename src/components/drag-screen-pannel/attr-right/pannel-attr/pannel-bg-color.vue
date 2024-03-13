<template>
  <div class="pannel-color-block">
    <span class="pannel-bg-text">背景颜色</span>
    <el-color-picker show-alpha :model-value="modelValue" @change="changeHand" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string | undefined
}>()
const changeHand = (val: any) => {
  emits('update:modelValue', val)
}
const emits = defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped>
.pannel-color-block {
  display: flex;
  align-items: center;
  ::v-deep(.el-color-picker) {
    flex: 1;
    .el-color-picker__trigger {
      width: 100%;
    }
  }
}
.pannel-bg-text {
  font-size: 12px;
  color: var(--screen-text-color);
  margin-right: 10px;
}
</style>
