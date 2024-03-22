<template>
  <div class="attr-wrap">
    <el-scrollbar height="100%">
        <pannelConfig v-if="!current" :pannel="pannel"/>
        <componentConfig v-else :pannel="pannel" :current="current"/>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import pannelConfig from './pannel-config.vue';
import type { IComponent, IPannel } from '../type';
import componentConfig from './component-config.vue';
const props = defineProps<{
    pannel:IPannel
    current:IComponent | undefined | null
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
