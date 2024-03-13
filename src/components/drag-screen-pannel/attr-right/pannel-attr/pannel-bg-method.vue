<template>
  <div class="bg-method">
    <span class="text">背景控制</span>
    <el-radio-group :model-value="modelValue" @change="changeMethod">
      <el-tooltip v-for="item in methodList" :content="item.label" effect="dark" placement="top">
        <el-radio-button size="small" :value="item.value">
          <el-icon size="12"><component :is="item.icon"></component></el-icon>
        </el-radio-button>
      </el-tooltip>
    </el-radio-group>
  </div>
</template>

<script setup lang="ts">
import type { IPannel } from '../../type'
import { CopyDocument, Files, ScaleToOriginal } from '@element-plus/icons-vue'
const props = defineProps<{
  modelValue: string | undefined
  pannel: IPannel
}>()
let methodList = [
  { label: '自适应比例填满，图片可能被截断 (推荐)', value: 'cover', icon: CopyDocument },
  { label: '自适应比例完整展示背景，可能会留白', value: 'contain', icon: Files },
  { label: '拉伸图片完整填充', value: '100% 100%', icon: ScaleToOriginal }
]
const changeMethod = (value: any) => {
  emits('update:modelValue', value)
}
const emits = defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped>
.bg-method {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: var(--screen-primary-text-color);
  white-space: nowrap;
  .text{
    margin-right: 10px;
  }
  ::v-deep(.el-radio-group) {
    width: 100%;
    .is-active {
      .el-radio-button__inner {
        --el-radio-button-checked-bg-color: var(--el-fill-color-blank);
        color: var(--el-color-primary);
      }
    }
    .el-radio-button__inner {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
}
</style>
