<template>
  <div class="left-menu-wrap">
    <div class="top-header">
        <!-- 头部名称 -->
      <div><slot name="title-left"></slot></div>
      <!-- 头部右侧 -->
      <div><slot name="title-right"></slot></div>
    </div>
    <div class="container-wrap">
      <div class="menu-wrap">
        <!-- 左侧menu -->
        <slot name="left-menu"></slot>
      </div>
      <div class="component-wrap">
        <!-- 右侧组件类型 及组件列表 -->
        <slot name="component"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.left-menu-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .top-header {
    background-color: #f2f3f5;
    width: 100%;
    height: 42px;
    box-sizing: border-box;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
  }
  .container-wrap {
    flex: 1;
    display: flex;
    height: 100%;
    margin-top: 1px;
    overflow: hidden;
    .menu-wrap {
      width: 65px;
      background-color: #f2f3f5;
      box-sizing: border-box;
      padding: 6px 8px;
    }
    .component-wrap {
      flex: 1;
    }
  }
}
</style>
