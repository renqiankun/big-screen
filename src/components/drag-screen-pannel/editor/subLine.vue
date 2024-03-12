<template>
  <span
    class="ref-line v-line"
    v-for="(item, index) in vLine"
    :key="'v_' + index"
    v-show="item.display"
    :style="{
      left: item.position,
      top: item.origin,
      height: item.lineLength,
    }"
  ></span>
  <span
    class="ref-line h-line"
    v-for="(item, index) in hLine"
    :key="'h_' + index"
    :style="{
      top: item.position,
      left: item.origin,
      width: item.lineLength,
    }"
  ></span>
</template>

<script setup lang="ts">
import { ref } from "vue";

let vLine: any = ref([]);
let hLine: any = ref([]);
const init = (params: any) => {
  vLine.value = params.vLine;
  hLine.value = params.hLine;
};
defineExpose({ init });
</script>

<style lang="scss" scoped>
.ref-line {
  position: absolute;
  background-color: rgb(219, 89, 110);
  z-index: 9999;
}
.v-line {
  width: 1px;
}
.h-line {
  height: 1px;
}
</style>
