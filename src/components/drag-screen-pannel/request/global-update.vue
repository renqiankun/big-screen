<template>
  <el-dialog
    title="接口全局配置"
    align-center
    v-model="visible"
    width="900px"
    append-to-body
    destroy-on-close
  >
    <el-form ref="formRef" label-width="100px" :model="dataForm" :rules="rules">
      <el-form-item label="接口地址" prop="baseUrl" >
        <el-input v-model="dataForm.baseUrl" placeholder="http://egg/com"></el-input>
      </el-form-item>
      <el-form-item label="间隔（秒）" prop="interval">
        <el-input-number
          class="reset-input-number--left"
          controls-position="right"
          v-model="dataForm.interval"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="超时（秒）" prop="timeout">
        <el-input-number
          class="reset-input-number--left"
          controls-position="right"
          v-model="dataForm.timeout"
        ></el-input-number>
      </el-form-item>
    </el-form>

    <el-tabs>
      <el-tab-pane label="请求头">
        <el-table border :data="dataForm.headers">
          <el-table-column
            header-align="center"
            width="80px"
            label="序号"
            type="index"
          ></el-table-column>
          <el-table-column header-align="center" label="参数名" prop="name">
            <template #default="{ row }">
              <el-input v-model="row.name"></el-input>
            </template>
          </el-table-column>
          <el-table-column header-align="center" label="参数值" prop="value">
            <template #default="{ row }">
              <variable-input :globalVariable="globalVariable" v-model:value="row.value" v-model:type="row.type"></variable-input>
              <!-- <el-input v-model="row.value"></el-input> -->
            </template>
          </el-table-column>
          <el-table-column header-align="center" label="操作" width="120px">
            <template #default="{ $index }">
              <el-button type="primary" link @click="addHand($index)">添加</el-button>
              <el-button type="danger" link @click="delHand($index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <template #footer>
      <el-button @click="closeHand">取消</el-button>
      <el-button type="primary" @click="confirmHandler">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue'
import type { IGlobalRequest, IRquest } from '../types/request'
import { mergeObjHand } from '../utils'
import { defaultVariabelType } from '../constant';
import variableInput from '@/components/drag-screen-pannel/component/variable-input.vue'
const props = defineProps<{
  modelValue: IGlobalRequest
  globalVariable:any

}>()
let visible = ref(false)
let formRef = ref()
let dataForm = reactive<IGlobalRequest>({
  baseUrl: '',
  interval: 0,
  headers: [{}]
})
let rules = {
  baseUrl: [{ required: true, message: '请输入接口地址', trigger: 'blur' }],
  interval: [{ required: true, message: '请输入间隔时间', trigger: 'blur' }],
  timeout: [{ required: true, message: '请输入间隔时间', trigger: 'blur' }]
}
const init = async (request: IRquest) => {
  visible.value = true
  await nextTick()
  formRef.value?.resetFields?.()
  mergeObjHand(dataForm, { ...request, headers: request?.headers ?? [] })
  if (!dataForm.headers?.length) {
    dataForm.headers = [{ name: '', value: '' ,type: defaultVariabelType}]
  }
}

const confirmHandler = () => {
  formRef.value?.validate(async (valid: boolean) => {
    if (!valid) return
    dataForm.headers = dataForm.headers.filter((item:any) => item.name)
    emits('update:modelValue', dataForm)
    closeHand()
  })
}
const addHand = (index: number) => {
  dataForm.headers.splice(index + 1, 0, { name: '', value: '' ,type: defaultVariabelType})
}
const delHand = (index: number) => {
  if ((dataForm.headers?.length ?? 0) == 1) return
  dataForm.headers.splice(index, 1)
}
const closeHand = () => {
  visible.value = false
}
const emits = defineEmits(['update:modelValue'])

defineExpose({ init })
</script>

<style lang="scss" scoped>
.reset-input-number--left {
  &::v-deep(.el-input__inner) {
    text-align: left;
  }
}
</style>
