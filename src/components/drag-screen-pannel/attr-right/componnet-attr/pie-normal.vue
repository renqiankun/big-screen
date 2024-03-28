<template>
  <el-collapse-item>
    <template #title>
      <div class="title-wrap">
        <span>配置（series）</span>
      </div>
    </template>

    <form-layout title="基础">
      <sFormLayout :rate="50" title="南丁格尔图">
        <el-switch v-model="series.roseType" size="small"></el-switch>
      </sFormLayout>
      <sFormLayout  :rate="50" title="扇区间隔">
        <el-input-number size="small" v-model="series.padAngle"></el-input-number>
      </sFormLayout>

      <sFormLayout :rate="50" title="总数据0显示扇区">
        <el-switch v-model="series.stillShowZeroSum" size="small"></el-switch>
      </sFormLayout>

      <sFormLayout  :rate="50" title="比例精度">
        <el-input-number size="small" v-model="series.percentPrecision"></el-input-number>
      </sFormLayout>
    </form-layout>
    
    <form-layout title="圆环">
      <sFormLayout :rate="50" title="内部距离">
        <el-input size='small' v-model="series.radius[0]"></el-input>
      </sFormLayout>
      <sFormLayout :rate="50" title="外部距离">
        <el-input size='small' v-model="series.radius[1]"></el-input>
      </sFormLayout>
    </form-layout>

    <form-layout title="位置">
      <sFormLayout :rate="50" title="左右">
        <el-input size='small' v-model="series.center[0]"></el-input>
      </sFormLayout>
      <sFormLayout :rate="50" title="上下">
        <el-input size='small' v-model="series.center[1]"></el-input>
      </sFormLayout>
    </form-layout>

    <form-layout title="标签">
      <sFormLayout :rate="50" title="显示">
        <el-switch v-model="series.label.show" size="small"></el-switch>
      </sFormLayout>

      <sFormLayout :rate="50" title="位置">
        <el-select v-model="series.label.position" size="small">
          <el-option value="inside" label="内部"></el-option>
          <el-option value="outer" label="外部"></el-option>
          <el-option value="center" label="中心"></el-option>
        </el-select>
      </sFormLayout>

      <sFormLayout :rate="50" title="对齐" desc="位置为外部时有效">
        <el-select v-model="series.label.alignTo" size="small">
          <el-option value="none" label="固定值"></el-option>
          <el-option value="labelLine" label="末端对齐"></el-option>
          <el-option value="edge" label="文字对齐"></el-option>
        </el-select>
      </sFormLayout>
      <sFormLayout :rate="50" title="字体大小">
        <el-input-number size="small" v-model="series.label.fontSize"></el-input-number>
      </sFormLayout>
      <sFormLayout :rate="50" title="颜色">
        <el-color-picker v-model="series.label.color" size="small"></el-color-picker>
      </sFormLayout>
      <sFormLayout :rate="50" title="加粗">
        <el-select v-model="series.label.fontWeight" size="small">
          <el-option value="normal" label="正常"></el-option>
          <el-option value="bold" label="加粗"></el-option>
          <el-option value="bolder" label="更粗"></el-option>
          <el-option value="lighter" label="更细"></el-option>
        </el-select>
      </sFormLayout>
    </form-layout>


    <form-layout title="边框">
      <sFormLayout :rate="50" title="颜色">
          <el-color-picker style="width: 100%;" v-model="series.itemStyle.borderColor" size="small"></el-color-picker>
      </sFormLayout>

      <sFormLayout :rate="50" title="宽度">
        <el-input-number v-model="series.itemStyle.borderWidth" size="small" />
      </sFormLayout>

      <sFormLayout :rate="50" title="类型">
        <el-select v-model="series.itemStyle.borderType" size="small">
          <el-option value="solid" label="实线"></el-option>
          <el-option value="dashed" label="虚线"></el-option>
          <el-option value="dotted" label="点线"></el-option>
        </el-select>
      </sFormLayout>

      <sFormLayout :rate="50" title="圆角">
        <el-input v-model="series.itemStyle.borderRadius" size="small" />
      </sFormLayout>
    </form-layout>
  </el-collapse-item>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import formLayout from '@/components/form-layout/index.vue'
import sFormLayout from '@/components/s-form-layout-small/index.vue'
import type { IpieSeries } from '../../types/base';
const props = withDefaults(
  defineProps<{
    current: any
  }>(),
  {}
)
let series = computed(():IpieSeries => props.current.option.series)
</script>

<style lang="scss" scoped></style>
