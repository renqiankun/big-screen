<template>
33
</template>

<script setup lang="ts">
import type { IComponent, IPannel } from '../../types/type';

const props = withDefaults(
  defineProps<{
    pannel:IPannel
    current: IComponent
  }>(),
  {}
)
</script>

<style lang="scss" scoped>

</style>