<template>
  <div class="screen-pannel-request-wrap">
    <formLayout title="全局">
      <sFormLayout title="源地址">
        <el-input placeholder="http://example.com" size="small" v-model="requestCom.baseUrl"></el-input>
      </sFormLayout>

      <sFormLayout :rate="50" title="间隔（秒）">
        <el-input-number size="small" v-model="globalRequest.interval" placeholder=""></el-input-number>
      </sFormLayout>
      <sFormLayout :rate="50" title="超时（秒）">
        <el-input-number size="small" v-model="globalRequest.timeout" placeholder=""></el-input-number>
      </sFormLayout>
    </formLayout>
    <div class="request-edit-btn">
      <el-button type="primary" @click="editRequestHandler">编辑</el-button>
    </div>
  </div>

  <globalUpdate v-model="requestCom" :globalVariable="globalVariable" ref='reqRef'/>
</template>

<script setup lang="ts">
import formLayout from '@/components/form-layout/index.vue'
import sFormLayout from '@/components/s-form-layout-small/index.vue'
import type { IGlobalRequest, IRquest } from '../types/request'
import { computed, onMounted, ref } from 'vue';
import globalUpdate from './global-update.vue'
const props = withDefaults(
  defineProps<{
    globalRequest: IGlobalRequest
    globalVariable:any
  }>(),
  {}
)
const requestCom = computed({
  get(){
    return props.globalRequest
  },
  set(val){
    emit('update:globalRequest', {...val})
  } 
})
let reqRef = ref()
const editRequestHandler = () => {
    reqRef.value.init(props.globalRequest)
}
const emit = defineEmits(['update:globalRequest'])
</script>

<style lang="scss" scoped>
.screen-pannel-request-wrap {
  position: relative;
  .request-edit-btn {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(240, 240, 240, 0.7);
    backdrop-filter: blur(2px) !important;
    z-index: 1;
    box-sizing: border-box;
    border: 1px solid var(--el-color-primary);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    opacity: 0;
  }
  &:hover {
    .request-edit-btn {
      opacity: 0.9;
    }
  }
}
</style>
