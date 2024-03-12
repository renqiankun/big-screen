<template>
  <div
    :style="{
      left: dataForm.start.x + 'px',
      top: dataForm.start.y + 'px',
      width: dataForm.width + 'px',
      height: dataForm.height + 'px'
    }"
    class="area"
  ></div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

let dataForm = reactive({
  start: {
    x: 0,
    y: 0
  },
  width: 0,
  height: 0
})
</script>

<style lang="scss" scoped>
.area {
  border: 1px solid #70c0ff;
  position: absolute;
}
</style>
