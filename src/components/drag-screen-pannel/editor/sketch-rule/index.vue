<template>
  <div ref="wrapRef" class="sketch-wrap">
    <SketchRule
      :thick="thick"
      :scale="scale"
      :width="canvasBox().width"
      :height="canvasBox().height"
      :start-x="startX"
      :start-y="startY"
      :isShowReferLine="isShowReferLine"
      @onCornerClick="handleCornerClick"
      :lines="lines"
    />
    <div class="edit-screens" ref="screensRef" @wheel="handleWheel" @scroll="handleScroll">
      <div ref="containerRef" class="screen-container" :style="wrapStyle">
        <div class="canvas" ref="canvasRef" :style="canvasStyle">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import { SketchRule } from 'vue3-sketch-ruler'
import 'vue3-sketch-ruler/lib/style.css'
import { debounce } from 'lodash-es'
import { IPannel } from '../../type'
const props = withDefaults(
  defineProps<{
    pannel: IPannel
  }>(),
  {}
)
const thick = 20
let wrapRef = ref()
const screensRef: any = ref()
const containerRef = ref()
const canvasRef = ref()
let isShowReferLine = ref(false)
const lines = reactive({ h: [], v: [] })
let startX = ref(0)
let startY = ref(0)
// let scale = ref(1)
let scale = computed({
  get() {
    return props.pannel.scale
  },
  set(newVal) {
    props.pannel.scale = newVal
  }
})

let canvasWidth = computed(() => {
  return props.pannel.width
})
let canvasHeight = computed(() => {
  return props.pannel.height
})
let wrapStyle = computed(() => {
  return {
    width: canvasWidth.value + 'px',
    height: canvasHeight.value + 'px'
  }
})
const canvasStyle = computed(() => {
  return {
    width: canvasWidth.value + 'px',
    height: canvasHeight.value + 'px',
    transform: `scale(${scale.value})`
  }
})
onMounted(() => {
  canvasBox()
  resetRate()
  initEvent()
  setContainerCenter()
})

// 计算画布大小
const canvasBox = () => {
  const layoutDom = wrapRef.value
  if (layoutDom) {
    // 此处减去滚动条的宽度和高度
    const scrollW = 20
    return {
      height: layoutDom.clientHeight - scrollW,
      width: layoutDom.clientWidth - scrollW
    }
  }
  return {
    width: 200,
    height: 200
  }
}

const resetRate = async () => {
  const width = canvasBox().width
  const height = canvasBox().height
  const editCanvasWidth = canvasWidth.value
  const editCanvasHeight = canvasHeight.value

  // 需保持的比例
  const baseProportion = parseFloat((editCanvasWidth / editCanvasHeight).toFixed(5))
  const currentRate = parseFloat((width / height).toFixed(5))
  if (currentRate > baseProportion) {
    // 表示更宽
    const scaleWidth = parseFloat(((height * baseProportion) / editCanvasWidth).toFixed(5))
    let scaleValue = scaleWidth > 1 ? 1 : scaleWidth
    scale.value = scaleValue - 0.02
  } else {
    // 表示更高
    const scaleHeight = parseFloat((width / baseProportion / editCanvasHeight).toFixed(5))
    let scaleValue = scaleHeight > 1 ? 1 : scaleHeight
    scale.value = scaleValue - 0.02
  }
  await nextTick()
  handleScroll()
}

const handleScroll = () => {
  const screensRect = screensRef.value.getBoundingClientRect()
  const canvasRect = canvasRef.value.getBoundingClientRect()

  // 标尺开始的刻度
  const startXNum = (screensRect.left + thick - canvasRect.left) / scale.value
  const startYNum = (screensRect.top + thick - canvasRect.top) / scale.value
  startX.value = startXNum
  startY.value = startYNum
}
const handleCornerClick = (e: any) => {
  console.log('handleCornerClick', e)
}
// 控制缩放值
const handleWheel = async (e: {
  ctrlKey: any
  metaKey: any
  preventDefault: () => void
  deltaY: number
}) => {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault()
    const nextScale = parseFloat(Math.max(0.1, scale.value - e.deltaY / 1000).toFixed(2))
    scale.value = nextScale
  }
  await nextTick()
  handleScroll()
}

// 设置居中
const setContainerCenter = async () => {
  if (!screensRef.value) return
  const { width, height } = canvasBox()
  screensRef.value.scrollLeft = canvasWidth.value / 2 - width / 2 - 15
  screensRef.value.scrollTop = canvasHeight.value / 2 - height / 2 - 15
}

const resizeAndCenter = async () => {
  await resetRate()
  setContainerCenter()
}
const resizeHand = debounce(resizeAndCenter, 200)
const initEvent = () => {
  window.addEventListener('resize', resizeHand)
}
</script>

<style lang="scss" scoped>
.sketch-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  background-image: linear-gradient(#fafafc 14px, transparent 0),
    linear-gradient(90deg, transparent 14px, #373739 0);
  background-size:
    15px 15px,
    15px 15px;
  .edit-screens {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: auto;
    user-select: none;
    padding-bottom: 0px;

    /* firefox */
    scrollbar-color: rgba(144, 146, 152, 0.3) transparent;
    scrollbar-width: thin;

    /* chrome */
    &::-webkit-scrollbar,
    &::-webkit-scrollbar-track-piece {
      background-color: transparent;
    }

    &::-webkit-scrollbar {
      width: 7px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: rgba(144, 146, 152, 0.3);
    }
    // 修复右下角白点用的
    &::-webkit-scrollbar-corner {
      background-color: transparent;
    }
  }

  .screen-container {
    position: absolute;
  }

  .scale-value {
    position: absolute;
    bottom: 100%;
    left: 0;
  }

  .button {
    position: absolute;
    bottom: 100%;
    left: 100px;
  }

  .canvas {
    position: absolute;
    background-color: #e1e1e1;
  }
}
</style>
