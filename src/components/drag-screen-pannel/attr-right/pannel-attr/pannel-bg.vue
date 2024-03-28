<template>
  <div class="img-wrap">
    <file-select
      :max-size="5"
      :accept="accept"
      class="file--reset"
      @change="getFileHand"
    ></file-select>
    <div class="clear-wrap" v-if="modelValue" @click="clearImg">
      <el-icon color="#666" size="18"><CircleClose /></el-icon>
    </div>
    <img class="img-item" v-if="modelValue" :src="modelValue" alt="" />
    <div class="img-icon" v-else>
      <el-icon color="#c1c0c0" size="30"><Picture /></el-icon>
      <div>背景图 {{ accept }}</div>
    </div>
   
  </div>
</template>

<script setup lang="ts">
import { Picture ,CircleClose} from '@element-plus/icons-vue'
import fileSelect from '../../component/file-select.vue'
import type { IPannel } from '../../types/type'
import { computed } from 'vue'
let accept = '.png,.gif,.jpeg,.jpg'
const props = defineProps<{
  modelValue: string | undefined
  pannel: IPannel
}>()
let aspectRatio = computed(() => {
  return props.pannel.width / props.pannel.height
})
let bgMethod = computed(() => {
  return props.pannel.bgMethod == '100% 100%' ? 'fill' : props.pannel.bgMethod
})
const getFileHand = (file: any) => {
  blobToDataURL(file, (base64: any) => {
    emits('update:modelValue', base64)
  })
}
const clearImg = ()=>{
  emits('update:modelValue', '')
}
const blobToDataURL = (blob: any, cb: Function) => {
  let reader = new FileReader()
  reader.onload = function (evt: any) {
    let base64 = evt.target.result
    cb(base64)
  }
  reader.readAsDataURL(blob)
}

const emits = defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped>
.img-wrap {
  max-width: 100%;
  min-height: 60px;
  max-height: 190px;
  // height: 150px;
  aspect-ratio: v-bind(aspectRatio);
  position: relative;
  border: dotted 1px #c1c0c0;
  border-radius: 4px;
  box-sizing: border-box;
  .img-item {
    width: 100%;
    height: 100%;
    object-fit: v-bind(bgMethod);
  }
  .img-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 12px;
    color: var(--screen-primary-text-second-color);
  }
  .file--reset {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .clear-wrap {
    position: absolute;
    right: 5px;
    top: 5px;
    z-index: 3;
    cursor: pointer;
  }
}
</style>
../../types/type