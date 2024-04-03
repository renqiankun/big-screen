<template>
  <div class="wrap">
    <bigScreenAdaptor :width="pannel.width" :height="pannel.height">
      <div :style="screenContainerStyleHand()" class="big-screen-container">
        <div class="big-screen-component" v-for="(item,index) in componentList" :style="getSytleHand(item)">
          <component
            :is="item.baseConfig.component"
            :dev="dev"
            v-model:config="componentList[index]"
            :pannel="pannel"
          ></component>
        </div>
      </div>
    </bigScreenAdaptor>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import bigScreenAdaptor from '../big-screen-adaptor/big-screen-adaptor.vue'
import type { IComponent, IPannel, IBaseConfig } from '../drag-screen-pannel/types/type'

const props = withDefaults(
  defineProps<{
    dev: boolean
    pannel: IPannel
    // 全局变量
    globalVariable: Record<any, any>
  }>(),
  {}
)
let componentList = computed<Array<IComponent>>(() => {
  return props.pannel.components
})

const screenContainerStyleHand = () => {
  return {
    with: props.pannel.width + 'px',
    height: props.pannel.height + 'px',
    backgroundColor: props.pannel.bgColor,
    backgroundImage: `url(${props.pannel.bgImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: props.pannel.bgMethod
  }
}
const getSytleHand: any = (item: IComponent) => {
  return {
    width: item.w + 'px',
    height: item.h + 'px',
    left: item.x + 'px',
    top: item.y + 'px',
    zIndex: item.z,
    transform: `rotate(${item.r || 0}deg) translateZ(1px)`,
    position: 'absolute'
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 550px;
}
</style>
