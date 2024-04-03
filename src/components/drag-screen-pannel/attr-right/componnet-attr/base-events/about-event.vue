<template>
  <el-collapse-item title="事件关联组件" :name="collaName">
    <div class="card-container">
      <sFormLayout title="当前组件值">
        <el-table border size="small" :data="propDesc">
          <el-table-column
            align="center"
            header-align="center"
            prop="value"
            label="值"
          ></el-table-column>
          <el-table-column
            align="center"
            header-align="center"
            prop="label"
            label="说明"
          ></el-table-column>
        </el-table>
      </sFormLayout>
      <sFormLayout title="当前组件事件">
        <el-select size="small" v-model="listener.relEvent">
          <el-option v-for="item in events" :label="item.label" :value="item.event"></el-option>
        </el-select>
      </sFormLayout>
    </div>

    <div class="card-container">
      <sFormLayout title="选择关联组件" desc="组件需配置请求参数(params)或请求体(body)">
        <el-select size="small" v-model="listener.relComponentId">
          <el-option
            v-for="item in relComponentList"
            :label="item.baseConfig.label"
            :value="item.id!"
          ></el-option>
        </el-select>
      </sFormLayout>

      <sFormLayout style="margin-top: 10px" title="关联组件请求参数" desc="选择关联组件参数与当前组件值的对应关系"> </sFormLayout>
      <formLayout title="params">
        <sFormLayout :rate="50" :title="item.name" v-for="(item, index) in params">
          <el-select size="small" v-model="listener.relMap[item.name]">
            <el-option v-for="item in propDesc" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </sFormLayout>
      </formLayout>
      <formLayout title="body">
        <sFormLayout  :rate="50" :title="item.name" v-for="(item, index) in body">
          <el-select size="small" v-model="listener.relMap[item.name]">
            <el-option v-for="item in propDesc" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </sFormLayout>
      </formLayout>
    </div>
  </el-collapse-item>
</template>

<script setup lang="ts">
import { defaultVariabelType } from '@/components/drag-screen-pannel/constant'
import type { Ilisteners } from '@/components/drag-screen-pannel/types/date-picker'
import type { IRquest, Iparams } from '@/components/drag-screen-pannel/types/request'
import type { IComponent, IPannel } from '@/components/drag-screen-pannel/types/type'
import formLayout from '@/components/form-layout/index.vue'
import sFormLayout from '@/components/s-form-layout-small/index.vue'
import { getUUID } from '@/utils'
import { computed } from 'vue'
const props = withDefaults(
  defineProps<{
    pannel: IPannel
    option: any
    listener: Ilisteners
  }>(),
  {}
)
let collaName = getUUID()
let propDesc = computed((): Array<{ label: any; value: any }> => {
  return props.option.propDesc || []
})
let events = computed((): Array<{ label: any; event: any }> => {
  return props.option.events || []
})

// 可用的组件列表 存在params或data中存在自定义值的参数
let relComponentList = computed(() => {
  return props.pannel.components.filter((item: IComponent) => {
    return (
      item.request?.params?.some?.((param) => {
        return param.type === defaultVariabelType
      }) ||
      item.request?.data?.some?.((param) => {
        return param.type === defaultVariabelType
      })
    )
  })
})

// 当前选中的组件
let relComponent = computed((): IComponent | undefined => {
  return relComponentList.value.find((item) => {
    return item.id === props.listener.relComponentId
  })
})
let params = computed((): Array<Iparams> => {
  return (relComponent.value?.request?.params ?? []).filter((item) => {
    return item.type === defaultVariabelType
  })
})

let body = computed((): Array<Iparams> => {
  return (relComponent.value?.request?.data ?? []).filter((item) => {
    return item.type === defaultVariabelType
  })
})
</script>

<style lang="scss" scoped>
.card-container {
  background-color: #fff;
  box-sizing: border-box;
  padding: 10px 10px 15px;
  border-radius: 6px;
  &:not(:last-child) {
    margin-bottom: 15px;
  }
}
</style>
