<template>
  <leftMenuContainer>
    <template #title-left>
      <div class="title-name">
        <span class="title-text">组件</span> <el-icon><Histogram /></el-icon>
      </div>
    </template>
    <template #left-menu>
      <leftMenuBtn
        v-for="item in menuTypeList"
        :label="item.label"
        :icon="item.icon"
        :value="item.value"
        v-model="menuType"
        @change="initSecoundMenu"
      />
    </template>

    <template #component>
      <div class="component-container">
        <div class="component-type-list-wrap" v-if="hasChileMenu">
          <leftMenuBtn
            small
            v-for="item in menuChild"
            :label="item.label"
            :icon="item.icon"
            :value="item.value"
            v-model="menuChildType"
          />
        </div>
        <div class="componnet-wrap">
          <el-scrollbar height="100%">
            <leftComponentItem
              v-for="item in componentTypeList"
              :key="item.label"
              :title="item.label"
              :img="item.img"
              :component="item.component || ''"
            />
          </el-scrollbar>
        </div>
      </div>
    </template>
  </leftMenuContainer>
</template>

<script setup lang="ts">
import leftMenuContainer from '../component/left-menu-container.vue'
import leftMenuBtn from '../component/left-menu-btn.vue'
import { PieChart } from '@element-plus/icons-vue'
import { ref, computed, onMounted } from 'vue'
import leftComponentItem from '../component/left-component-item.vue'
// import barX from '@/assets/imgs/big-screen/chart/bar_x.png'
import { Histogram } from '@element-plus/icons-vue'
type menuType = {
  label: string
  value: number
  icon?: any
  img?: string | undefined
  justComponentChild?: boolean
  component?: string
  children?: menuType[]
}
let menuType = ref(1)
let menuTypeList: Array<menuType> = [
  {
    label: '图表',
    icon: PieChart,
    value: 1,
    children: [
      {
        label: '柱状图',
        value: 1,
        children: [
          {
            label: '柱状图1',
            value: 11,
            img: 'bar_x',
            component:'chart-bar-line'
          },
          // { label: '柱状图2', value: 22, img: 'bar_x' }
        ]
      },
      {
        label: '折线图',
        value: 2,
        children: [
          { label: '折现1', value: 11, img: '' },
          { label: '折现2', value: 22, img: '' }
        ]
      },
      { label: '饼图', value: 3 },
      { label: '散点图', value: 4 },
      { label: '地图', value: 5 }
    ]
  },
  {
    label: '信息',
    icon: '',
    value: 2,
    justComponentChild: true,
    children: [
      { label: '信息1', icon: '', value: 1 },
      { label: '信息2', icon: '', value: 2 }
    ]
  },
  {
    label: '列表',
    icon: '',
    value: 3,
    children: []
  },
  { label: '图片', icon: '', value: 4 }
]

let menuChildType = ref()
// 当前menu  一级
let currentMenu = computed(() => {
  return menuTypeList.find((item) => item.value === menuType.value)
})

// 存在二级
let hasChileMenu = computed(() => {
  return !currentMenu.value?.justComponentChild
})
// 二级选中
let childMenu = computed(() => {
  return currentMenu.value?.children?.find((item) => item.value === menuChildType.value)
})
// 子menu list,  二级
let menuChild = computed(() => {
  return hasChileMenu.value ? currentMenu.value?.children ?? [] : []
})

// 组件列表 三级
let componentTypeList = computed(() => {
  return hasChileMenu.value ? childMenu.value?.children ?? [] : currentMenu.value?.children
})

// 一级改变时
const initSecoundMenu = () => {
  if (hasChileMenu.value) {
    menuChildType.value = menuChild.value?.[0]?.value
  } else {
    menuChildType.value = ''
  }
}
onMounted(() => {
  initSecoundMenu()
})
</script>

<style lang="scss" scoped>
.component-container {
  display: flex;
  height: 100%;
  .component-type-list-wrap {
    width: 65px;
    box-sizing: border-box;
    padding: 6px 8px;
    background-color: #f8f8f9;
  }
  .componnet-wrap {
    flex: 1;
    box-sizing: border-box;
    // padding: 10px;
    padding: 10px 0;
    overflow: hidden;
    ::v-deep(.el-scrollbar) {
      .el-scrollbar__view {
        padding: 0 10px;
      }
    }
  }
}
.title-name {
  font-size: 14px;
  height: 100%;
  display: flex;
  align-items: center;
  color: rgb(51, 54, 57);
  .title-text {
    margin-right: 2px;
  }
}
</style>
