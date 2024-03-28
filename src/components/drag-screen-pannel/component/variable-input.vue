<template>
  <div class="variable-wrap">
    <el-select style="width: 100px" v-model="typeCom" placeholder="请选择">
      <el-option
        v-for="item in variableTypeList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <el-input style="flex: 1;" v-if="typeCom == defaultVariabelType" v-model="valueCom"></el-input>
    <el-select style="flex: 1;" v-else v-model="valueCom">
      <el-option
        v-for="item in globalVariableArr"
        :key="item"
        :label="item"
        :value="item"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { variableTypeList, defaultVariabelType } from '@/components/drag-screen-pannel/constant'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    value: any
    type: any
    globalVariable: any
  }>(),
  {
    globalVariable: () => ({})
  }
)

let typeCom = computed({
  get: () => props.type,
  set: (val) => {
    emits('update:type', val)
  }
})

let valueCom = computed({
  get: () => props.value,
  set: (val: any) => {
    emits('update:value', val)
  }
})

let globalVariableArr = computed(() => {
  return Object.keys(props.globalVariable)
})

const emits = defineEmits(['update:value', 'update:type'])
</script>

<style lang="scss" scoped>
.variable-wrap{
    display: flex;
    align-items: center;
    gap: 0 10px;
}
</style>
