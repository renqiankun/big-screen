<template>
  <formLayout title="基础">
    <sFormLayout :rate="50" title="类型">
      <el-select size="small" v-model="optionCom.type" placeholder="请选择">
        <el-option v-for="item in datePickerTypeList" v-bind="item"></el-option>
      </el-select>
    </sFormLayout>
    <sFormLayout :rate="50" title="提示文字">
      <el-input
        size="small"
        v-model="optionCom.placeholder"
        placeholder="请输入提示文字"
      ></el-input>
    </sFormLayout>
    <sFormLayout :rate="50" title="只读">
      <el-switch v-model="optionCom.readonly" size="small" />
    </sFormLayout>

    <sFormLayout :rate="50" title="初始值类型">
      <el-select v-model="optionCom.defaultType" size="small" placeholder="请选择">
        <el-option v-for="item in datePickerDefaultTypes" v-bind="item"></el-option>
      </el-select>
    </sFormLayout>
    <sFormLayout v-if="useFixValue" :rate="100" title="初始值">
      <el-date-picker
        v-bind="optionCom"
        v-model="optionCom.modelValue"
        size="small"
        @change="changeDefaultValue"
      ></el-date-picker>
    </sFormLayout>

    <sFormLayout :rate="100" title="显示格式化">
      <el-input
        size="small"
        v-model="optionCom.format"
        placeholder="显示格式化:YY-MM-DD"
      ></el-input>
    </sFormLayout>
    <sFormLayout :rate="100" title="值格式化">
      <el-input
        size="small"
        v-model="optionCom.valueFormat"
        placeholder="值格式化:YY-MM-DD"
      ></el-input>
    </sFormLayout>
  </formLayout>
</template>

<script setup lang="ts">
import formLayout from '@/components/form-layout/index.vue'
import sFormLayout from '@/components/s-form-layout-small/index.vue'
import { computed } from 'vue'
import type { IDatePicker } from '../../types/date-picker'
import { datePickerTypeList, datePickerDefaultTypes, datePickerFix } from '../../constant'
const props = defineProps<{
  option: IDatePicker
}>()

let optionCom = computed<IDatePicker>({
  get: () => props.option,
  set: (val) => {
    emit('update:option', val)
  }
})

let useFixValue = computed(() => {
  return optionCom.value.defaultType === datePickerFix
})
const changeDefaultValue = (e: any) => {
  emit('update:option', { ...optionCom.value, modelValue: e })
}
const emit = defineEmits(['update:option'])
</script>

<style lang="scss" scoped></style>
