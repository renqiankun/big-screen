<template>
  <el-button type="primary" size="small" @click="addEventHand">添加</el-button>
  <el-collapse v-model="activeNames">
    <aboutEvent
        v-model:option="current.option"
        :pannel="pannel"
        v-model:listener="listeners[index]"
        :request="current.request"
        v-for="(item, index) in listeners"
      />

  </el-collapse>
</template>

<script setup lang="ts">
import type { IComponent, IPannel } from '../../../types/type'
import formLayout from '@/components/form-layout/index.vue'
import sFormLayout from '@/components/s-form-layout-small/index.vue'
import aboutEvent from './about-event.vue'
import { computed, ref } from 'vue'
import type { IDatePicker } from '@/components/drag-screen-pannel/types/date-picker'
const props = withDefaults(
  defineProps<{
    pannel: IPannel
    current: IComponent
  }>(),
  {}
)
let listeners = computed({
  get() {
    return (props.current?.option as IDatePicker)?.listeners ?? []
  },
  set(val) {
    ;(props.current?.option as IDatePicker).listeners = val
  }
})
let activeNames = ref([])

const addEventHand = () => {
  listeners.value.push({
    relComponentId: '',
    relEvent: '',
    relMap: {}
  })
}
</script>

<style lang="scss" scoped></style>
