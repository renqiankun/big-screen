<template>
  <Layout>
    <template #left>
     <toolLeft />
    </template>
    <template #mid>
      <editor :pannel="pannel" />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import Layout from './layout/index.vue'
import editor from './editor/index.vue'
import  {type  IPannel } from './type';
import { reactive } from 'vue'
import toolLeft from './tool-left/index.vue'
const pannel = reactive<IPannel>({
  scale: 1,
  width: 1920,
  height: 1080,
  components: [
    {},{}
  ]
})


const handleDrop = (e: any) => {
  console.log(111)
  e.preventDefault();
  e.stopPropagation();

  const componentStr = e.dataTransfer.getData("component");
  let component: any = JSON.parse(componentStr);
  if (component) {
    component.y = e.clientY - pannel.height;
    component.x = e.clientX - pannel.width;
    component.self.id =123;
    pannel.components.push(component);
  }
};
</script>

<style lang="scss" scoped></style>
