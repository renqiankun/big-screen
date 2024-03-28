<template>
  <el-collapse-item>
    <template #title>
      <div class="title-wrap">
        <span>图例（legend）</span>
        <el-switch @click.stop="" size="small" v-model="legend.show"></el-switch>
      </div>
    </template>


      <form-layout title="文字">
        <sFormLayout :rate="50" title="颜色">
          <el-color-picker size="small" v-model="legend.textStyle.color" />
        </sFormLayout>
        <sFormLayout :rate="50" title="大小">
          <el-input-number
            size="small"
            controls-position="right"
            v-model="legend.textStyle.fontSize"
          />
        </sFormLayout>
      </form-layout>

      <form-layout title="位置">
        <sFormLayout :rate="50" title="方向">
          <el-select v-model="legend.orient" size="small">
            <el-option label="水平" value="horizontal"></el-option>
            <el-option label="垂直" value="vertical"></el-option>
          </el-select>
        </sFormLayout>
        <sFormLayout :rate="50" title="间隔">
         <el-input-number size='small' v-model="legend.itemGap"></el-input-number>
        </sFormLayout>
        <sFormLayout :rate="50" title="y轴">
          <el-select size="small" v-model="legend.top">
            <el-option v-for="item in yList" v-bind="item"></el-option>
          </el-select>
        </sFormLayout>
        <sFormLayout :rate="50" title="x轴">
          <el-select size="small" v-model="legend.left">
            <el-option v-for="item in xList" v-bind="item"></el-option>
          </el-select>
        </sFormLayout>
      </form-layout>

      <form-layout title="图标">
        <sFormLayout :rate="50" title="方向">
          <el-select size="small" v-model="legend.orient">
            <el-option v-for="item in orientList" v-bind="item"></el-option>
          </el-select>
        </sFormLayout>

        <sFormLayout :rate="50" title="形状">
          <el-select size="small" v-model="legend.icon">
            <el-option v-for="item in iconList" v-bind="item"></el-option>
          </el-select>
        </sFormLayout>

        <sFormLayout :rate="50" title="宽度">
          <el-input-number
            controls-position="right"
            size="small"
            v-model="legend.itemWidth"
          ></el-input-number>
        </sFormLayout>
        <sFormLayout :rate="50" title="高度">
          <el-input-number
            controls-position="right"
            size="small"
            v-model="legend.itemHeight"
          ></el-input-number>
        </sFormLayout>
      </form-layout>
  </el-collapse-item>
</template>

<script setup lang="ts">
import formLayout from '@/components/form-layout/index.vue'
import type { IChartOption, IComponent } from '../../types/type'
import { computed } from 'vue'
import sFormLayout from '@/components/s-form-layout-small/index.vue'
const props = defineProps<{
  current: IComponent
}>()

let legend = computed(() => {
  return (props.current.option as IChartOption).legend
})
let yList = [
  { label: '居上', value: 'top' },
  { label: '居中', value: 'middle' },
  { label: '居下', value: 'bottom' }
]
let xList = [
  { label: '居左', value: 'left' },
  { label: '居中', value: 'center' },
  { label: '居右', value: 'right' }
]

let orientList = [
  { label: '水平', value: 'horizontal' },
  { label: '垂直', value: 'vertical' }
]

let iconList = [
  { label: '方形', value: 'rect' },
  { label: '圆形', value: 'circle' },
  { label: '圆角方形', value: 'roundRect' },
  { label: '三角形', value: 'triangle' },
  { label: '菱形', value: 'diamond' },
  { label: '钢笔形', value: 'pin' },
  { label: '箭头形', value: 'arrow' },
  { label: '无', value: 'none' }
]
</script>

<style lang="scss" scoped>
.title-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.legend-wrap {
  ::v-deep(.el-color-picker) {
    width: 100%;
    .el-color-picker__trigger {
      width: 100%;
    }
  }
  ::v-deep(.el-input-number) {
    width: 100%;
  }
}
</style>
../../types/type