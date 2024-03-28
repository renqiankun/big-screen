<template>
  <el-dialog
    title="接口配置"
    align-center
    v-model="visible"
    width="900px"
    append-to-body
    destroy-on-close
  >
    <el-form ref="formRef" label-width="100px" :model="dataForm" :rules="rules">
      <el-form-item label="接口地址" prop="url" >
        <el-input v-model="dataForm.url" placeholder="/egg"></el-input>
      </el-form-item>
      <el-form-item label="请求方式" prop="method">
        <el-select v-model="dataForm.method">
          <el-option label="GET" value="GET"></el-option>
          <el-option label="POST" value="POST"></el-option>
          <el-option label="PUT" value="PUT"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="间隔（秒）" prop="interval">
        <el-input-number
          class="reset-input-number--left"
          controls-position="right"
          v-model="dataForm.interval"
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
              <el-input v-model="row.value"></el-input>
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
import type { IRquest } from '../types/request'
import { mergeObjHand } from '../utils'
const props = defineProps<{
  modelValue: IRquest
}>()
let visible = ref(false)
let formRef = ref()
let dataForm = reactive<IRquest>({
  url: '',
  interval: 0,
  method: '',
  headers: [{}]
})
let rules = {
  url: [{ required: true, message: '请输入接口地址', trigger: 'blur' }],
  method: [{ required: true, message: '请选择请求方式', trigger: 'change' }],
  interval: [{ required: true, message: '请输入间隔时间', trigger: 'blur' }]
}
const init = async (request: IRquest) => {
  visible.value = true
  await nextTick()
  formRef.value?.resetFields?.()
  mergeObjHand(dataForm, { ...request, headers: request?.headers ?? [] })
  if (!dataForm.headers?.length) {
    dataForm.headers = [{ name: '', value: '' }]
  }
}

const confirmHandler = () => {
  formRef.value?.validate(async (valid: boolean) => {
    if (!valid) return
    dataForm.headers = dataForm.headers.filter((item) => item.name)
    emits('update:modelValue', dataForm)
    closeHand()
  })
}
const addHand = (index: number) => {
  dataForm.headers.splice(index + 1, 0, { name: '', value: '' })
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
