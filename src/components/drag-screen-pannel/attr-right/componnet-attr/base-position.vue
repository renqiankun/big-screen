<template>
  <div style="margin-bottom: 15px;">
    <div class="positon-wrap">
    <div class="positon-item" v-for="item in positionList">
      <img class="position-img" :src="item.icon" alt="" />
    </div>
  </div>

  <form-layout title="位置">
    <div class="wrap">
      左
      <el-input-number controls-position="right" size="small" v-model="current.x"></el-input-number>
      上
      <el-input-number controls-position="right" size="small" v-model="current.y"></el-input-number>
    </div>
  </form-layout>
  </div>
</template>

<script setup lang="ts">
import formLayout from '@/components/form-layout/index.vue'

import left from '@/assets/imgs/big-screen/icon/left.svg'
import right from '@/assets/imgs/big-screen/icon/right.svg'
import bottom from '@/assets/imgs/big-screen/icon/bottom.svg'
import top from '@/assets/imgs/big-screen/icon/top.svg'
import xCenter from '@/assets/imgs/big-screen/icon/x-center.svg'
import yCenter from '@/assets/imgs/big-screen/icon/y-center.svg'
import type { IComponent } from '../../types/type';

const props = defineProps<{
  current: IComponent
}>()

let positionList = [
  { icon: left, value: 'left' },
  { icon: right, value: 'right' },
  { icon: bottom, value: 'bottom' },
  { icon: top, value: 'top' },
  { icon: xCenter, value: 'xCenter' },
  { icon: yCenter, value: 'yCenter' }
]
</script>

<style lang="scss" scoped>
.positon-wrap {
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
  .positon-item {
    box-sizing: border-box;
    width: 35px;
    height: 30px;
    padding: 5px 8px;
    background-color: rgba(46, 51, 56, 0.05);
    border-radius: 3px;
    cursor: pointer;
    &:hover {
      background-color: #f8f8f9;
    }
    &:active {
      background-color: rgba(46, 51, 56, 0.05);
    }
    .position-img {
      width: 100%;
      height: 100%;
    }
  }
}
.wrap {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  align-items: center;
}
</style>
../../types/type