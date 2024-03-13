<template>
  <el-button style="width: 100%; border: none">
    <el-icon style="margin-right: 4px;"><DataBoard /></el-icon>
    页面配置
  </el-button>
  <pannelSize class="reset-margin" :pannel="pannel" />
  <pannelBg class="reset-margin" v-model="pannel.bgImg" :pannel="pannel" />
  <pannelBgMethod class="reset-margin" v-model="pannel.bgMethod" :pannel="pannel" />
  <pannelBgColor class="reset-margin" v-model="pannel.bgColor" />
</template>

<script setup lang="ts">
import type { IPannel } from '../type'
import pannelSize from './pannel-attr/pannel-size.vue'
import pannelBg from './pannel-attr/pannel-bg.vue'
import pannelBgMethod from './pannel-attr/pannel-bg-method.vue'
import pannelBgColor from './pannel-attr/pannel-bg-color.vue'
import { DataBoard } from '@element-plus/icons-vue'
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
