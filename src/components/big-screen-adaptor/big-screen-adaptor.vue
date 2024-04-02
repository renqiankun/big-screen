<template>
  <div ref="wrapRef" class="drag-editor-preivew-wrap">
    <div :class="{ 'drag-editor-preivew': true }" :style="styleCom">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts" name="bigScreenAdaptor">
import { nextTick, ref, onMounted, onBeforeUnmount } from 'vue'
const props = withDefaults(
  defineProps<{
    width?: any
    height?: any
    bgColor?: any
  }>(),
  {
    width: 100,
    height: 100
  }
)
let wrapRef = ref()
let styleCom = ref({})
onMounted(() => {
  getSytpeMapHand()
  lithenResizeHand()
})
onBeforeUnmount(() => {
  resizeObserver?.disconnect?.()
  wrapRef.value = null
  window.removeEventListener('resize', getSytpeMapHand)
})
const getSytpeMapHand = async () => {
  await nextTick()
  let styleMap = {
    transformOrigin: '0% 0%',
    width: props.width + 'px',
    height: props.height + 'px',
    backgroundColor: props.bgColor
  }
  let parentBounding = wrapRef.value.getBoundingClientRect()
  let { endRate, translateX, translateY } = getFitTransforOrigin(
    parentBounding.width,
    parentBounding.height
  )
  styleCom.value = {
    ...styleMap,
    transform: `translate(${translateX}px, ${translateY}px) scale(${endRate})`
  }
}

const getFitTransforOrigin = (width: number, height: number) => {
  // 父级宽高
  let rateX = width / props.width
  let rateY = height / props.height
  let endRate = rateX > rateY ? rateY : rateX
  let translateX = rateX <= rateY ? 0 : width * endRate
  let translateY = rateY <= rateX ? 0 : height * endRate
  return {
    endRate,
    translateX: translateX > 0 ? width / 2 - (props.width / 2) * endRate : translateX,
    translateY: translateY > 0 ? height / 2 - (props.height / 2) * endRate : translateY
  }
}
let resizeObserver: any = null
const lithenResizeHand = () => {
  if(!window.ResizeObserver){
    window.addEventListener('resize', getSytpeMapHand)
    return
  }
  resizeObserver = new ResizeObserver((entries) => {
    getSytpeMapHand()
  })
  resizeObserver.observe(wrapRef.value)
}
</script>

<style lang="scss" scoped>
.drag-editor-preivew-wrap {
  width: 100%;
  height: 100%;
  min-width: 100px;
  min-height: 100px;
}
.drag-editor-preivew {
  width: 100%;
  height: 100%;
}
</style>
