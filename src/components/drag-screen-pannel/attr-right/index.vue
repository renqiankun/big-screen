<template>
  <div class="attr-wrap">
    <el-scrollbar height="100%">
        <pannelConfig :pannel="pannel"/>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import pannelConfig from './pannel-config.vue';
import type { IPannel } from '../type';
const props = defineProps<{
    pannel:IPannel
}>()
</script>

<style lang="scss" scoped>
.attr-wrap {
  background-color: #f2f3f5;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  padding: 10px;

}
</style>
