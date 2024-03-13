<template>
  <div class="layout-wrap">
    <!-- 顶部导航栏 -->
    <div class="nav-wrap">
        <slot name="nav"></slot>
    </div>
    <!-- 内容区域 -->
    <div class="content-wrap">
      <!-- 左侧菜单栏 -->
      <div class="left-menu">
        <slot name="left"></slot>
      </div>
      <!-- 中间面板-->
      <div class="mid-content">
        <slot name="mid"></slot>
      </div>
      <!-- 右侧属性面板 -->
      <div class="right-content">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.layout-wrap {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .nav-wrap {
    height: 60px;
  }
  .content-wrap {
    flex: 1;
    display: flex;
    overflow: hidden;
    .left-menu {
      width: 330px;
      height: 100%;
      // background-color: rgb(242, 243, 245);
    }
    .mid-content {
        flex: 1;
    }
    .right-content {
      width: 350px;
    }
  }
}
</style>
