<template>
  <el-button style="width: 100%; border: none">
    <el-icon style="margin-right: 4px"><DataBoard /></el-icon>
    页面配置
  </el-button>
  <pannelSize class="reset-margin" :pannel="pannel" />
  <pannelBg class="reset-margin" v-model="pannel.bgImg" :pannel="pannel" />
  <pannelBgMethod class="reset-margin" v-model="pannel.bgMethod" :pannel="pannel" />
  <pannelBgColor class="reset-margin" v-model="pannel.bgColor" />
  <globalVariable class="reset-margin" v-model:globalVariable="pannel.globalVariable" />
</template>

<script setup lang="ts">
import { DataBoard } from '@element-plus/icons-vue'
import type { IPannel } from '../types/type'
import pannelSize from './pannel-attr/pannel-size.vue'
import pannelBg from './pannel-attr/pannel-bg.vue'
import pannelBgMethod from './pannel-attr/pannel-bg-method.vue'
import pannelBgColor from './pannel-attr/pannel-bg-color.vue'
import globalVariable from '@/components/drag-screen-pannel/attr-right/pannel-attr/global-variable/globalVariable.vue'

const props = withDefaults(
  defineProps<{
    pannel: IPannel
  }>(),
  {}
)
</script>

<style lang="scss" scoped>
.reset-margin {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
../types/type
