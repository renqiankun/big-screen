<template>
  <div class="reset-date-picker">
    <el-date-picker
      :key="JSON.stringify({ ...attrOption, modelValue: '' })"
      :style="dateStyle"
      v-bind="{
        ...attrOption,
        ...bindListener
      }"
      v-model="attrOption.modelValue"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, toRef, watch, type Ref } from 'vue'
import type { IComponent, IPannel } from '../../types/type'
import type { IDatePicker } from '../../types/date-picker'
import type { IGlobalRequest } from '../../types/request'
import { useHttpHand } from '../http/http'
import { datePickerNow, datePickermutilList } from '../../constant'
import { dayjs } from 'element-plus'
import { useListenerHand } from '../utils'
const props = withDefaults(
  defineProps<{
    dev?: boolean // 开发模式  静态数据或 http请求数据
    config: IComponent
    pannel: IPannel
    // 预览组件传入的业务全局变量
    globalVariable?: Record<any, any>
  }>(),
  {
    dev: true
  }
)
let isDev = computed(() => props.dev)
let attrOption = computed<IDatePicker>({
  get() {
    return props.config.option as IDatePicker
  },
  set(val) {
    emit('update:config', { ...props.config, option: val })
  }
})
//使用当前时间
let useNowValue = computed(() => {
  return attrOption.value.defaultType == datePickerNow
})
let isMutil = computed(() => {
  return datePickermutilList.includes(attrOption.value.type)
})
let dateStyle = computed(() => {
  return {
    backgroundColor: attrOption.value.bgColor || undefined,
    color: attrOption.value.color || undefined
  }
})

onBeforeUnmount(() => {})

const initDate = () => {
  let valueFormat = attrOption.value.valueFormat || 'YYYY-MM-DD'
  let nowValue = useNowValue.value ? dayjs(new Date()).format(valueFormat) : ''
  if (isMutil.value) {
    attrOption.value.modelValue = [nowValue, nowValue]
  } else {
    attrOption.value.modelValue = nowValue
  }
}
// 绑定关联组件事件
let bindListener: Ref = useListenerHand({
  option: props.config.option as IDatePicker,
  components: props.pannel.components
})
const init = async () => {
  initDate()
}
// 接口数据
let requestParams = computed(() => {
  return {
    globalRequest: props.pannel.globalRequest ?? ({} as IGlobalRequest),
    request: props.config.request ?? {},
    globalVariable: {
      ...props.pannel.globalVariable,
      ...props.globalVariable
    }
  }
})
let httpData: Ref = useHttpHand(requestParams)
watch(
  () => [attrOption.value.type, attrOption.value.defaultType],
  (newVal) => {
    init()
  },
  { deep: true, flush: 'post', immediate: true }
)

const emit = defineEmits(['update:config'])
</script>

<style lang="scss" scoped>
.reset-date-picker {
  width: 100%;
  height: 100%;
  ::v-deep(.el-date-editor) {
    --el-date-editor-width: 100%;
    --el-input-height: 100%;
    box-sizing: border-box;
  }
}
</style>
