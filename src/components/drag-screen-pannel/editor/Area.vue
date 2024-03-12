<template>
  <div
    v-show="isShow && (dataForm.width > 2 || dataForm.height > 2)"
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
import { nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { type IPannel } from '../type'
import {getComponentRotatedStyle} from '@/utils'
const props = defineProps<{
  pannel: IPannel
  content: any
  current: any
  areaSelecting: boolean
}>()
let dataForm = reactive({
  start: {
    x: 0,
    y: 0
  },
  width: 0,
  height: 0
})
let isSelect = false
let isShow = ref(false)
onMounted(() => {
  initEventHand()
})
const initEventHand = async () => {
  await nextTick()
  props.content?.addEventListener?.('mousedown', initSelect)
}

const hideArea = ()=>{
  dataForm.width = 0
  dataForm.height = 0
}
const mouseMove = (e: any) => {
  if (!isSelect) return
  e.preventDefault()
  let { x, y } = getMousePos(e)

  dataForm.width = Math.abs(x - initStartX)
  dataForm.height = Math.abs(y - initStartY)
  if (x < initStartX) {
    dataForm.start.x = x
  }
  if (y < initStartY) {
    dataForm.start.y = y
  }
}
const mouseUp = async (e: any) => {
  isSelect = false
  isShow.value = false
  document.removeEventListener('mousemove', mouseMove)
  document.removeEventListener('mouseup', mouseUp)
  let {x,y} = getMousePos(e)
  if (x == initStartX && y == initStartY) {
    hideArea()
    return
  }
  emits('update:areaSelecting', true)
  getSelectArea()
  hideArea()

  await nextTick()
  emits('update:areaSelecting', false)
}
let initStartX = 0
let initStartY = 0
const initSelect = (e: any) => {
  if (e.target !== props.content) return
  isSelect = true
  isShow.value = true
  let { x, y } = getMousePos(e)
  dataForm.start.x = x
  dataForm.start.y = y
  initStartX = x
  initStartY = y
  document.addEventListener('mousemove', mouseMove)
  document.addEventListener('mouseup', mouseUp)
}

const getMousePos = (e: any) => {
  let { x: reactX, y: reactY } = props.content.getBoundingClientRect()
  let { clientX: mouseX, clientY: mouseY } = e
  let x = mouseX - reactX
  let y = mouseY - reactY
  let scale = props.pannel.scale
  return {
    x: x / scale,
    y: y / scale
  }
}

const getSelectArea = () => {
  // 区域起点坐标
  const { x, y } = dataForm.start
  // 计算所有的组件数据，判断是否在选中区域内
  props.pannel.components.forEach((component:any) => {
    // if (component.isLock) return;

    let componentAttr = component || {}
    const { left, top, width, height } = getComponentRotatedStyle({
      width: componentAttr.w === 'auto' ? 0 : parseFloat(componentAttr.w),
      height: componentAttr.h === 'auto' ? 0 : parseFloat(componentAttr.h),
      rotate: componentAttr.r,
      top: componentAttr.y,
      left: componentAttr.x
    })
    let isInArea =
      x <= left &&
      y <= top &&
      left + width <= x + dataForm.width &&
      top + height <= y + dataForm.height;
    if (isInArea && !component.lock) {
      component.preventDeactivation = true
      component.active = true
    } else {
      component.preventDeactivation = false
      component.active = false
    }
  })
}


const emits = defineEmits(['update:areaSelecting'])
</script>

<style lang="scss" scoped>
.area {
  border: 1px solid #70c0ff;
  position: absolute;
}
</style>
