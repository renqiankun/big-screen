<template>
  <Layout>
    <template #nav>
      <navBar :pannel="pannel" />
    </template>
    <template #left>
      <toolLeft />
    </template>
    <template #mid>
      <sketchRule :pannel="props.pannel">
        <div
          class="content-wrap"
          ref="contentRef"
          @mousedown.self="setEditFocus(true)"
          @dragover="checkDrop"
          @drop="dropHand"
          v-on-click-outside="editorBlurHand"
          @contextmenu="onContextMenu($event)"
          :style="pannelStyle"
        >
          <VueDragResizeRotate
            v-for="item in props.pannel.components"
            @refLineParams="refLineParams"
            :snap="true"
            :snap-distance="10"
            :scaleRatio="props.pannel.scale"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :r="item.r"
            :active="item.active"
            rotatable
            :prevent-deactivation="item.preventDeactivation"
            @activated="onActivated(item)"
            @deactivated="onDeactivated(item)"
            @resizing="
              (x: any, y: any, width: any, height: any) => onResize(x, y, width, height, item)
            "
            @resizestop="
              (x: any, y: any, width: any, height: any) => onResize(x, y, width, height, item)
            "
            @dragging="(left: any, top: any) => dragging(item, left, top)"
            @dragstop="(left: any, top: any) => dragstop(item, left, top)"
            @rotating="(rotate: any) => onRotating(rotate, item)"
            @rotatestop="(rotate: any) => onRotating(rotate, item)"
          >
            <component :is="item.baseConfig.component" :config="item" :pannel="pannel"></component>
          </VueDragResizeRotate>
          <subLine ref="subLineRef" />
          <Area
            v-model:areaSelecting="isAreaSelect"
            v-if="contentRef"
            :content="contentRef"
            :pannel="pannel"
            :current="current"
          />
        </div>
      </sketchRule>
    </template>

    <template #right>
      <attrRight :pannel="pannel" :current="current" />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import Layout from './layout.vue'
import sketchRule from './editor/sketch-rule/index.vue'
import subLine from './editor/subLine.vue'
import Area from './editor/Area.vue'
import { type IComponent, type IPannel } from './types/type'
import { reactive, computed, ref } from 'vue'
import toolLeft from './tool-left/index.vue'
import { getUUID } from '@/utils/index'
import { unbindKey, isControlHand, copyHandler, parseHandler, deleteHand } from './keybord'
import { vOnClickOutside } from '@vueuse/components'
import { useClipboard } from '@vueuse/core'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'
import attrRight from './attr-right/index.vue'
import navBar from './nav-bar/nav-bar.vue'
const props = defineProps<{
  pannel: IPannel
}>()
let contentRef = ref()

let dataForm = reactive({
  draggingId: '',
  isAllAsync: false,
  prevOffsetX: 0,
  prevOffsetY: 0,
  controlKey: false,
  editFocus: false
})
let isAreaSelect = ref(false) // 框选中
let active = computed(() => {
  let activeList = props.pannel.components?.filter?.((item: any) => {
    return item.active
  })
  if (activeList?.length > 1) {
    return { current: null, select: activeList }
  } else {
    return { current: activeList[0], select: activeList }
  }
})

let current = computed(() => {
  return active.value.current
})
let select = computed(() => {
  return active.value.select
})

let pannelStyle = computed(() => {
  let bgColor = props.pannel.bgColor
  let bgImg = props.pannel.bgImg
  let bgMethod = props.pannel.bgMethod
  let resetStyle: any = {}
  if (bgColor) {
    resetStyle.backgroundColor = bgColor
  }
  if (bgImg) {
    resetStyle.backgroundImage = `url(${bgImg})`
    resetStyle.backgroundRepeat = 'no-repeat'
    resetStyle.backgroundPosition = 'center'
  }
  if (bgMethod) {
    resetStyle.backgroundSize = bgMethod
  }
  return resetStyle
})

const copyValue = ref('')
const { text: copyText, copy } = useClipboard({ source: copyValue })
copyHandler((e: any) => {
  if (!dataForm.editFocus || !select.value.length) return
  copyValue.value = JSON.stringify(select.value)
  copy()
})

