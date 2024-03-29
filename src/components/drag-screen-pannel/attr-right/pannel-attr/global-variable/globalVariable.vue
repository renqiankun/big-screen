<template>
  <!-- 全局变量 -->
  <div class="pannel-color-block">
    <div class="title-wrap pannel-bg-text">
      <div class="title-item">
        <div>全局变量</div>
        <el-tooltip raw-content :content="desc" placement="top">
          <el-icon><Warning /></el-icon>
        </el-tooltip>
      </div>
      <el-icon style="cursor: pointer" @click.stop="addHand()"><Plus /></el-icon>
    </div>
    <el-table size="small" :data="globalVariableArr">
      <el-table-column align="center" header-align="center" label="参数名" prop="name">
      </el-table-column>
      <el-table-column align="center" header-align="center" label="参数值" prop="value">
      </el-table-column>
      <el-table-column align="center" header-align="center" label="操作" width="100px">
        <template #default="{ row, $index }">
          <el-button size="small" type="primary" link @click="addHand(row)">编辑</el-button>
          <el-button size="small" type="danger" link @click="delHand(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      label-width="80px"
      align-center
      v-model="visible"
      destroy-on-close
      append-to-body
      title="全局变量"
      width="600px"
    >
      <el-form label-width="100px">
        <el-form-item label="参数名">
          <el-input v-model="info.name"></el-input>
        </el-form-item>
        <el-form-item label="参数值">
          <el-input v-model="info.value"></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="visible = false"> 取消 </el-button>
        <el-button type="primary" @click="confirmHand"> 确定 </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Warning, Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { computed, reactive, ref } from 'vue'
const props = withDefaults(
  defineProps<{
    globalVariable: Object
  }>(),
  {}
)
let visible = ref(false)
const globalVariableCom: Record<any, any> = computed({
  get: () => props.globalVariable,
  set: (val) => {
    emits('update:globalVariable', val)
  }
})
let globalVariableArr = computed(() => {
  let arr = []
  for (let key in globalVariableCom.value) {
    arr.push({
      name: key,
      value: globalVariableCom.value[key]
    })
  }
  return arr
})
let desc = `
    因大屏预览时接口配置独立与业务平台，</br>
    无法共用业务平台中诸如axios的拦截器，</br>
    类似header上token添加则可通过全局变量定义，</br>
    在预览组件中使用:globalVariable="{token: '123'}",</br>
    进行合并，预览组件中传入的变量优先级高于此全局变量
`

let info = reactive({
  name: '',
  value: ''
})
const addHand = (item?: any) => {
  //   globalVariableArr.value.splice(index + 1, 0, { name: '', value: '' })
  visible.value = true
  info.name = item?.name ?? ''
  info.value = item?.value ?? ''
}
const delHand = (row: any) => {
  delete globalVariableCom.value[row.name]
}
const confirmHand = () => {
  if (!info.name || !info.value) {
    return ElMessage.error('请输入参数名和参数值')
  }
  globalVariableCom.value = {
    ...globalVariableCom.value,
    [info.name]: info.value
  }
  visible.value = false
}
const emits = defineEmits(['update:globalVariable'])
</script>

<style lang="scss" scoped>
.pannel-bg-text {
  font-size: 12px;
  color: var(--screen-text-color);
  margin-right: 10px;
  margin-bottom: 5px;
}
.title-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  .title-item {
    display: flex;
    align-items: center;
  }
}
</style>
