<template>
  <div class="nav-bar-wrap">
    <div class="nav-bar-left"></div>
    <div class="nav-bar-right">
      <previewBtn :pannel="pannel"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IPannel } from '../types/type';
import previewBtn from './preview-btn.vue'
const props = withDefaults(defineProps<{
    pannel:IPannel
}>(),{})
</script>

<style lang="scss" scoped>
.nav-bar-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  box-sizing: border-box;
  padding: 0 10px;
  .nav-bar-left,
  .nav-bar-right {
    display: flex;
    align-items: center;
    height: 100%;
  }
}
</style>
