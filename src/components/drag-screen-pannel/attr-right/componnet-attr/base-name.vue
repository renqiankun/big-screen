<template>
  <formLayout title="名称">
    <el-input size="small" v-model="modelCom"></el-input>
  </formLayout>
</template>

<script setup lang="ts">
import formLayout from '@/components/form-layout/index.vue'
import { computed } from 'vue';
const props = defineProps<{
    modelValue: string
}>()

let modelCom = computed({
    get(){
        return props.modelValue
    },
    set(newVal){
        emits('update:modelValue', newVal)
    }
})
const emits = defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped></style>