parseHandler((e: any) => {
  if (!dataForm.editFocus) return
  let copyData = copyText.value
  try {
    let copyDataList = JSON.parse(copyData)
    let newCopyDataList = copyDataList.map((item: any) => {
      return { ...item, id: getUUID(), x: item.x + 10, y: item.y + 10, active: false }
    })
    props.pannel.components.push(...newCopyDataList)
  } catch (e) {}
})

deleteHand(() => {
  props.pannel.components = props.pannel.components.filter((item: any) => {
    return !item.active
  })
})
let subLineRef = ref()
const refLineParams = (data: any) => {
  subLineRef.value?.init(data)
}

const onActivated = async (item: any) => {
  if (!isAreaSelect.value && !isControlHand()) {
    select.value?.forEach?.((el: any) => {
      el.active = false
      el.preventDeactivation = false
    })
  }
  dataForm.editFocus = true
  item.preventDeactivation = true
  item.active = true
}
const onDeactivated = (item: any) => {
  item.active = false
  item.preventDeactivation = false
}

const onResize = (x?: any, y?: any, width?: any, height?: any, item?: any) => {
  Object.assign(item, {
    x,
    y,
    w: width || item.width,
    h: height || item.width
  })
}

const dragging = (id: any, left: any, top: any) => {
  dataForm.draggingId = id
  const offsetX = left - (id.x ?? 0)
  const offsetY = top - (id.y ?? 0)
  const deltaX: any = deltaXHand(offsetX)
  const deltaY: any = deltaYHand(offsetY)
  // 仅激活的移动
  if (!dataForm.isAllAsync) {
    select?.value.forEach?.((el: any) => {
      if (el.active && el !== id && !el.lock) {
        el.x = (el.x ?? 0) + deltaX
        el.y = (el.y ?? 0) + deltaY
      }
    })
    return
  }
  // 全部移动
  props.pannel.components.forEach((el: any) => {
    if (el !== id && !el.lock) {
      el.x = (el.x ?? 0) + deltaX
      el.y = (el.y ?? 0) + deltaY
    }
  })
}
const dragstop = (id: any, left: any, top: any) => {
  select.value?.forEach?.((el) => {
    if (el === id) {
      el.x = left
      el.y = top
    }
  })
  dataForm.draggingId = ''
  dataForm.prevOffsetX = 0
  dataForm.prevOffsetY = 0
}
const deltaXHand = (offsetX: any) => {
  const ret = offsetX - dataForm.prevOffsetX
  dataForm.prevOffsetX = offsetX
  return ret
}
const deltaYHand = (offsetY: any) => {
  const ret = offsetY - dataForm.prevOffsetY
  dataForm.prevOffsetY = offsetY
  return ret
}

const onRotating = (rotate: any, item: any) => {
  item.r = rotate
}

const checkDrop = (e: any) => {
  e.preventDefault()
}

const dropHand = (e: any) => {
  e.preventDefault()
  e.stopPropagation()
  let scale = props.pannel.scale
  const componentStr = e.dataTransfer.getData('component')
  let component: any = JSON.parse(componentStr)
  let { x: reactX, y: reactY } = contentRef.value.getBoundingClientRect()
  let { clientX: mouseX, clientY: mouseY } = e
  let x = mouseX - reactX
  let y = mouseY - reactY
  let width = component.w
  let height = component.h
  if (component) {
    component.x = x / scale - width / 2
    component.y = y / scale - height / 2
    component.id = getUUID()
    props.pannel.components.push(component)
  }
}

const setEditFocus = (status: boolean) => {
  dataForm.editFocus = status
  if (isControlHand()) return
  select.value.forEach((item: any) => {
    item.active = false
    item.preventDeactivation = false
  })
}
const editorBlurHand = () => {
  dataForm.editFocus = false
  // console.log('editorBlurHand', select.value)
  select.value.forEach((item: any) => {
    item.preventDeactivation = true
  })
}

const onContextMenu = (e: any) => {
  return
  e.preventDefault()
  ContextMenu.showContextMenu({
    x: e.x,
    y: e.y,
    items: [
      {
        label: 'A menu item',
        onClick: () => {}
      }
    ]
  })
}
</script>

<style lang="scss" scoped>
.content-wrap {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
./types/type
