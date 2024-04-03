<template>
  <div class="component-item-wrap">
    <div class="title">
      <span class="title-text">{{ title }}</span>
    </div>
    <div class="content" @dragstart="handleDragStart">
      <div :draggable="true" class="img-wrap">
        <!-- <img :draggable="false" class="img" :src="img" :alt="title" /> -->
        <imgThumb :draggable="false" class="img" :img="img" :alt="title" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IGlobalRequest, IRquest } from '../types/request'
import type { IComponent } from '../types/type'
import imgThumb from './img-thumb.vue'
const props = defineProps<{
  title: string
  img?: string | undefined
  component: string
  configComponent?:string
  option: any
  w?: number
  h?: number
}>()

const handleDragStart = (e: any) => {
  let data: IComponent = {
    x: 0,
    y: 0,
    w: props.w || 500,
    h: props.h || 300,
    id: null,
    r: 0,
    active: false,
    preventDeactivation: false,
    baseConfig: {
      img: props.img as string,
      label: props.title as string,
      component: props.component as string,
      configComponent:props.configComponent as string
    },
    option: {
      listeners:[],
      ...props.option,
    },

    request: { dataType: 'form-data' } as IRquest
  }
  e.dataTransfer.setData('component', JSON.stringify(data))
}
</script>

<style lang="scss" scoped>
.component-item-wrap {
  width: 100%;
  height: 136px;
  background-color: #f2f3f5;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: rgb(118, 124, 130);
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 9px;
  .title {
    height: 23px;
    background-color: #e5e6eb;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 2px 15px;
    justify-content: flex-end;
    .title-text {
      line-height: 1;
    }
  }
  .content {
    flex: 1;
    box-sizing: border-box;
    padding: 6px 11%;
    overflow: hidden;
    .img-wrap {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
    .img {
      height: 100%;
      width: 100%;
      margin: 0 auto;
      display: block;
      border-radius: 6px;
    }
  }
}
</style>
../types/type
