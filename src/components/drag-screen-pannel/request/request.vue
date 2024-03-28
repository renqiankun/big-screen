<template>
  <!-- <global :global-request="globalRequest"/> -->

  <div class="screen-pannel-request-wrap">
    <formLayout title="接口">
      <sFormLayout title="接口地址">
        <el-input placeholder="/egg" size="small" v-model="request.url"></el-input>
      </sFormLayout>

      <sFormLayout :rate="50" title="请求方式">
        <el-select size="small" v-model="request.method" placeholder="">
          <el-option label="GET" value="GET"></el-option>
          <el-option label="POST" value="POST"></el-option>
          <el-option label="PUT" value="PUT"></el-option>
          <el-option label="DELETE" value="DELETE"></el-option>
        </el-select>
      </sFormLayout>

      <sFormLayout :rate="50" title="间隔（秒）">
        <el-input-number size="small" v-model="request.interval" placeholder=""></el-input-number>
      </sFormLayout>
    </formLayout>
    <div class="request-edit-btn">
      <el-button type="primary" @click="editRequestHandler">编辑</el-button>
    </div>
  </div>

  <requetUpdate v-model="requestCom" ref='reqRef'/>
</template>

<script setup lang="ts">
import global from './global.vue'
import formLayout from '@/components/form-layout/index.vue'
import sFormLayout from '@/components/s-form-layout-small/index.vue'
import type { IGlobalRequest, IRquest } from '../types/request'
import { computed, onMounted, ref } from 'vue';
import requetUpdate from './request-update.vue'
const props = withDefaults(
  defineProps<{
    globalRequest: IGlobalRequest
    request: IRquest
  }>(),
  {}
)
const requestCom = computed({
  get(){
    return props.request
  },
  set(val){
    emit('update:request', val)
  } 
})
let reqRef = ref()
const editRequestHandler = () => {
    reqRef.value.init(props.request)
}
const emit = defineEmits(['update:globalRequest', 'update:request'])
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
