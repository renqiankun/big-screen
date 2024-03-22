<template>
<dragScreenPannel :pannel="pannel"/>
</template>

<script setup lang="ts">
import dragScreenPannel from '@/components/drag-screen-pannel/index.vue'
import { reactive } from 'vue';
import type { IPannel } from './components/drag-screen-pannel/type';
const pannel = reactive<IPannel>({
  scale: 1,
  width: 1920,
  height: 1080,
  components: [

  ]
})
</script>

<style lang="scss" scoped>

</style>