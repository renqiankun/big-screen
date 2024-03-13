<template>
  <div class="left-menu-btn-wrap" :class="{'small':small,'active':value === modelValue}" @click="clickHand">
      <div v-if="icon" class="icon">
        <el-icon size="16">
          <component :is='icon'></component>  
        </el-icon>
      </div>
      <div class="text">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">

const props = withDefaults(
  defineProps<{
    label: string
    value:any
    modelValue:any
    icon?: any,
    small?: boolean,
  }>(),
  {}
)

const clickHand = ()=>{
  if(props.value === props.modelValue) return 
  emits('update:modelValue',props.value)
  emits('change',props.value)
}
const emits = defineEmits(['update:modelValue','change'])
</script>

<style lang="scss" scoped>
.left-menu-btn-wrap {
  width: 100%;
  box-sizing: border-box;
  padding: 8px 2px;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: rgb(51, 54, 57);
  cursor: pointer;
  margin-bottom: 6px;
  border-radius: 2px;
  transition: 0.2s;
  font-size: 14px;
  &.small{
    font-size: 12px;
  }
  &.active{
    background-color: var(--el-color-primary-light-8);
    color: var(--el-color-primary);
  }
  .icon {
    text-align: center;
  }
  .text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
