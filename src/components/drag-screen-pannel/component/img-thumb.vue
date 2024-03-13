<template>
  <img class="thumb-img" :src="imgUrl" alt="" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
let imgPath = '/src/assets/imgs/big-screen/chart/'
const allIcons = import.meta.glob('@/assets/imgs/big-screen/chart/*.png')
const props = withDefaults(
  defineProps<{
    img: string | undefined
  }>(),
  {}
)
let imgUrl = ref('')
onMounted(() => {
  if (props.img) {
    requireImgHand()
  }
})
const requireImgHand = () => {
    allIcons[imgPath + props.img+'.png']?.()?.then?.((res:any) => {
        imgUrl.value = res.default
    })
}
</script>

<style lang="scss" scoped>
.thumb-img {
  width: 100%;
  height: 100%;
}
</style>
