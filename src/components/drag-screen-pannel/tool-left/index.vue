<template>
  <leftMenuContainer >

    
  </leftMenuContainer>
</template>

<script setup lang="ts">
 import leftMenuContainer from '../component/left-menu-container.vue';
</script>

<style lang="scss" scoped>

</style>


<!-- 
<template>
  <div class="component-list" @dragstart="handleDragStart">
    <div
      v-for="(item, index) in components"
      :key="index"
      class="list"
      :draggable="true"
      :data-index="index"
    >
      <span>{{ item.attr.name }} </span>
    </div>
  </div>
</template>

<script setup lang="ts">
let components = [
  {
    x: 0,
    y: 0,
    w: 100,
    id:null,
    attr: {
      name: 'test1'
    }
  }
]
const handleDragStart = (e: any) => {
  let content = JSON.stringify(components[e.target.dataset.index])
  e.dataTransfer.setData('component', content)
}
</script>

<style lang="scss" scoped></style> -->
