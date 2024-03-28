<template>
  <form-layout title="尺寸">
    <div class="wrap">
        宽
        <el-input-number controls-position="right" size="small" v-model="w"></el-input-number>
        高
        <el-input-number controls-position="right" size="small" v-model="h"></el-input-number>

    </div>
  </form-layout>
</template>

<script setup lang="ts">
import formLayout from '@/components/form-layout/index.vue'
import type { IComponent, IPannel } from '../../type'
import { computed } from 'vue'
const porps = defineProps<{
  current: IComponent
}>()
let w = computed({
  get() {
    return porps.current.w as number
  },
  set(val: number) {
    porps.current.w = val
  }
})

let h = computed({
  get() {
    return porps.current.h as number
  },
  set(val: number) {
    porps.current.h = val
  }
})
</script>

<style lang="scss" scoped>
.wrap{
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  align-items: center;
}
</style>
../../types/type