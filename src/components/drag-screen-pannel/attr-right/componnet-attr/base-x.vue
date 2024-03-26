<template>
  <el-collapse-item>
    <template #title>
      <div class="title-wrap">
        <span>{{ title }}</span>
        <el-switch @click.stop="" size="small" v-model="xAxis.show"></el-switch>
      </div>
    </template>

    <form-layout title="基础">
      <sFormLayout :rate="50" title="留白">
        <template #title>
          <span>留白</span>
          <el-tooltip content="类目型一般需要留白" placement="top">
            <el-icon><Warning /></el-icon>
          </el-tooltip>
        </template>
        <el-switch size="small" v-model="xAxis.boundaryGap"></el-switch>
      </sFormLayout>
      <sFormLayout :rate="50" title="类型">
        <el-select size="small" v-model="xAxis.type">
          <el-option label="类目型" value="category"></el-option>
          <el-option label="数值型" value="value"></el-option>
        </el-select>
      </sFormLayout>
      <sFormLayout :rate="50" title="分隔段数">
        <el-input-number size="small" v-model="xAxis.splitNumber"></el-input-number>
      </sFormLayout>
    </form-layout>

    <form-layout title="单位">
      <template #title>
        单位
        <el-tooltip content="使用单位需先修改容器距离" placement="top">
          <el-icon><Warning /></el-icon>
        </el-tooltip>
      </template>
      <sFormLayout :rate="50" title="单位">
        <el-input size="small" v-model="xAxis.name"></el-input>
      </sFormLayout>
      <sFormLayout :rate="50" title="颜色">
        <el-color-picker size="small" v-model="xAxis.nameTextStyle.color"></el-color-picker>
      </sFormLayout>
      <sFormLayout :rate="50" title="大小">
        <el-input size="small" v-model="xAxis.nameTextStyle.fontSize"></el-input>
      </sFormLayout>
      <sFormLayout :rate="50" title="偏移量">
        <el-input-number size="small" v-model="nameTextStylePadding"></el-input-number>
      </sFormLayout>
    </form-layout>

    <form-layout title="标签">
      <sFormLayout :rate="50" title="显示">
        <el-switch size="small" v-model="xAxis.axisLabel.show"></el-switch>
      </sFormLayout>
      <sFormLayout :rate="50" title="颜色">
        <el-color-picker
          style="width: 100%"
          size="small"
          v-model="xAxis.axisLabel.color"
        ></el-color-picker>
      </sFormLayout>
      <sFormLayout :rate="50" title="大小">
        <el-input-number size="small" v-model="xAxis.axisLabel.fontSize"></el-input-number>
      </sFormLayout>
      <sFormLayout :rate="50" title="加粗">
        <el-select size="small" v-model="xAxis.axisLabel.fontWeight">
          <el-option label="正常" value="normal"></el-option>
          <el-option label="加粗" value="bold"></el-option>
          <el-option label="更粗" value="bolder"></el-option>
          <el-option label="更细" value="lighter"></el-option>
        </el-select>
      </sFormLayout>
    </form-layout>

    <form-layout title="轴线">
      <sFormLayout :rate="50" title="显示">
        <el-switch size="small" v-model="xAxis.axisLine.show"></el-switch>
      </sFormLayout>
      <sFormLayout :rate="50" title="颜色">
        <el-color-picker
          style="width: 100%"
          size="small"
          v-model="xAxis.axisLine.lineStyle.color"
        ></el-color-picker>
      </sFormLayout>

      <sFormLayout :rate="50" title="0刻度对齐">
        <el-switch size="small" v-model="xAxis.axisLine.onZero"></el-switch>
      </sFormLayout>
      <sFormLayout :rate="50" title="位置">
        <el-select size="small" v-model="xAxis.position">
          <el-option label="上" value="top"></el-option>
          <el-option label="下" value="bottom"></el-option>
        </el-select>
      </sFormLayout>
      <sFormLayout :rate="50" title="宽度">
        <el-input-number size="small" v-model="xAxis.axisLine.lineStyle.width"></el-input-number>
      </sFormLayout>
      <sFormLayout :rate="50" title="类型">
        <el-select size="small" v-model="xAxis.axisLine.lineStyle.type">
          <el-option label="实线" value="solid"></el-option>
          <el-option label="虚线" value="dashed"></el-option>
          <el-option label="点状线" value="dotted"></el-option>
        </el-select>
      </sFormLayout>

      <sFormLayout :rate="50" title="箭头">
        <el-select v-model="axisLineSymble" size="small">
          <el-option label="无" value='["none","none"]'></el-option>
          <el-option label="右箭头" value='["none","arrow"]'></el-option>
          <el-option label="左箭头" value='["arrow","none"]'></el-option>
          <el-option label="左右箭头" value='["arrow","arrow"]'></el-option>
        </el-select>
      </sFormLayout>
    </form-layout>

    <form-layout title="刻度">
      <sFormLayout :rate="50" title="显示">
        <el-switch size="small" v-model="xAxis.axisTick.show"></el-switch>
      </sFormLayout>
      <sFormLayout :rate="50" title="颜色">
        <el-color-picker
          style="width: 100%"
          size="small"
          v-model="xAxis.axisTick.lineStyle.color"
        ></el-color-picker>
      </sFormLayout>
      <sFormLayout :rate="50" title="对齐">
        <el-switch size="small" v-model="xAxis.axisTick.alignWithLabel"></el-switch>
      </sFormLayout>
      <sFormLayout :rate="50" title="朝内">
        <el-switch size="small" v-model="xAxis.axisTick.inside"></el-switch>
      </sFormLayout>
      <sFormLayout :rate="50" title="长度">
        <el-input-number size="small" v-model="xAxis.axisTick.length"></el-input-number>
      </sFormLayout>

      <sFormLayout :rate="50" title="宽度">
        <el-input-number size="small" v-model="xAxis.axisTick.lineStyle.width"></el-input-number>
      </sFormLayout>
      <sFormLayout :rate="50" title="类型">
        <el-select size="small" v-model="xAxis.axisTick.lineStyle.type">
          <el-option label="实线" value="solid"></el-option>
          <el-option label="虚线" value="dashed"></el-option>
          <el-option label="点状线" value="dotted"></el-option>
        </el-select>
      </sFormLayout>
    </form-layout>

    <form-layout title="分割线">
      <sFormLayout :rate="50" title="显示">
        <el-switch size="small" v-model="xAxis.splitLine.show"></el-switch>
      </sFormLayout>
      <sFormLayout :rate="50" title="颜色">
        <el-color-picker
          style="width: 100%"
          size="small"
          v-model="xAxis.splitLine.lineStyle.color"
        ></el-color-picker>
      </sFormLayout>
      <sFormLayout :rate="50" title="宽度">
        <el-input-number size="small" v-model="xAxis.splitLine.lineStyle.width"></el-input-number>
      </sFormLayout>
      <sFormLayout :rate="50" title="类型">
        <el-select size="small" v-model="xAxis.splitLine.lineStyle.type">
          <el-option label="实线" value="solid"></el-option>
          <el-option label="虚线" value="dashed"></el-option>
          <el-option label="点状线" value="dotted"></el-option>
        </el-select>
      </sFormLayout>
    </form-layout>
  </el-collapse-item>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { IChartOption, IComponent } from '../../type'
import formLayout from '@/components/form-layout/index.vue'
import sFormLayout from '@/components/s-form-layout-small/index.vue'
import { Warning } from '@element-plus/icons-vue'
const props = withDefaults(defineProps<{
  xAxis: any
  title?: string
}>(),{
  title:'X轴（xAxis）'
})
let xAxis = computed(() => {
  return props.xAxis
})

let nameTextStylePadding = computed({
  get() {
    return xAxis.value.nameTextStyle?.padding?.[3] ?? 0
  },
  set(newVal) {
    xAxis.value.nameTextStyle.padding = [0, 0, 0, newVal]
  }
})

let axisLineSymble = computed({
  get() {
    try {
      return JSON.stringify(xAxis.value.axisLine.symbol)
    } catch (error) {
      return '["none","none"]'
    }
  },
  set(newVal) {
    try {
      xAxis.value.axisLine.symbol = JSON.parse(newVal)
    } catch (error) {}
  }
})
</script>

<style lang="scss" scoped>
.title-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
