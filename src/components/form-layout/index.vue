<template>
  <div class="form-wrap">
    <div class="title"><slot name='title'>{{ title }}</slot></div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    title: string
    margin?: boolean
  }>(),
  {
    margin:true
  }
)

let marginCom = computed(() => {
  return props.margin
})
</script>

<style lang="scss" scoped>
.form-wrap {
  width: 100%;
  display: flex;
  align-items: start;
  margin-bottom: v-bind("marginCom?'20px':'0px'");
  &:last-child {
    margin-bottom: 0px;
  }
  .title {
    min-width: 50px;
    margin-right: 5px;
    font-size: 12px;
    line-height: 24px;
    color: var(--screen-primary-text-color);
    display: inline-flex;
    align-items: center;
    column-gap: 3px;
    
  }
  .content {
    flex: 1;
    overflow: hidden;
  }
}
</style>
