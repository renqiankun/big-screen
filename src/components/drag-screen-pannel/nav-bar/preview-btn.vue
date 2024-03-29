<template>
  <el-button @click="previewHand(true)">静态预览</el-button>
  <el-button @click="previewHand(false)">调用接口预览</el-button>

  <el-dialog
    width="1200px"
    title="预览"
    v-model="dialogVisible"
    append-to-body
    destroy-on-close
    align-center
  >
    <bigScreenPreview :pannel="pannel" :global-variable="globalVariable" :dev="dev" />
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import bigScreenPreview from '@/components/big-screen-preview/big-screen-preview.vue'
import type { IPannel } from '../types/type'
const props = withDefaults(
  defineProps<{
    pannel: IPannel
  }>(),
  {}
)
let dev = ref(true)

let globalVariable = {
  token: 'global-token'
}
let dialogVisible = ref(false)

const previewHand = (type: boolean) => {
  dev.value = type
  dialogVisible.value = true
}
</script>

<style lang="scss" scoped></style>
