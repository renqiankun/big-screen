<template>
  <div>
    <form-layout title="全局配置">
      <sFormLayout title="源地址">
        <el-input size="small" placeholder="http://example.com"></el-input>
      </sFormLayout>
      <sFormLayout :rate="50" title="超时时间（秒）">
        <el-input-number size="small"></el-input-number>
      </sFormLayout>
      <sFormLayout :rate="50" title="循环间隔（秒）" desc="不填或为0时, 只执行一次">
        <el-input-number size="small"></el-input-number>
      </sFormLayout>
    </form-layout>
  </div>
</template>

<script setup lang="ts">
import formLayout from '@/components/form-layout/index.vue'
import sFormLayout from '@/components/s-form-layout-small/index.vue'
import { ref } from 'vue';

const props = withDefaults(
  defineProps<{
    globalRequest: any
  }>(),
  {
    globalRequest: () => ({})
  }
)

let visible = ref(false)
</script>

<style lang="scss" scoped></style>
