<template>
    <div class="left-menu-btn-wrap">
        <slot>
            <div class="icon" ></div>
            <div class="text"></div>
        </slot>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
    .left-menu-btn-wrap{
        width: 100%;
        box-sizing: border-box;
        padding: 6px 12px;
        display: flex;
        align-items: center;
        flex-direction: column;
        .icon{
            font-size: 14px;
            width: 24px;
            height: 24px;
        }
        .text{
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
</style>