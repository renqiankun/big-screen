<template>
  <sketchRule :pannel="pannel" >
    <VueDragResizeRotate
      v-for="item in pannel.components"
      @refLineParams="refLineParams"
      :snap="true"
      :snap-distance="10"
      :scaleRatio="pannel.scale"
    >
      <p>123</p>
    </VueDragResizeRotate>
    <subLine ref="subLineRef" />
    <Area />
  </sketchRule>
</template>

<script setup lang="ts">
import sketchRule from './sketch-rule/index.vue'
import { type IPannel } from '../type'
import subLine from './subLine.vue'
import Area from './Area.vue'
import { ref } from 'vue'
const props = withDefaults(defineProps<{ pannel: IPannel }>(), {})

let subLineRef = ref()
const refLineParams = (data: any) => {
  subLineRef.value?.init(data)
}
</script>

<style lang="scss" scoped></style>
