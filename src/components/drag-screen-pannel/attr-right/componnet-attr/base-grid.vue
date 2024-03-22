<template>
  <!-- echarts基本配置 -->
  <form-layout :margin="false" title="距离">
    <div class="wrap">
      <span class="posi-name">上</span>
      <el-input size="small" v-model="grid.top"></el-input>
      <span class="posi-name posi-name2">下</span>
      <el-input size="small" v-model="grid.bottom"></el-input>
    </div>
    <div class="wrap">
      <span class="posi-name">左</span>
      <el-input size="small" v-model="grid.left"></el-input>
      <span class="posi-name posi-name2">右</span>
      <el-input size="small" v-model="grid.right"></el-input>
    </div>
  </form-layout>
</template>

<script setup lang="ts">
import FormLayout from '@/components/form-layout/index.vue'
import type { IChartOption, IComponent } from '../../type'
import { computed } from 'vue'
const props = defineProps<{
  current: IComponent
}>()
let grid = computed(() => {
  return (props.current.option as IChartOption).grid
})
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  align-items: center;
  margin-bottom: 12px;
  .posi-name {
    display: inline-block;
    margin-right: 3px;
  }
  .posi-name2{
    margin-left: 10px;
  }
}

</style>
